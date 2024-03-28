const { where, Op } = require("sequelize");
const db = require("../models");

async function getProducts(req, res) {
  console.log("produk get produk", req.query);
  try {
    const itemsPerPage = 12;
    const ctgrId = parseInt(req.query.categoryId);
    const q = req.query.q;
    const page = parseInt(req.query.page);
    console.log("page product", page);

    const categoryClause = ctgrId ? { m_category_id: ctgrId } : {};
    const productClause = q ? { name: { [Op.like]: "%" + q + "%" } } : {};
    const offsetLimit = {};
    if (page) {
      offsetLimit.limit = itemsPerPage;
      offsetLimit.offset = (page - 1) * itemsPerPage;
    }
    console.log("offSetLimit", offsetLimit);

    const products = await db.m_products.findAndCountAll({
      subQuery: false,
      where: {
        ...categoryClause,
        ...productClause,
      },
      include: [
        {
          model: db.m_category,
          attributes: ["id", "name"],
        },
        {
          model: db.m_stocks,
          attributes: ["id", "stock"],
        },
      ],
      ...offsetLimit,
    });
    // console.log("product data", products);
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
    const { productName, suplier, description } = req.body;
    const stockProduct = parseInt(req.body.stockProduct);
    const price = parseInt(req.body.price);
    const priceFromSuplier = parseInt(req.body.priceFromSuplier);
    const categoryId = parseInt(req.body.category);

    if (
      !productName ||
      !suplier ||
      !description ||
      !price ||
      !priceFromSuplier ||
      !categoryId
    )
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
      price_from_suplier: priceFromSuplier,
    });

    await db.m_stocks.create({
      m_product_id: product.id,
      stock: stockProduct,
    });

    await db.m_stock_history.create({
      m_product_id: product.id,
      suplier_customer: suplier,
      status: "IN",
      qty: stockProduct,
      total_price: priceFromSuplier * stockProduct,
    });

    return res.status(200).send({ message: "succesfully get createProducts" });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

async function updateProduct(req, res) {
  try {
    console.log("req", req.body);
    const productId = parseInt(req.params.id);
    console.log("productId", productId);
    const categoryId = parseInt(req.body.category);
    console.log("category", categoryId);
    const price = parseInt(req.body.price);
    console.log("price", price);
    const stock = parseInt(req.body.stockProduct);
    console.log("stock", stock);
    const description = req.body.description;
    console.log("description", description);
    const productName = req.body.productName;
    console.log("productName", productName);

    if (
      !productName ||
      !categoryId ||
      !price ||
      price < 0 ||
      !stock ||
      stock < 0 ||
      !description
    )
      return res.status(400).send({ message: "please complete your data" });

    const imagePath = req.file?.filename
      ? { image_url: req.file.filename }
      : {};
    // if (!imagePath) return res.status(400).send({ message: "image required" });

    await db.m_products.update(
      {
        name: productName,
        ...(req.file ? { image_url: imagePath.image_url } : {}),
        description: description,
        m_category_id: categoryId,
        price: price,
      },
      { where: { id: productId } }
    );
    await db.m_stocks.update(
      { stock: stock },
      { where: { m_product_id: productId } }
    );

    return res.status(200).send({ message: "Update Succesfully" });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

async function deleteProduct(req, res) {
  try {
    const productId = parseInt(req.params.id);
    console.log("productId", productId);

    await db.m_products.destroy({ where: { id: productId } });

    return res.status(200).send({ message: "Delete Succesfully" });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

module.exports = {
  getProducts,
  createProducts,
  updateProduct,
  deleteProduct,
};
