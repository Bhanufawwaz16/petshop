'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class m_schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  m_schedule.init({
    m_user_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    time_start: DataTypes.TIME,
    time_finish: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'm_schedule',
  });
  return m_schedule;
};