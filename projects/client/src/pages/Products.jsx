import { useEffect, useState } from "react";
import AddDataHeader from "../components/AddDataHeader";
import Table from "../components/Table";
import ModalForm from "../components/ModalForm";
import ProductsForm from "../components/ProductsForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../reducer/categorySlice";
import { createProduct } from "../reducer/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  console.log("openmodal", openModal);
  const [productEdit, setProductEdit] = useState();
  const [image, setImage] = useState(
    productEdit && productEdit.image_url
      ? {
          preview: `${process.env.REACT_APP_PRODUCT_IMG_BASE_URL}/${productEdit.image_url}`,
        }
      : {}
  );
  console.log("gambar", image);
  const [selectedCategory, setSelectedCategory] = useState("");
  const userGlobal = useSelector((state) => state.user);
  console.log("Ini User", userGlobal);
  const categoryGlobal = useSelector((state) => state.category);

  useEffect(() => {
    // jika ada userGlobal id ya
    if (userGlobal) {
      // melakukan sesuatu dibawah ini action global /redux
      dispatch(fetchCategories());
    }
  }, [dispatch, userGlobal]);

  function handleSubmit(e) {
    e.preventDefault();
    const { productName, desc, price } = e.target;
    console.log("input productname", productName);

    const categoryid = selectedCategory.id;

    const newProduct = new FormData();

    newProduct.append("productName", productName?.value);
    newProduct.append("desc", desc?.value);
    newProduct.append("price", price?.value);
    newProduct.append("category", categoryid);
    newProduct.append("product_image", image);

    dispatch(createProduct(newProduct));
  }

  return (
    <div>
      <ModalForm
        title="Products"
        open={openModal}
        setOpen={setOpenModal}
        action="Add"
        onSubmit={handleSubmit}
        children={
          <ProductsForm
            categoryOptions={categoryGlobal.categories}
            selectCategory={selectedCategory}
            setSelectCategory={setSelectedCategory}
            image={image}
            setImage={setImage}
          />
        }
      />
      <div>
        <AddDataHeader
          title="Products"
          desc="List Products"
          addButtonText="Add Products"
          onAddClick={() => setOpenModal(true)}
        />
      </div>

      <Table
        className="mb-4"
        headCols={["Nama Products", "Category", "Qty", "Description"]}
      />
    </div>
  );
};

export default Products;
