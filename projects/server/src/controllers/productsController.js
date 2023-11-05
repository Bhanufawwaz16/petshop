const db = require("../models");

async function getProducts(req, res) {
  console.log("produk",req.query)
  try {
    
  } catch (error) {
    console.log("error get produk",error)
  }
}

async function createProducts(req, res) {
  console.log("req createProducts nih", req.body);

  try {
    const { productName, description } = req.body;
    const price = parseInt(req.body.price);
    const categoryId = parseInt(req.body.category);

    if (!productName || !description || !price || !categoryId)
      return res.status(400).send({ message: "please completed your data" });

    const productNameExist = await db.m_products.findOne({
      where:{name:productName}
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

    return res.status(200).send({ message: "succesfully get createProducts" });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(error);
  }
}

module.exports = {
  createProducts,
};
