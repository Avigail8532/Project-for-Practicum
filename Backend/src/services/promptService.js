const { User, Prompt, Category, SubCategory } = require('../models');
// const userService = require('../services/userService');
// const promptService = require('../services/promptService');
const aiservice = require('./aiService')
// Creating a new lesson
exports.createPrompt = async (promptData) => {
    // שלפנו גם את השמות הטקסטואליים שהפרונטנד שולח
    const { userId, categoryId, subCategoryId, input, category, subCategory } = promptData;

    // הגנה בסיסית: וודא שיש לפחות משתמש, קטגוריה ותת-קטגוריה
    if (!userId || (!categoryId && !category) || (!subCategoryId && !subCategory)) {
        throw new Error('All fields are required to create a prompt.');
    }

    let categoryName = category || 'כללי';
    let subCategoryName = subCategory || 'נושא כללי';

    // אם הגיעו מזהים מספריים, נשלוף את השמות מה-DB כמו מקודם
    if (categoryId) {
        const catObj = await Category.findByPk(categoryId);
        if (catObj) categoryName = catObj.name;
    }
    if (subCategoryId) {
        const subCatObj = await SubCategory.findByPk(subCategoryId);
        if (subCatObj) subCategoryName = subCatObj.name;
    }

    // שימוש בטקסט שהגיע מהפרונטנד או מה-DB עבור ה-input של ה-AI
    const aiInput = input || `תסביר לי על ${subCategoryName}`;

    // פנייה לשירות ה-AI
    const aiResponse = await aiservice.generateResponse(categoryName, subCategoryName, aiInput);
    if (!aiResponse) {
        throw new Error('Failed to generate AI response.');
    }

    // שמירה בבסיס הנתונים - עם הגנה זמנית למקרה שאין ID מספריים
    const prompt = await Prompt.create({
        userId,
        categoryId: categoryId || null,     // אם אין ID בגלל הגיבוי, יישמר כ-null
        subCategoryId: subCategoryId || null, // אם אין ID בגלל הגיבוי, יישמר כ-null
        aiResponse,
        prompt: aiInput,        
        response: aiResponse  
    });

    return prompt;

}
// Fetching user history
exports.fetchUserHistory = async (userId) => {
    if (!userId) {
        throw new Error('User ID is required.');
    }
    const prompts = await Prompt.findAll({ where: { userId } });
    return prompts;
}
// Fetching all history for a user with associated category and sub-category details
exports.fetchAllHistory = async (userId) => {
    if (!userId) {
        throw new Error('User ID is required to fetch history.');
    }
    try {
        return await Prompt.findAll({
            where: { userId: userId },
            include: [
                { model: User, attributes: ['id', 'email'] },
                { model: Category, attributes: ['id', 'name'] },
                { model: SubCategory, attributes: ['id', 'name'] }
            ],
            // Order by creation date, most recent first
            order: [['createdAt', 'DESC']]
        });
    } catch (error) {
        throw new Error('An error occurred while fetching history.');
    }
}
// Fetching a specific prompt by ID
exports.fetchPromptById = async (promptId) => {
    if (!promptId) {
        throw new Error('Prompt ID is required.');
    }
    const prompt = await Prompt.findByPk(promptId);
    if (!prompt) {
        throw new Error('Prompt not found.');
    }
    return prompt;
}