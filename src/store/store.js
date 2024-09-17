import { configureStore } from "@reduxjs/toolkit";
import DataSlice from "../store/DataSlice.js";

export const store = configureStore({
  reducer: {
    Auth: DataSlice,
  },
});
