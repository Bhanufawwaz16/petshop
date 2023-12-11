"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_transaction_headers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  m_transaction_headers.init(
    {
      m_user_id: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      date: DataTypes.DATE,
      expedition_price: DataTypes.INTEGER,
      invoice: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "m_transaction_headers",
    }
  );
  return m_transaction_headers;
};
