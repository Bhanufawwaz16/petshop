const db = require("../models");

async function getCartByUser(req, res) {
  try {
    console.log("req res Get To Cart", req.params);
    const user_id = req.params.user_id;

    const cartByUserId = await db.m_cart.findAll({
      where: { m_user_id: user_id },
      include: {
        model: db.m_products,
        attributes: ["id", "name", "price", "image_url"],
        include: [
          {
            model: db.m_stocks,
            attributes: ["id", "stock"],
          },
        ],
      },
    });

    return res.status(200).send({
      message: "Succesfully Get Cart By User",
      cartByUserId,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

async function addToCart(req, res) {
  try {
    console.log("req body", req.body);
    const { product_id, user_id, qty } = req.body;

    if (!user_id)
      return res.status(400).send({ message: "Anda Harus Login Dahulu" });

    const findUserCart = await db.m_cart.findOne({
      where: {
        m_product_id: product_id,
        m_user_id: user_id,
        flag_active: true,
      },
    });
    console.log("Find User Cart", findUserCart);

    const findUserExist = await db.m_cart.findOne({
      where: { m_user_id: user_id, flag_active: true },
    });
    console.log("Find User Exist", findUserExist);

    if (!findUserCart && !findUserExist) {
      const addNewProductCart = await db.m_cart.create({
        m_product_id: product_id,
        m_user_id: user_id,
        qty: qty,
      });
    } else {
      const updateCart = await db.m_cart.update(
        {
          qty: findUserCart.dataValues.qty + qty,
        },
        {
          where: { m_product_id: product_id, m_user_id: user_id },
        }
      );
    }

    return res.status(200).send({ message: "Add Cart Succesfully" });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

module.exports = {
  addToCart,
  getCartByUser,
};
