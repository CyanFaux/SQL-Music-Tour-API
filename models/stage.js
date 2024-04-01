"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      class Stage extends Model {
        static associate({ Event, StageEvent }) {
          // meet and greets
          Stage.belongsToMany(Event, {
            foreignKey: "stage_id",
            as: "events",
            through: StageEvent
          });
        }
      }
    }
  }
  Stage.init(
    {
      band_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genre: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      available_start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Stage",
      tableName: "stages",
      timestamps: false,
    }
  );

  return Stage;
};
