import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import {
  errorAlert,
  errorAlertWithMessage,
  successAlert,
} from "../helper/alert";
import api from "../api/api";

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
      dispatch(setLoading(true));
      const res = await api.get(`${BASE_URL}?${query}`);
      // console.log("get produk", res);
      dispatch(
        setProduct({
          product: res.data.products.rows,
          totalItems: res.data.products.count,
          totalPages: Math.ceil(res.data.products.count / 12),
        })
      );
      dispatch(setLoading(false));
    } catch (error) {
      console.log("error get produk", error);
    }
  };
}

export function createProduct(data) {
  console.log("datacreate", data);
  return async (dispatch) => {
    try {
      const res = await api.post(`${BASE_URL}`, data);
      console.log("produk", res);
      successAlert(res.data.message);
      return res;
    } catch (error) {
      console.log("errorcreateproduct", error);
      errorAlertWithMessage(error.response.data.message);
    }
  };
}

export function updateProduct(data, id) {
  console.log("datacreate", data);
  return async (dispatch) => {
    try {
      const res = await api.patch(`${BASE_URL}/${id}`, data);
      console.log("produk", res);
      successAlert(res.data.message);
      return res;
    } catch (error) {
      console.log("error update product", error);
      errorAlertWithMessage(error.response.data.message);
    }
  };
}

export function deleteProduct(id) {
  console.log("id", id);
  return async (dispatch) => {
    try {
      const res = await api.delete(`${BASE_URL}/${id}`);
      console.log("produk", res);
      successAlert(res.data.message);
      return res;
    } catch (error) {
      console.log("error delete product", error);
      errorAlertWithMessage(error.response.id.message);
    }
  };
}

export default productSlice.reducer;
