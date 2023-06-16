import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:4000/api/v1";
const initialState = {
  isLoading: false,
  error: null,
  product: {},
  products: [],
  productsCount: 0,
  resultPerPage: null,
};
export const fetchProducts = createAsyncThunk(
  "/product/fetchProducts",
  async (keyword = "", currentPage = 1) => {
    console.log(currentPage);
    const url = `${BASE_URL}/products/?keyword=${keyword}&page=${currentPage}`;
    console.log({
      urlfromslice: url,
    });

    const res = await axios(`${url}`);
    const data = await res.data;
    return data;
  }
);
export const fetchProduct = createAsyncThunk(
  "/product/fetchProduct",
  async (productId) => {
    const relativeURL = `${BASE_URL}/products/${productId}`;
    const res = await axios(relativeURL);
    const data = await res.data.product;
    return data;
  }
);
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearErrors(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload.products;
      // console.log(products);
      state.resultPerPage = action.payload.resultPerPage;
      state.productsCount = action.payload.productsCount;
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
export const { clearErrors } = productSlice.actions;
