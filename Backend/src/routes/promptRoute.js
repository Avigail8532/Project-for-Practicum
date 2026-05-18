const express = require('express');
const router = express.Router();

const promptController = require('../controllers/promptController');

router.post('/prompts', promptController.createPrompt);
router.get('/users/:userId/history', promptController.fetchUserHistory);
router.get('/prompts/:promptId', promptController.fetchPromptById);

module.exports = router;