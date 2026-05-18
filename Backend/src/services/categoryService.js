const {Category,SubCategory} = require('../models');
// Fetching all categories
const db = require('../models');

exports.getAllCategories = async () => {
    try {
        const categories = await db.Category.findAll({
            include: [{
                model: db.SubCategory,
                as: 'subCategories',
                // אם בטבלה העמודה היא category_id, שנה את ה-foreignKey ל-'category_id'
                foreignKey: 'categoryId' 
            }]
        });
        return categories;
    } catch (error) {
        console.error("Error fetching categories with subcategories:", error);
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