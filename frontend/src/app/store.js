import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/productSlice";
const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export default store;
