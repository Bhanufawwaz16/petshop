import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducer/userSlice";
import categorySlice from "./reducer/categorySlice";
import productSlice from "./reducer/productSlice";
import cartSlice from "./reducer/cartSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    category: categorySlice,
    product: productSlice,
    cart: cartSlice,
  },
});

export default store;
