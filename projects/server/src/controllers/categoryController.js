const db = require("../models");

async function getCategory(req, res) {
  console.log("runing catgory");
  try {
    const category = await db.m_category.findAndCountAll({
      attributes: ["id", "name"],
    });

    return res
      .status(200)
      .send({ message: "succesfully get data category", category });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

module.exports = {
  getCategory,
};
