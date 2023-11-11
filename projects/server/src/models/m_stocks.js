"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_stocks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_stocks.belongsTo(models.m_products, {
        foreignKey: "m_product_id",
      });
    }
  }
  m_stocks.init(
    {
      m_product_id: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "m_stocks",
      // paranoid: true,
    }
  );
  return m_stocks;
};
