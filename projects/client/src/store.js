import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducer/userSlice";
import categorySlice from "./reducer/categorySlice";
import productSlice from "./reducer/productSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    category: categorySlice,
    product: productSlice,
  },
});

export default store;
