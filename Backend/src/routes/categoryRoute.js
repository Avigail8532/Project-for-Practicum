const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Route to get all categories
router.get('/categories', categoryController.getAllCategories);
// Route to get sub-categories by category ID
router.get('/categories/subcategories/:categoryId', categoryController.getSubCategoriesByCategoryId);
// Route to get sub-category by ID
router.get('/subcategories/:subCategoryId', categoryController.getSubCategoryById);
module.exports = router;