
const { User, Prompt } = require('../models');

const userService = require('../services/userService');
// Registering new users
exports.addUser = async (req, res, next) => {
  try {
    const data = req.body;
    const user = await userService.register(data);
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
}

// Fetching user history
exports.getUserHistory = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required.' });
    }
    const history = await userService.fetchUserHistory(userId);
    res.status(200).json({
      success: true,
      data: history
    });
  } catch (error) {
    next(error);

  }
}
// Fetching all users for admin dashboard
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
}
