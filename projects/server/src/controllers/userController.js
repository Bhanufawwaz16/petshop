const db = require("../models");
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

async function getUser(req, res) {
  console.log("runing category");
  try {
    const employe = await db.m_users.findAll({
      attributes: ["id", "name"],
      where: { m_role_id: 2 },
    });

    return res
      .status(200)
      .send({ message: "succesfully get data employe", employe });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

async function getSchedule(req, res) {
  try {
    const date = req.query.date;
    console.log("date", date);
    

    const schedule = await db.sequelize.query(
      `SELECT mu.name, ms.*
        FROM m_schedules ms
        LEFT JOIN m_users mu ON ms.m_user_id = mu.id
        WHERE ms.date = "${date}";`,

      { type: Sequelize.QueryTypes.SELECT }
    );

    return res
      .status(200)
      .send({ message: "succesfully get schedule", schedule });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

async function createSchedule(req, res) {
  try {
    console.log("req body", req.body);
    const userId = req.body.userId;
    const startDate = req.body.startDate;
    const finishDate = req.body.finishDate;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;

    if (!userId || !startDate || !finishDate || !startTime || !endTime)
      return res.status(400).send({ message: "Please complete your data" });

    const userExist = await db.m_schedule.findAll({
      where: {
        m_user_id: userId,
        date: {
          [Op.between]: [startDate, finishDate],
        },
      },
    });

    if (userExist > 0)
      return res.status(400).send({ message: "User already schedule" });

    const currentDate = new Date(startDate);
    const endDate = new Date(finishDate);

    while (currentDate <= endDate) {
      const formattedDate = currentDate.toISOString().split("T")[0];

      await db.m_schedule.create({
        m_user_id: userId,
        date: formattedDate,
        time_start: startTime,
        time_finish: endTime,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return res.status(200).send({ message: "Successfully create schedule" });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

module.exports = {
  getUser,
  createSchedule,
  getSchedule,
};
