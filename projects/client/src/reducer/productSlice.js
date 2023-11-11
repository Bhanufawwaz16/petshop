import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import {
  errorAlert,
  errorAlertWithMessage,
  successAlert,
} from "../helper/alert";

const BASE_URL = "/products";

const initProduct = {
  totalPages: 0,
  totalItems: 0,
  products: [],
  isLoading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState: initProduct,
  reducers: {
    setProduct(state, action) {
      return action.payload;
    },
    setLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },
  },
});

export const { setProduct, setLoading } = productSlice.actions;

export function fetchProducts(query) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const res = await axios.get(`http://localhost:2000${BASE_URL}?${query}`);
      console.log("get produk", res);
      dispatch(
        setProduct({
          product: res.data.products.rows,
          totalItems: res.data.products.count,
          totalPages: Math.ceil(res.data.products.count / 12),
        })
      );
      dispatch(setLoading(false))
    } catch (error) {
      console.log("error get produk", error);
    }
  };
}

export function createProduct(data) {
  console.log("datacreate", data);
  return async (dispatch) => {
    try {
      const res = await axios.post(`http://localhost:2000${BASE_URL}`, data);
      console.log("produk", res);
      successAlert(res.data.message);
    } catch (error) {
      console.log("errorcreateproduct", error);
      errorAlertWithMessage(error.response.data.message);
    }
  };
}
export default productSlice.reducer;
