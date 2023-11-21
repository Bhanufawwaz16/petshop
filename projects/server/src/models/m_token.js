"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  m_token.init(
    {
      m_user_id: DataTypes.INTEGER,
      token: DataTypes.STRING,
      expired: DataTypes.DATE,
      valid: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      status: {
        type: DataTypes.ENUM("LOGIN", "FORGOT-PASSWORD", "VERIFICATION"),
      },
    },
    {
      sequelize,
      modelName: "m_token",
    }
  );
  return m_token;
};
