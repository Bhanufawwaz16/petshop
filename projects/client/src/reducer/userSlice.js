import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // value: {
  id: 0,
  username: "",
  name: "",
  email: "",
  phone: "",
  birthdate: "",
  m_role_id: 0,
  role: "",
  addres: "",

  // role: "",
  // },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("action", action);

      state.id = action.payload.id;
      state.addres = action.payload.addres;
      state.birthdate = action.payload.birthdate;
      state.username = action.payload.username;
      console.log("state username", state.username);
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.m_role_id = action.payload.m_role_id;
      state.role = action.payload.m_role.name;
    },
    logout: (state) => {
      return initialState;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
