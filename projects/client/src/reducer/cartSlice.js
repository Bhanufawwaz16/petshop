import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import api from "../api/api";

const BASE_URL = "/cart";

const initCart = {
  cart: [],
  isLoading: false,
  load: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initCart,
  reducers: {
    setCart(state, action) {
      return { ...state, cart: action.payload };
    },
    setLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },
    setLoad(state, action) {
      return { ...state, load: action.payload };
    },
  },
});

export const { setCart, setLoading, setLoad } = cartSlice.actions;

export function fetchCart(user_id) {
  return async (dispatch) => {
    try {
      const res = await api.get(`${BASE_URL}/${user_id}`);
      console.log("Ini Res Patch Cart", res);
      dispatch(setCart(res.data.cartByUserId));
    } catch (error) {
      console.log("Error Fetch Cart", error);
      return error;
    }
  };
}

export function loadCart(status) {
  return async (dispatch) => {
    console.log("load cart jalan", loadCart);
    console.log("status saat ini", status);
    if (status) {
      dispatch(setLoad(true)); // Memanggil dispatch untuk mengirimkan aksi ke Redux
    } else {
      dispatch(setLoad(false)); // Memanggil dispatch untuk mengirimkan aksi ke Redux
    }
  };
}

export default cartSlice.reducer;
