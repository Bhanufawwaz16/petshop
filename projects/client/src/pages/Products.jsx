import { useEffect, useState } from "react";
import AddDataHeader from "../components/AddDataHeader";
import Table from "../components/Table";
import ModalForm from "../components/ModalForm";
import ProductsForm from "../components/ProductsForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../reducer/categorySlice";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../reducer/productSlice";
import { useParams, useSearchParams } from "react-router-dom";
import TableBodyProduct from "../components/TableBodyProduct";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import { deleteConfirmationAlert } from "../helper/alert";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // console.log("openmodal", openModal);
  const [addNewData, setAddNewData] = useState(false);
  const [dataEdit, setDataEdit] = useState();
  console.log("data edit", dataEdit);

  const [actionSend, setActionSend] = useState("");
  const [productEdit, setProductEdit] = useState();
  const [image, setImage] = useState(
    productEdit && productEdit.image_url
      ? {
          preview: `${process.env.REACT_APP_PRODUCT_IMG_BASE_URL}/${productEdit.image_url}`,
        }
      : {}
  );
  const [productName, setProductName] = useState("");
  const [suplier, setSuplier] = useState("");
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [priceFromSuplier, setPriceFromSuplier] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const userGlobal = useSelector((state) => state.user);
  // console.log("Ini User", userGlobal);
  const categoryGlobal = useSelector((state) => state.category);
  const productGlobal = useSelector((state) => state.product);

  useEffect(() => {
    if (actionSend == "edit" && dataEdit) {
      setProductName(dataEdit && dataEdit.name ? dataEdit.name : "");
      setDescription(
        dataEdit && dataEdit.description ? dataEdit.description : ""
      );
      setPrice(dataEdit && dataEdit.price ? dataEdit.price : "");
      setSelectedCategory(
        dataEdit && dataEdit.m_category ? dataEdit.m_category : ""
      );
      setStock(dataEdit && dataEdit.m_stocks ? dataEdit.m_stocks[0].stock : 0);
      setImage(
        dataEdit && dataEdit.image_url
          ? {
              preview: `${process.env.REACT_APP_PRODUCT_IMG_BASE_URL}/${dataEdit.image_url}`,
            }
          : {}
      );
    }
    if (!openModal) {
      setProductName("");
      setDescription("");
      setPrice(0);
      setSelectedCategory("");
      setStock(0);
      setImage({});
      setDataEdit({});
      setActionSend("");
    }
  }, [openModal, !openModal]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, addNewData]);

  useEffect(() => {
    if (openModal === false) {
      setStock(0);
      setPrice(0);
      setAddNewData(false);
    }
  }, [openModal]);

  useEffect(() => {
    // jika ada userGlobal id ya
    if (userGlobal) {
      // melakukan sesuatu dibawah ini action global /redux
      dispatch(fetchCategories());
    }
  }, [dispatch, userGlobal]);

  function handleSubmit(e) {
    e.preventDefault();
    const suplierName = suplier ? suplier : null;
    const name = productName ? productName : null;
    const desc = description ? description : null;
    const priceProduct = price ? price : null;
    const priceFromSuplierProd = priceFromSuplier ? priceFromSuplier : null;
    const stockProduct = stock ? stock : null;
    const categoryid = selectedCategory.id;

    const newProduct = new FormData();
    newProduct.append("suplier", suplierName);
    newProduct.append("productName", productName);
    newProduct.append("description", desc);
    newProduct.append("price", priceProduct);
    newProduct.append("priceFromSuplier", priceFromSuplierProd);
    newProduct.append("stockProduct", stockProduct);
    newProduct.append("category", categoryid);
    newProduct.append("product_image", image);

    if (actionSend === "add") {
      dispatch(createProduct(newProduct)).then((res) => {
        if (res && res.status === 200) {
          setTimeout(() => {
            setAddNewData(true);
            setOpenModal(false);
          }, 2000);
        }
      });
    } else if (actionSend === "edit") {
      dispatch(updateProduct(newProduct, dataEdit.id)).then((res) => {
        if (res && res.status === 200) {
          setTimeout(() => {
            setAddNewData(true);
            setOpenModal(false);
          }, 2000);
        }
      });
    }
  }

  function handleDeleteClick(productId) {
    deleteConfirmationAlert(() =>
      dispatch(deleteProduct(productId)).then((res) => {
        if (res && res.status === 200) {
          setTimeout(() => {
            setAddNewData(true);
          }, 1500);
        }
      })
    );
  }

  function handleEditClick(product) {
    setDataEdit(product);
    setOpenModal(true);
  }

  if (productGlobal.isLoading) return <Spinner />;

  return (
    <div>
      <ModalForm
        title="Products"
        open={openModal}
        setOpen={setOpenModal}
        action="Add"
        actionSend={actionSend}
        onSubmit={handleSubmit}
        children={
          <ProductsForm
            categoryOptions={categoryGlobal.categories}
            selectCategory={selectedCategory}
            setSelectCategory={setSelectedCategory}
            productName={productName}
            setProductName={setProductName}
            suplier={suplier}
            setSuplier={setSuplier}
            description={description}
            setDescription={setDescription}
            price={price}
            setPrice={setPrice}
            priceFromSuplier={priceFromSuplier}
            setPriceFromSuplier={setPriceFromSuplier}
            image={image}
            setImage={setImage}
            setStock={setStock}
            stock={stock}
          />
        }
      />
      <div>
        <AddDataHeader
          title="Products"
          desc="List Products"
          addButtonText="Add Products"
          onAddClick={() => {
            setOpenModal(true);
            setActionSend("add");
          }}
        />
      </div>

      <Table
        className="mb-4"
        headCols={[
          "Nama Products",
          "Category",
          "Price",
          "Price From Suplier",
          "Desc",
          "stock",
        ]}
        tableBody={
          <TableBodyProduct
            onDelete={handleDeleteClick}
            onEdit={handleEditClick}
            setAction={setActionSend}
            products={
              productGlobal && productGlobal.product
                ? productGlobal.product
                : []
            }
          />
        }
      />
      <Pagination
        itemsInPage={
          productGlobal && productGlobal.product
            ? productGlobal.product.length
            : 0
        }
        totalItems={productGlobal.totalItems}
        totalPages={productGlobal.totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Products;
