const { Sequelize } = require("sequelize");
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

async function getSalesReport(req, res) {
  try {
    console.log("function sales report");
    const data = await db.sequelize.query(
      `SELECT
        mth.id,
        mtd.product_name, mtd.qty,
        mu.username, mth.date, mth.total_price, ms.name statusname
        FROM m_transaction_headers mth
        LEFT JOIN m_transaction_details mtd ON mth.id = mtd.m_transaction_header_id
        LEFT JOIN m_users mu ON mth.m_user_id = mu.id
        LEFT JOIN m_statuses ms ON mth.status = ms.id
        WHERE mth.status != 1;`,

      { type: Sequelize.QueryTypes.SELECT }
    );
    return res
      .status(200)
      .send({ message: "Succesfully get sales report", data });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

module.exports = {
  setTransImage,
  getSalesReport,
};
