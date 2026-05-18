const { Category, SubCategory, User, Prompt } = require('../models');//,SubCategory,Category
//user registration and fetching user history
exports.register = async (data) => {
    const { name, phone } = data;
    if (!name || !phone) {
        throw new Error('Name and phone are required.');
    }

    let existingUser = await User.findOne({ where: { phone } });
    if (existingUser) {
        return existingUser;
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
            { model: SubCategory, attributes: ['name'] ,as :'subCategory'},
            { model: Category, attributes: ['name'] , as : 'category'}
        ],
        order: [['createdAt', 'DESC']]
    });

}
// Fetching all users for admin dashboard
exports.getAllUsers = async () => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'phone']
        });
        return users;
    } catch (error) {
        throw new Error('An error occurred while fetching all users.');
    }
};

// שליפת משתמש מהדאטה-בייס לפי ה-ID שלו
exports.getUserById = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        return user;
    } catch (error) {
        throw new Error("שגיאה בשליפת המשתמש מהדאטה-בייס: " + error.message);
    }
};