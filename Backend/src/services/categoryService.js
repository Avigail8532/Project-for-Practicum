const {Category} = require('../models');

exports.getAllCategories = async () => {
    try {
        const categories = await Category.findAll();
        return categories;
    } catch (error) {
        throw new Error('An error occurred while fetching categories.');
    }
};