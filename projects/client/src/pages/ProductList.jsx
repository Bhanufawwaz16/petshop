import React, { useEffect, useState } from "react";
import FilterProductList from "../components/FilterProductList";
import Comboboxes from "../components/Comboboxes";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../reducer/productSlice";
import { fetchCategories } from "../reducer/categorySlice";

const categoryOptions = [{ id: "", name: "None" }];

const ProductList = () => {
  const dispatch = useDispatch();

  const productsGlobal = useSelector((state) => state.product);
  const categoryGlobal = useSelector((state) => state.category);

  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState(categoryOptions[0]);
  console.log("category filter", categoryFilter);
  
  const newCategoryOption = categoryGlobal.categories.map((category) => ({
    id: category.id,
    name: category.name,
  }));

  categoryOptions.splice(1, categoryOptions.length - 1, ...newCategoryOption);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    let query = `page=${currentPage}`;
    query += `&${searchParams.toString()}`;
    categoryFilter.id
      ? searchParams.set("categoryId", categoryFilter.id)
      : searchParams.delete("categoryId");

    query += `&${searchParams.toString()}`;
    setSearchParams(searchParams);
    dispatch(fetchProducts(query));
  }, [dispatch, currentPage, categoryFilter.id]);

  if (productsGlobal.isLoading) return <Spinner />;

  return (
    <div className="container-screen">
      <FilterProductList>
        <Comboboxes
          label="Category"
          people={categoryOptions}
          selectedValue={categoryFilter}
          setSelectedValue={setCategoryFilter}
          className="font-medium"
        />
      </FilterProductList>
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
