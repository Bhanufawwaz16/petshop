import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

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

export function createProduct(data) {
  console.log("datacreate", data);
  return async (dispatch) => {
    try {
      const res = await axios.post(`http://localhost:2000${BASE_URL}`, data);
    } catch (error) {
      console.log("errorcreateproduct", error);
    }
  };
}
export default productSlice.reducer;
