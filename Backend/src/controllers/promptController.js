const promptService = require('../services/promptService');

// Controller for creating a new prompt
exports.createPrompt = async (req, res) => {
    try {
        const promptData = req.body;
        const prompt = await promptService.createPrompt(promptData);
        res.status(201).json(prompt);
    }
    catch (error) {
        res.status(500).json({ error: " error  while creating the prompt" });
    }

    // Controller for fetching user history
    exports.fetchUserHistory = async (req, res) => {
        try {
            const userId = req.params.userId;
            const history = await promptService.fetchUserHistory(userId);
            res.status(200).json(history);
        }
        catch (error) {
            res.status(500).json({ error: "An error occurred while fetching user history." });
        }
    }
}
// Controller for fetching all history for a user with associated category and sub-category details
exports.fetchAllHistory = async (req, res) => {
    try {        const userId = req.params.userId;
        const history = await promptService.getAllhistory(userId);
        res.status(200).json(history);
    }
    catch (error) {
        res.status(500).json({ error: "An error occurred while fetching user history." });
    }}
// Controller for fetching a specific prompt by ID
exports.fetchPromptById = async (req, res) => {
    try {
        const promptId = req.params.promptId;
        const prompt = await promptService.fetchPromptById(promptId);
        res.status(200).json(prompt);
    }
    catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the prompt." });
    }
}