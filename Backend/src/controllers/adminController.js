const userService = require('../services/userService');
const promptService = require('../services/promptService');


//The administrator sees the list of users and has the ability to see the history of each user.

//get all users for admin dashboard
exports.getAllUsersForAdmin = async (req, res) => {
    try {
        const users = await userService.getAllUsers(); 
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while fetching the admin dashboard data." });
    }
};

//get user history for admin dashboard
exports.getUserHistoryForAdmin = async (req, res) => {
    const { userId } = req.params;
    try {
        const history = await promptService.fetchUserHistory(userId);
        res.status(200).json({
            success: true,
            data: history
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while fetching user history." });
    }
};

