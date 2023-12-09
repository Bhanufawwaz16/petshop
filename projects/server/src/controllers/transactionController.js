const db = require("../models");

async function createTransaction(req, res) {
  try {
    console.log("req body transaction", req.body);
    const { cart, selectedShippingOption, invoice } = req.body;
    const user_id = req.params.id;

    const totalPrice = cart.reduce((total, product) => {
        // Pastikan properti price pada m_product adalah angka yang valid
        const productPrice = product.m_product && typeof product.m_product.price === 'number' ? product.m_product.price : 0;
      
        return total + productPrice * product.qty;
      }, 0);
      console.log("total price", totalPrice);
      
      const transH=await db.m_transaction_headers.create({
        m_user_id:user_id, total_price:totalPrice, date:new Date()
      })
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

module.exports = {
  createTransaction,
};
