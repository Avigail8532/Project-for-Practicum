const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/subcategories/subCategoryId', categoryController.getSubCategoryById);
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:categoryId/subcategories', categoryController.getSubCategoriesByCategoryId);

module.exports = router;