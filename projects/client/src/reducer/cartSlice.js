import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import api from "../api/api";

const BASE_URL = "/cart";

const initCart = {
  cart: [],
  isLoading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initCart,
  reducers: {
    setCart(state, action) {
      return action.payload;
    },
    setLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },
  },
});

export const { setCart, setLoading } = cartSlice.actions;

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

export default cartSlice.reducer;
