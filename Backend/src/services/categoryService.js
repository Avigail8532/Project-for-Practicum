const {Category,SubCategory} = require('../models');
// Fetching all categories
exports.getAllCategories = async () => {
    try {
        const categories = await Category.findAll();
        return categories;
    } catch (error) {
        throw new Error('An error occurred while fetching categories.');
    }
};

exports.getSubCategoriesByCategoryId = async (categoryId) => {
    try {
        const category = await Category.findByPk(categoryId, {
            include: 'subCategories'
        });
        return category;
    } catch (error) {
        throw new Error('An error occurred while fetching the category.');
    }
}
// Fetching subCategory by ID 
exports.getSubCategoryById = async (subCategoryId) => {
    try {
        const subCategory = await SubCategory.findByPk(subCategoryId);
        return subCategory;
    } catch (error) {
        throw new Error('An error occurred while fetching the subCategory.');
    }
}