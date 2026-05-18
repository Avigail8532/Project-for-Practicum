   const categoryService = require( '../services/categoryService.js');
// Fetching all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching categories",
            error: error.message
        });
    }
};
 
exports.getSubCategoriesByCategoryId = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const subCategories = await categoryService.getSubCategoriesByCategoryId(categoryId);
        res.status(200).json({
            success: true,
            data: subCategories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching subcategories",
            error: error.message
        });
    }
};
// Fetching subCategory by ID
exports.getSubCategoryById = async (req, res) => {
    try {
        const subCategoryId = req.params.subCategoryId;
        const subCategory = await categoryService.getSubCategoryById(subCategoryId);
        res.status(200).json({
            success: true,
            data: subCategory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching subcategory",
            error: error.message
        });
    }
};