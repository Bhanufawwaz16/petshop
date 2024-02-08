import { createSlice } from "@reduxjs/toolkit";
// import api from "../api/api";
// import {
//   successAlert,
//   errorAlert,
//   errorAlertWithMessage,
// } from "../helper/alerts";
import axios from "axios";

const BASE_URL = "/category";

const initCategory = {
  totalPages: 0,
  totalItems: 0,
  categories: [],
  isLoading: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState: initCategory,
  reducers: {
    setCategory(state, action) {
      return action.payload;
    },
    setLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },
  },
});

export const { setCategory, setLoading } = categorySlice.actions;

export function fetchCategories(query = "") {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`http://localhost:2000${BASE_URL}`);

      dispatch(
        setCategory({
          categories: res.data.category.rows,
          totalItems: res.data.category.count,
          totalPages: Math.ceil(res.data.category.count / 12),
        })
      );
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setLoading(false));
      //   errorAlert();
      console.log(err.response.data.error);
    }
  };
}

// export function createCategory(name, currPage = 1) {
//   return async (dispatch) => {
//     try {
//       dispatch(setLoading(true));
//       const res = await api.post(BASE_URL, { name });
//       dispatch(fetchCategories(`page=${currPage}`));
//       const newCategory = res.data.category.name;
//       successAlert(`${newCategory} added`);
//     } catch (err) {
//       dispatch(setLoading(false));
//       errorAlertWithMessage(err.response.data.error);
//       console.log(err.response.data.error);
//     }
//   };
// }

// export function updateCategory(id, data, currPage = 1) {
//   return async (dispatch) => {
//     try {
//       dispatch(setLoading(true));
//       await api.patch(`${BASE_URL}/${id}`, data);
//       dispatch(fetchCategories(`page=${currPage}`));
//       successAlert("Updated!");
//     } catch (err) {
//       dispatch(setLoading(false));
//       errorAlertWithMessage(err.response.data.error);
//       console.log(err.response.data.error);
//     }
//   };
// }

// export function deleteCategory(id, currPage = 1) {
//   return async (dispatch) => {
//     try {
//       dispatch(setLoading(true));
//       await api.delete(`${BASE_URL}/${id}`);
//       dispatch(fetchCategories(`page=${currPage}`));
//       successAlert("Deleted!");
//     } catch (err) {
//       dispatch(setLoading(false));
//       errorAlert();
//       console.log(err.response.data.error);
//     }
//   };
// }

export default categorySlice.reducer;
