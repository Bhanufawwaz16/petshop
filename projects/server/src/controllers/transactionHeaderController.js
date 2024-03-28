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
    console.log("req.query", req.query);

    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    const clauseFilterByDate =
      startDate && endDate
        ? `AND mth.date BETWEEN "${startDate}" AND "${endDate}"`
        : "";

    const data = await db.sequelize.query(
      `SELECT
        mth.id,
        mtd.product_name, mtd.qty,
        mu.username, mth.date, mth.total_price, ms.name statusname
        FROM m_transaction_headers mth
        LEFT JOIN m_transaction_details mtd ON mth.id = mtd.m_transaction_header_id
        LEFT JOIN m_users mu ON mth.m_user_id = mu.id
        LEFT JOIN m_statuses ms ON mth.status = ms.id
        WHERE mth.status != 1
        ${clauseFilterByDate};`,

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

async function getStockHistory(req, res) {
  try {
    console.log("req query", req.query);
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    const clauseFilterByDate =
      startDate && endDate
        ? `AND msh.createdAt BETWEEN "${startDate}" AND "${endDate}"`
        : "";

    const data = await db.sequelize.query(
      `SELECT 
        mp.name, msh.suplier_customer, msh.status, msh.qty, msh.total_price, msh.createdAt
        FROM m_stock_histories msh
        LEFT JOIN m_products mp ON msh.m_product_id = mp.id
        ${clauseFilterByDate}
        ORDER BY msh.createdAt DESC;`,

      { type: Sequelize.QueryTypes.SELECT }
    );

    return res
      .status(200)
      .send({ message: "Succesfully get stock history", data });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

async function getBuyAndSell(req, res) {
  try {
    const historyBuyAndSell = await db.sequelize.query(
      `SELECT
      CASE WHEN SUM(msh.total_price) > 0 THEN SUM(CASE WHEN msh.status = 'IN' THEN msh.total_price ELSE 0 END) ELSE 0 END AS status_IN,
      CASE WHEN SUM(msh.total_price) > 0 THEN SUM(CASE WHEN msh.status = 'OUT' THEN msh.total_price ELSE 0 END) ELSE 0 END AS status_OUT
      FROM 
      m_stock_histories msh;
  `,

      { type: Sequelize.QueryTypes.SELECT }
    );

    return res
      .status(200)
      .send({ message: "Succesfully get Buy And Sell", historyBuyAndSell });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

module.exports = {
  setTransImage,
  getSalesReport,
  getStockHistory,
  getBuyAndSell,
};
