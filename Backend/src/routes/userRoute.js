const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateRegister } = require('../middlewares/validationMid');

router.post('/addUser',validateRegister, userController.addUser);
router.get('/admin/users', userController.getAllUsersForAdmin);
router.get('/users/:userId/history', userController.getUserHistory);
router.get('/:id', userController.getUserById);
module.exports = router;


