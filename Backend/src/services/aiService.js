const { OpenAI } = require('openai');
//asking openai to generate response based on category, subcategory and user prompt
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// });

exports.generateResponse = async (categoryName, subCategoryName, prompt) => {
    try {

        // // קוד זמני לעקיפת הפנייה ל-OpenAI
         return `This is a mock AI response for ${categoryName} -> ${subCategoryName}. Input received: ${prompt}`;
        // const response = await openai.chat.completions.create({
        //     model: 'gpt-4o',//-mini
        //     messages: [
        //         { role: 'system', content: `You are an expert teacher. Create a lesson by category of ${categoryName} and subcategory of ${subCategoryName}.` },
        //         { role: 'user', content: prompt }
        //     ],
        //     max_tokens: 300,
        //     temperature: 0.7
        // });
        // שימוש ב-trim() מבטיח מחרוזת נקייה
        //return response.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error generating response:', error);
        throw new Error('An error occurred while generating the response.');
    }
}

