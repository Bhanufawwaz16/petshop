import React, { useEffect, useRef, useState } from "react";
import FilterProductList from "../components/FilterProductList";
import Comboboxes from "../components/Comboboxes";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../reducer/productSlice";
import { fetchCategories } from "../reducer/categorySlice";

const categoryOptions = [{ id: 0, name: "None" }];

const ProductList = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const userGlobal = useSelector((state) => state.user);
  const productsGlobal = useSelector((state) => state.product);

  const categoryGlobal = useSelector((state) => state.category.categories);
  const [categoryFilter, setCategoryFilter] = useState(categoryOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);

  const initialCategoryIdRef = useRef(parseInt(searchParams.get("categoryId")));
  const searchQuery = searchParams.get("q");

  useEffect(() => {
    if (userGlobal.role) {
      dispatch(fetchCategories());
    }
    let query = `page=${currentPage}`;

    searchQuery ? searchParams.set("q", searchQuery) : searchParams.delete("q");
    categoryFilter.id
      ? searchParams.set("categoryId", categoryFilter.id)
      : searchParams.delete("categoryId");

    query += `&${searchParams.toString()}`;
    setSearchParams(searchParams);

    dispatch(fetchProducts(query));
  }, [dispatch, currentPage, categoryFilter, searchParams, searchQuery]);

  const newCategoryOption = categoryGlobal.map((category) => ({
    id: category.id,
    name: category.name,
  }));

  categoryOptions.splice(1, categoryOptions.length - 1, ...newCategoryOption);
  useEffect(() => {
    const initialCategory = categoryOptions.findIndex(
      (c) => c.id === initialCategoryIdRef.current
    );

    if (initialCategory > -1) {
      setCategoryFilter(categoryOptions[initialCategory]);
    }
  }, [categoryGlobal.length]);

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
      <div>
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
    </div>
  );
};

export default ProductList;
