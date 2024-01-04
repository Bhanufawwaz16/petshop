const db = require("../models");
async function setTransImage(req, res) {
  try {
    console.log("function trans image");
    const file = req.file;
    console.log("file photo tf", file);
    console.log("id trans head", req.params.id);

    const result = await db.m_transaction_headers.findOne({
      where: { id: req.params.id },
    });

    await db.m_transaction_headers.update(
      {
        user_payment: file.filename,
        status: 2,
      },
      {
        where: { id: req.params.id },
      }
    );

    return res.status(200).send({ message: "Upload Payment Succesfully" });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

module.exports = {
  setTransImage,
};
