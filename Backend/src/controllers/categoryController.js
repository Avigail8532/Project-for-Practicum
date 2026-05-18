   const categoryService = require( '../services/categoryService.js');
// Fetching all categories
exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getAllCategories();
        
        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        next(error);
    }
};
 
exports.getSubCategoriesByCategoryId = async (req, res, next) => {
    try {
        const categoryId = req.params.categoryId;
        const subCategories = await categoryService.getSubCategoriesByCategoryId(categoryId);
        res.status(200).json({
            success: true,
            data: subCategories
        });
    } catch (error) {
      
        next(error);
    }
};
// Fetching subCategory by ID
exports.getSubCategoryById = async (req, res, next) => {
    try {
        const subCategoryId = req.params.subCategoryId;
        const subCategory = await categoryService.getSubCategoryById(subCategoryId);
        res.status(200).json({
            success: true,
            data: subCategory
        });
    } catch (error) {
        next(error);
    }
};
