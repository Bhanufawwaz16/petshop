"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_cart.belongsTo(models.m_products, {
        foreignKey: "m_product_id",
      });
    }
  }
  m_cart.init(
    {
      m_product_id: DataTypes.INTEGER,
      m_user_id: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      flag_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "m_cart",
    }
  );
  return m_cart;
};
