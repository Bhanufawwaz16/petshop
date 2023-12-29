const db = require("../models");
async function setTransImage(req, res) {
  try {
    console.log("function trans image");
    const file = req.file;
    console.log("file photo tf", file);

    return res.status(200).send({ message: "Upload Payment Succesfully" });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

module.exports = {
  setTransImage,
};
