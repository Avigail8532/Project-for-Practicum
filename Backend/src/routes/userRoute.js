const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/addUser', userController.addUser);
router.get('/admin/users', userController.getAllUsersForAdmin);
router.get('/users/:userId/history', userController.getUserHistory);

module.exports = router;


