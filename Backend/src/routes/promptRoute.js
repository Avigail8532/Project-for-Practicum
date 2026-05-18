const express = require('express');
const router = express.Router();

const promptController = require('../controllers/promptController');
const aiLimiter = require('../middlewares/aiLimiterMid');

// Apply AI rate limiter to all prompt-related routes

router.post('/prompts', aiLimiter, promptController.createPrompt);
router.get('/users/:userId/history',  promptController.fetchUserHistory);
router.get('/prompts/:promptId',  promptController.fetchPromptById);

module.exports = router;