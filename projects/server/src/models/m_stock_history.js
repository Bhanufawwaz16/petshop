"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_stock_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_stock_history.belongsTo(models.m_products, {
        foreignKey: "m_product_id",
      });
    }
  }
  m_stock_history.init(
    {
      m_product_id: DataTypes.INTEGER,
      suplier_customer: DataTypes.STRING,
      status: DataTypes.ENUM("IN", "OUT"),
      qty: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
    },
    {
      sequelize,
      // timestamps: false,
      modelName: "m_stock_history",
    }
  );
  return m_stock_history;
};
