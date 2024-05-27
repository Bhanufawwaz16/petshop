const db = require("../models");
const m_transaction_headers = require("../models/m_transaction_headers");

async function createTransaction(req, res) {
  try {
    console.log("req body transaction", req.body);
    const { cart, invoice } = req.body;
    const selectedShippingOption = parseInt(req.body.selectedShippingOption);
    const user_id = req.params.id;

    const customer = await db.m_users.findOne({
      where: {
        id: user_id,
      },
    });

    const totalPrice = cart.reduce((total, product) => {
      // Pastikan properti price pada m_product adalah angka yang valid
      const productPrice =
        product.m_product && typeof product.m_product.price === "number"
          ? product.m_product.price
          : 0;

      return total + productPrice * product.qty;
    }, 0);
    console.log("total price", totalPrice);

    const transH = await db.m_transaction_headers.create({
      m_user_id: user_id,
      total_price: totalPrice,
      date: new Date(),
      status: 1,
      expedition_price: selectedShippingOption,
      invoice: invoice,
    });

    const transD = await db.m_transaction_details.bulkCreate(
      cart.map((product) => {
        return {
          m_transaction_header_id: transH.id,
          m_product_id: product.m_product_id,
          qty: product.qty,
          product_name: product.m_product.name,
          product_price: product.m_product.price,
        };
      })
    );

    const stock = cart.map(async (product) => {
      const currentStock = await db.m_stocks.findOne({
        where: {
          m_product_id: product.m_product.id,
        },
      });

      await db.m_stock_history.create({
        status: "OUT",
        suplier_customer: customer.dataValues.username,
        qty: product.qty,
        total_price: totalPrice,
        m_product_id: product.m_product_id,
      });

      await db.m_stocks.update(
        {
          stock: currentStock.stock - product.qty,
        },
        {
          where: {
            m_product_id: product.m_product_id,
          },
        }
      );
    });

    res.status(200).send({ message: "Transaction Succesfully" });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

async function getTransactionHead(req, res) {
  try {
    console.log("req query", req.query);
    const user_id = parseInt(req.params.id);
    const page = parseInt(req.query.page);
    const startDate =
      req.query.startDate === "undefined" ? null : req.query.startDate;
    const endDate =
      req.query.endDate === "undefined" ? null : req.query.endDate;
    const sortType = req.query.sort;
    const itemsPerPage = 3;
    const status = req.query.status;
    const invoiceName = req.query.q;

    const statusClause = status ? { status: status } : {};

    const invoiceClause = invoiceName
      ? { invoice: { [Op.like]: "%" + invoiceName + "%" } }
      : {};
    const dateClause =
      !startDate && !endDate
        ? {}
        : { date: { [Op.between]: [startDate, endDate] } };

    const offsetLimit = {};
    if (page) {
      offsetLimit.limit = itemsPerPage;
      offsetLimit.offset = (page - 1) * itemsPerPage;
    }

    const sortMap = {
      invoice_asc: [["invoice", "ASC"]],
      invoice_desc: [["invoice", "DESC"]],
      date_asc: [["date", "ASC"]],
      date_desc: [["date", "DESC"]],
    };

    const result = await db.m_transaction_headers.findAndCountAll({
      where: {
        m_user_id: user_id,
        ...statusClause,
        ...invoiceClause,
        ...dateClause,
      },
      include: [
        {
          model: db.m_transaction_details,
          attributes: ["product_name", "qty"],
          include: [
            {
              model: db.m_products,
              attributes: ["image_url", "price", "id"],
            },
          ],
        },
        {
          model: db.m_status,
        },
      ],
      ...offsetLimit,
      order: sortMap[sortType] || null,
    });

    const results = await db.m_transaction_headers.findAndCountAll({
      where: {
        m_user_id: user_id,
        ...statusClause,
        ...invoiceClause,
        ...dateClause,
      },
    });

    return res.status(200).send({
      message: "Get Trans Head Succesfully",
      data: {
        Transaction_Header: result,
        count: results,
      },
    });
  } catch (error) {
    console.log("error transaction", error);
    return res.status(400).send(error);
  }
}

async function getTransactionHeaders(req, res) {
  try {
    const result = await db.m_transaction_headers.findAndCountAll({
      include: [
        {
          model: db.m_transaction_details,
          attributes: ["product_name", "qty"],
          include: [
            {
              model: db.m_products,
              attributes: ["image_url", "price"],
            },
          ],
        },
        {
          model: db.m_users,
          attributes: ["name", "addres", "phone", "location"],
        },
        {
          model: db.m_status,
        },
      ],
    });

    return res
      .status(200)
      .send({ message: "Get Transaction Header Success", result });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

async function updateTransaction(req, res) {
  try {
    console.log("req query", req.body);
    console.log("req params id", req.params);
    const { status, role, wantAction } = req.body;
    console.log("wantAction", wantAction);
    const transHId = parseInt(req.params.id);

    if (role !== "super admin" && role !== "employe")
      return res.status(400).send({ message: "Unauthorized" });

    const statusAction = await db.m_status.findOne({
      where: { name: wantAction },
    });
    // console.log("statusActionUpdate", statusAction);

    const transHExist = await db.m_transaction_headers.findOne({
      where: {
        id: transHId,
        status: statusAction.dataValues.id,
      },
    });
    console.log("transHExist", transHExist);

    if (!transHExist)
      return res.status(400).send({ message: "Transaction Not Found" });

    const statusId = await db.m_status.findOne({
      where: { name: status },
    });

    await db.m_transaction_headers.update(
      {
        status: statusId.dataValues.id,
      },
      {
        where: { id: transHExist.dataValues.id },
      }
    );

    return res.status(200).send({ message: "Success" });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

async function confirmTransaction(req, res) {
  try {
    console.log("req params", req.params);
    console.log("req body", req.body);
    const id = req.params.id;
    const { username } = req.body;

    const userExist = await db.m_users.findOne({
      where: { username: username },
    });

    if (!userExist) return res.status(400).send({ message: "Unauthorized" });

    await db.m_transaction_headers.update({ status: 7 }, { where: { id: id } });

    return res.status(200).send({ message: "Confirm Transaction Succesfully" });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

module.exports = {
  createTransaction,
  getTransactionHead,
  getTransactionHeaders,
  updateTransaction,
  confirmTransaction,
};
