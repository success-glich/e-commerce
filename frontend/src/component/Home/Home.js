import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../app/features/productSlice";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-toastify";
const Home = () => {
  const dispatch = useDispatch();
  const { isLoading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error || "Server error to fetch Products");
    }
    dispatch(fetchProducts({}));
  }, [dispatch, error]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Electrify" />
          <div className="banner">
            <p>Welcome to Electrify</p>
            <h1> Find Amazing Products Below </h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Feature Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
