{ User, Prompt } require('../models');
const { cache } = require('react');
const userService = require('../services/userService');
// Registering new users
exports.register = async (req, res) => {
  try {
    const data = req.body;
    const user = await userService.register(data);
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }

}
// Fetching user history
exports.getUserHistory = async (req, res) => {
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
        res.status(500).json({
            success: false,
            message: "Error fetching history",
            error: error.message
        });

    }
}