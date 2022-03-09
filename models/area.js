"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Area extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Area.associate = function (models) {
    Area.belongsTo(models.City, {
      foreignKey: "cityId",
      onDelete: "CASCADE",
    });
  };
  Area.init(
    {
      name: DataTypes.STRING,
      cityId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Area",
    }
  );
  return Area;
};
