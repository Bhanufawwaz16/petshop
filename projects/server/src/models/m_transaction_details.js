"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_transaction_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_transaction_details.belongsTo(models.m_transaction_headers, {
        foreignKey: "m_transaction_header_id",
      });

      m_transaction_details.belongsTo(models.m_products, {
        foreignKey: "m_product_id",
        targetKey:"id"
      });
    }
  }
  m_transaction_details.init(
    {
      m_transaction_header_id: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      product_name: DataTypes.STRING,
      product_price: DataTypes.INTEGER,
      m_product_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "m_transaction_details",
    }
  );
  return m_transaction_details;
};
