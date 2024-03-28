"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_products.hasMany(models.m_stocks, {
        foreignKey: "m_product_id",
      });
      m_products.belongsTo(models.m_category, {
        foreignKey: "m_category_id",
      });

      // m_products.hasMany(models.m_transaction_details,{
      //   foreignKey:"m_transaction_header_id"
      // })
    }
  }
  m_products.init(
    {
      name: DataTypes.STRING,
      image_url: DataTypes.STRING,
      description: DataTypes.STRING,
      m_category_id: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      price_from_suplier: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "m_products",
      // paranoid: true,
    }
  );
  return m_products;
};
