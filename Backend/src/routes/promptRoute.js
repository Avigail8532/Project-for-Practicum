const express = require('express');
const router = express.Router();
const promptController = require('../controllers/promptController');

// Route to create a new prompt
router.post('/prompts', promptController.createPrompt);
// Route to fetch user history
router.get('/users/:userId/history', promptController.fetchUserHistory);
// Route to fetch a specific prompt by ID
router.get('/prompts/:promptId', promptController.fetchPromptById);
module.exports = router;