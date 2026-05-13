'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prompt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        this.belongsTo(models.user,{foreignKey:'userId'})
        this.belongsTo(models.category,{foreignKey:'categoryId'})
        this.belongsTo(models.subCategory,{foreignKey:'subCategoryId'})
    }
  }
  Prompt.init({
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    subCategoryId: DataTypes.INTEGER,
    prompt: DataTypes.TEXT,
    response: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Prompt',
  });
  return Prompt;
};