import React, { useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, clearErrors } from "../../features/productSlice";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import MetaData from "../layout/MetaData";
const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];
const Products = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const { keyword } = useParams();
  const [category, setCategory] = useState(null);
  const [ratings, setRatings] = useState(0);
  const {
    products,
    isLoading,
    error,
    resultPerPage,
    productsCount,
    filteredProductCount,
  } = useSelector((state) => state.products);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(Number(pageNumber));
  };
  const priceHandler = (e, newPrice) => {
    setPrice((_) => newPrice);
    console.log(newPrice);
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      // dispatch(clearErrors());
    }
    dispatch(fetchProducts({ keyword, currentPage, price, category, ratings }));
  }, [dispatch, error, keyword, currentPage, price, category, ratings]);
  const counts = filteredProductCount;
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="PRODUCTS --Electrify" />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              size="small"
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              getAriaLabel={() => "Temperature range"}
              min={0}
              max={25000}
            />
            <Typography>Categories</Typography>

            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Rating Above</Typography>
              <Slider
                size="small"
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                valueLabelDisplay="auto"
                aria-label="Volume"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          {resultPerPage < counts && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={handlePageChange}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"1st"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
