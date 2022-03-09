"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Volunteer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Volunteer.init(
    {
      name: DataTypes.STRING,
      city: DataTypes.STRING,
      phone: DataTypes.STRING,
      is_verified: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Volunteer",
    }
  );
  return Volunteer;
};
