const db = require("../models");

async function getCartByUser(req, res) {
  try {
    console.log("req res Get To Cart", req.params);
    const user_id = req.params.user_id;

    const cartByUserId = await db.m_cart.findAll({
      where: { m_user_id: user_id, flag_active: true },
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

    const product_id = parseInt(req.body.product_id);
    const user_id = parseInt(req.body.user_id);
    const qty = parseInt(req.body.qty);
    console.log("product id", product_id);
    console.log("user id", user_id);
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

    if (!findUserCart || !findUserExist) {
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

async function reduceCartOne(req, res) {
  try {
    console.log("res body", req.body);
    const { product_id, qty } = req.body;
    const user_id = parseInt(req.params.user_id);
    console.log("user id", user_id);

    const findUserCart = await db.m_cart.findOne({
      where: { m_user_id: user_id, m_product_id: product_id },
    });

    if (!findUserCart)
      return res.status(400).send({ message: "tidak ada produk" });

    const currentQty = findUserCart.dataValues.qty;
    const updateQty = currentQty - qty;

    if (updateQty === 0) {
      await db.m_cart.destroy({
        where: { m_user_id: user_id, m_product_id: product_id },
      });

      return res
        .status(200)
        .send({ message: "produk anda sudah 0 maka akan dihapus" });
    } else {
      await db.m_cart.update(
        { qty: updateQty },
        {
          where: { m_user_id: user_id, m_product_id: product_id },
        }
      );

      return res.status(200).send({ message: "update qty succesfully" });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

async function deleteCart(req, res) {
  try {
    console.log("req body delete", req.body);
    const { product_id } = req.body;
    const user_id = req.params.id;

    await db.m_cart.destroy({
      where: {
        m_user_id: user_id,
        m_product_id: product_id,
      },
    });
    return res.status(200).send({ message: "Delete Succes" });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

module.exports = {
  addToCart,
  getCartByUser,
  reduceCartOne,
  deleteCart,
};
