const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
router.get('/admin/users', adminController.getAllUsersForAdmin);
router.get('/admin/users/:userId/history', adminController.getUserHistoryForAdmin);
module.exports = router;