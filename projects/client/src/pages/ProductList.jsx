import React, { useEffect, useState } from "react";
import FilterProductList from "../components/FilterProductList";
import Comboboxes from "../components/Comboboxes";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../reducer/productSlice";

const ProductList = () => {
  const dispatch = useDispatch();

  const productsGlobal = useSelector((state) => state.product);
  console.log("product global list", productsGlobal);

  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log("test loop");
    let query = `page=${currentPage}`;
    query += `&${searchParams.toString()}`;

    dispatch(fetchProducts(query));
  }, [dispatch, currentPage]);

  if (productsGlobal.isLoading) return <Spinner />;

  return (
    <div className="container-screen">
      {/* <FilterProductList>
        <Comboboxes
        // label="Sort"
        // options={sortOptions}
        // selectedValue={sortFilter}
        // onChange={(s) => setSortFilter(s)}
        // className="font-medium"
        />
        <Comboboxes
        // label="Category"
        // options={categoryOptions}
        // selectedValue={categoryFilter}
        // onChange={(c) => setCategoryFilter(c)}
        // className="font-medium"
        />
      </FilterProductList> */}
      <ProductCard
        products={productsGlobal.product}
        isLoading={productsGlobal.isLoading}
      />
      <Pagination
        itemsInPage={
          productsGlobal && productsGlobal.product
            ? productsGlobal.product.length
            : 0
        }
        totalItems={productsGlobal.totalItems}
        totalPages={productsGlobal.totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
         
    </div>
  );
};

export default ProductList;
