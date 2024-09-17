import { createSlice } from "@reduxjs/toolkit";
import data1 from "../data.json";

const initialState = {
  Tempdata: data1,
};


export const DataSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    UpdateData: (state, action) => {
      console.log("Tempdata after updation-", action.payload);
      state.Tempdata = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { UpdateData } = DataSlice.actions;

export default DataSlice.reducer;
