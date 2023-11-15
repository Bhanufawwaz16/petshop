import React, { useEffect } from "react";
import FilterProductList from "../components/FilterProductList";
import Comboboxes from "../components/Comboboxes";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../reducer/productSlice";

const ProductList = () => {
  const dispatch = useDispatch();

//   const productsGlobal = useSelector((state) => state.product);
//   console.log("product global list", productsGlobal);

//   useEffect(() => {
//     console.log('test loop')
//     dispatch(fetchProducts());
//   }, [dispatch]);

  return (
    <div className="container-screen">
      <FilterProductList>
        <Comboboxes
        //   label="Sort"
        //   options={sortOptions}
        //   selectedValue={sortFilter}
        //   onChange={(s) => setSortFilter(s)}
        //   className="font-medium"
        />
        <Comboboxes
        //   label="Category"
        //   options={categoryOptions}
        //   selectedValue={categoryFilter}
        //   onChange={(c) => setCategoryFilter(c)}
        //   className="font-medium"
        />
      </FilterProductList>
      <ProductCard
        // products={productsGlobal.product}
        // isLoading={productsGlobal.isLoading}
      />
      <Pagination
      // itemsInPage={countProducts(productsGlobal.products)}
      // totalItems={productsGlobal.totalItems}
      // totalPages={productsGlobal.totalPages}
      // currentPage={currentPage}
      // setCurrentPage={setCurrentPage}
      />
         
    </div>
  );
};

export default ProductList;
