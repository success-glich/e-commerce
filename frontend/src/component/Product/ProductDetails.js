import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../features/productSlice";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { toast } from "react-toastify";
const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, product, error } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(fetchProduct(id));
  }, [dispatch, id, error]);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1",
    activeColor: "tomato",
    value: product.ratings,
    size: window.innerWidth < 600 ? 15 : 22,
    isHalf: true,
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.name} --Electrify`} />

          <div className="ProductDetails">
            <div className="carousel">
              <Carousel>
                {product.images &&
                  product.images.map((item, index) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${index} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name} </h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span> ({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>रू {product.price}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input value="1" type="number" />
                    <button>+</button>
                  </div>
                  <button>Add to Cart</button>
                </div>
                <p>
                  Status:{" "}
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description: <p>{product.description}</p>
              </div>
              <button className="submitReview">Submit Review</button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard review={review} key={review._id} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;

//6:11:37
