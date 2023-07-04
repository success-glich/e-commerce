import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/productSlice";
import userReducer from "./features/userSlice";
const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
  },
});

export default store;
