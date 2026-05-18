const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
// Route to get all users   
router.get('/admin/users', adminController.getAllUsersForAdmin);
// Route to get user history for admin dashboard
router.get('/admin/users/:userId/history', adminController.getUserHistoryForAdmin);
module.exports = router;