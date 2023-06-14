import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:4000/api/v1/products";
const initialState = {
  isLoading: false,
  error: null,
  product: {},
  products: [],
};
export const fetchProducts = createAsyncThunk(
  "/product/fetchProducts",
  async () => {
    const res = await axios(BASE_URL);
    const data = await res.data.products;
    return data;
  }
);
export const fetchProduct = createAsyncThunk(
  "/product/fetchProduct",
  async (productId) => {
    const relativeURL = `${BASE_URL}/${productId}`;
    const res = await axios(relativeURL);
    const data = await res.data.product;
    return data;
  }
);
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});
export default productSlice.reducer;
