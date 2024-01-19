import { configureStore } from "@reduxjs/toolkit";
import challenges from "./challenges";

export const store = configureStore({
  reducer: { challenges },
});
