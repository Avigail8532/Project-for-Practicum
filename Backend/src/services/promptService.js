const { User, Prompt, Category, SubCategory } = require('../models');
// const userService = require('../services/userService');
// const promptService = require('../services/promptService');
const aiservice = require('./aiService')
// Creating a new lesson
exports.createPrompt = async (promptData) => {
    const { userId, categoryId, subCategoryId, input } = promptData;

    if (!userId || !categoryId || !subCategoryId || !input) {
        throw new Error('All fields are required to create a prompt.');
    }

    const category = await Category.findByPk(categoryId);
    const subCategory = await SubCategory.findByPk(subCategoryId);
    if (!category || !subCategory) {
        throw new Error('Invalid category or sub-category ID.');
    }
    const categoryName = category.name;
    const subCategoryName = subCategory.name;
    const aiResponse = await aiservice.generateResponse(categoryName, subCategoryName, input);
    if (!aiResponse) {
        throw new Error('Failed to generate AI response.');
    }
    // Saving the prompt and AI response to the database
    const prompt = await Prompt.create({
        userId,
        categoryId,
        subCategoryId,
        aiResponse,
        prompt: input,        // מכניס את הציטוט של המשתמש לשדה prompt
        response: aiResponse  // מכניס את המחרוזת שחזרה מה-aiService לשדה response
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