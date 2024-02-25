const db = require("../models");

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

async function createSchedule(req, res) {
  try {
    console.log("req body", req.body);

    return res.status(200).send({ message: "succesfully create schedule" });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

module.exports = {
  getUser,
  createSchedule,
};
