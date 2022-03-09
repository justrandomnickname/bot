"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Ticket.associate = function (models) {
    Ticket.belongsTo(models.Area, {
      foreignKey: "areaId",
      onDelete: "CASCADE",
    });
  };
  Ticket.init(
    {
      text: DataTypes.STRING,
      phone: DataTypes.STRING,
      areaId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Ticket",
    }
  );
  return Ticket;
};
