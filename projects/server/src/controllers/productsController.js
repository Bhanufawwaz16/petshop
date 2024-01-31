const db = require("../models");

async function getProducts(req, res) {
  console.log("produk get produk", req.query);
  try {
    const ctgrId = parseInt(req.query.categoryId);

    const categoryClause = ctgrId ? { m_category_id: ctgrId } : {};

    const products = await db.m_products.findAndCountAll({
      subQuery: false,
      where: {
        ...categoryClause,
      },
      include: [
        {
          model: db.m_category,
          attributes: ["id", "name"],
        },
        // {
        //   model: db.m_stocks,
        //   attributes: ["id", "stock"],
        // },
      ],
    });

    res.status(200).send({
      message: "succesfully get data product",
      products,
    });
  } catch (error) {
    console.log("error get produk", error);
    return res.status(400).send(error);
  }
}

async function createProducts(req, res) {
  console.log("req createProducts nih", req.body);

  try {
    const { productName, description } = req.body;
    const stockProduct = parseInt(req.body.stockProduct);
    const price = parseInt(req.body.price);
    const categoryId = parseInt(req.body.category);

    if (!productName || !description || !price || !categoryId)
      return res.status(400).send({ message: "please completed your data" });

    const productNameExist = await db.m_products.findOne({
      where: { name: productName },
    });

    if (productNameExist)
      return res.status(400).send({ message: "product name already exist" });

    const imagePath = req.file.filename;
    console.log("gambar", imagePath);
    const product = await db.m_products.create({
      name: productName,
      image_url: imagePath,
      description: description,
      m_category_id: categoryId,
      price: price,
    });

    const stock = await db.m_stocks.create({
      m_product_id: product.id,
      stock: stockProduct,
    });

    const stockHistory = await db.m_stock_history.create({
      m_product_id: product.id,
      status: "IN",
      qty: stockProduct,
    });

    return res.status(200).send({ message: "succesfully get createProducts" });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

module.exports = {
  getProducts,
  createProducts,
};
