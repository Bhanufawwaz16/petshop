const db = require("../models");

async function createProducts(req, res) {
  console.log("req createProducts nih", req.body);

  try {
    return res.status(200).send({ message: "succesfully get createProducts" });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

module.exports = {
  createProducts,
};
