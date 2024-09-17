import { createSlice } from "@reduxjs/toolkit";
import data1 from "../data.json";

const initialState = {
  Tempdata: data1,
  username: "",
  RequiredTime: 120,
};

export const DataSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    UpdateData: (state, action) => {
      state.Tempdata = action.payload;
    },
    login: (state, action) => {
      state.username = action.payload.username;
      state.RequiredTime = action.payload.RequiredTime;
    },
  },
});

// Action creators are generated for each case reducer function
export const { UpdateData, login } = DataSlice.actions;

export default DataSlice.reducer;
