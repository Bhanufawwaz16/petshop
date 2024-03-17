"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_users.belongsTo(models.m_role, {
        foreignKey: "m_role_id",
      });
    }
  }
  m_users.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      username: DataTypes.STRING,
      name: DataTypes.STRING,
      birthdate: DataTypes.DATE,
      m_role_id: DataTypes.INTEGER,
      addres: DataTypes.STRING,
      phone: DataTypes.STRING,
      salary: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "m_users",
    }
  );
  return m_users;
};
