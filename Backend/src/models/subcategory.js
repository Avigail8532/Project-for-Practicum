'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        this.belongsTo(models.Category,{foreignKey:'categoryId',as:'category'})
        this.hasMany(models.Prompt,{foreignKey:'subCategoryId',as:'prompts'})
    }
  }

  SubCategory.init({
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SubCategory',
  });
  return SubCategory;
};