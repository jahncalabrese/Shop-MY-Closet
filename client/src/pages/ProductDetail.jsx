import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../utils/globalState";
import {
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from "../utils/actions";
import { QUERY_PRODUCTS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import picFrame from "/images/picture-frame.png"; // Adjust the path as necessary
import reserved from "/images/reserved.png"; // Adjust the path as necessary
import "./ProductDetail.css";

function ProductDetail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise("products", "get").then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  console.log(currentProduct.image);
  

  return (
    <>
      {currentProduct && cart ? (
        <div className="product-detail-container-custom">
          <h2>{currentProduct.name}</h2>

          <div className="product-frame-container-custom">
            <img className="frame-image-custom" src={picFrame} alt="Frame" />
            <img className="product-image-custom" src={currentProduct.image}alt={currentProduct.name}
            />
          </div>

          <div className="product-description-custom">
            <p>{currentProduct.description}</p>
            <p>
              <strong>Price:</strong> ${currentProduct.price}
            </p>
          </div>

          <div className="add-to-cart-container-custom" onClick={addToCart}>
            <img className="add-to-cart-custom" src={reserved} alt="Add to Cart" />
            <div className="reserve-piece-text-custom">add to cart</div>
          </div>
          <div className="back-to-products-container-custom">
          <Link to="/">← Back to Products</Link>
          </div>
        </div>
      ) : null}
    </>
  );
}


export default ProductDetail;
