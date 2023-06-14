import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../features/productSlice";
const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, product, error } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);
  return (
    <>
      <div className="ProductDetails">
        <div>
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
      </div>
    </>
  );
};

export default ProductDetails;

//6:11:37
