const stages = require("express").Router();
const db = require("../models");
const { Stage, MeetGreet, Event, SetTime, Sequelize } = db;
const { Op } = Sequelize;

// INDEX ROUTE
// FIND ALL STAGES
stages.get("/", async (req, res) => {
  try {
    const foundStages = await Event.findAll({
      order: [["available_start_time", "ASC"]],
      where: {
        name: { [Op.like]: `%${req.query.name ? req.query.name : ""}%` },
      },
    });
    res.status(200).json(foundStages);
  } catch (error) {
    res.status(500).json(error);
  }
});

// SHOW ROUTE
// FIND A SPECIFIC STAGE
stages.get("/:name", async (req, res) => {
  try {
    const foundStage = await Stage.findOne({
      where: { name: req.params.name },
      include: [
        {
          model: MeetGreet,
          as: "meet_greets",
          include: {
            model: Event,
            as: "event",
            where: {
              name: {
                [Op.like]: `%${req.query.event ? req.query.event : ""}%`,
              },
            },
          },
        },
        {
          model: SetTime,
          as: "set_times",
          include: {
            model: Event,
            as: "event",
            where: {
              name: {
                [Op.like]: `%${req.query.event ? req.query.event : ""}%`,
              },
            },
          },
        },
      ],
    });
    res.status(200).json(foundStage);
  } catch (error) {
    res.status(500).json(error);
  }
});

// CREATE ROUTE
stages.post("/", async (req, res) => {
  try {
    const newStage = await Event.create(req.body);
    res.status(200).json({
      message: "Successfully inserted a new stage",
      data: newStage,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE A STAGE
stages.put("/:id", async (req, res) => {
  try {
    const updatedStages = await Stage.update(req.body, {
      where: {
        stage_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Successfully updated ${updatedStages} stage(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE A STAGE
stages.delete("/:id", async (req, res) => {
  try {
    const deletedStages = await Stage.destroy({
      where: {
        stage_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Successfully deleted ${deletedStages} stage(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = stages;