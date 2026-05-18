const userService = require('../services/userService');
const promptService = require('../services/promptService');


//The administrator sees the list of users and has the ability to see the history of each user.

//get all users for admin dashboard
exports.getAllUsersForAdmin = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers(); 
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        next(error);
    }
};

//get user history for admin dashboard
exports.getUserHistoryForAdmin = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const history = await promptService.fetchUserHistory(userId);
        res.status(200).json({
            success: true,
            data: history
        });
    } catch (error) {
        next(error);
    }
};

