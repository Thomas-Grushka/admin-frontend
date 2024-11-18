import { createSlice } from "@reduxjs/toolkit";

const user = localStorage.getItem("user");

const initialState = {
  user: user ? JSON.parse(user) : {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    deleteUser: (state)=> {
      state.user = {};
      localStorage.removeItem("user");
    }
  },
});

export const { changeUser, deleteUser } = authSlice.actions;
export default authSlice.reducer;
