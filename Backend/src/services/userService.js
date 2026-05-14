const { Category, SubCategory, User, Prompt } = require('../models');//,SubCategory,Category
//user registration and fetching user history
exports.register = async (data) => {
    const { name, phone } = data;
    if (!name || !phone) {
        throw new Error('Name and phone are required.');
    }
    const existingUser = await User.findOne({ where: { phone } });
    if (existingUser) {
        throw new Error('User with this phone number already exists.');
    }
    const user = await User.create({ name: name, phone });
    return user;    
}

exports.fetchUserHistory = async (userId) => {
    if (!userId) {
        throw new Error('User ID is required to fetch history.');
    }
    return await Prompt.findAll({
        where: { userId: userId },
        include: [
            //{model:Prompt, as: 'prompts'},
            { model: SubCategory, attributes: ['name'] },
            { model: Category, attributes: ['name'] }
        ],
        order: [['createdAt', 'DESC']]
    });

}


