import { Link } from "react-router-dom";
import { useStoreContext } from "../utils/globalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();
  // const {
  //   image,
  //   name,
  //   _id,
  //   price,
  //   quantity
  // } = item;

  // const { cart } = state

  const addToCart = () => {
    const itemInCart = state.cart.find((cartItem) => cartItem._id === item._id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="product-card">
        <div className="frame-container">
          <img className="frame-image" src="../../public/images/picture-frame.png" alt="Frame" />
          <Link to={`/products/${item._id}`}>
            <img className="product-image" alt={item.name} src={`/images/${item.image}`} />
          </Link>
          
        </div>
        
      <div>
        <span className="product-price">${item.price}</span>
      </div>
      <div className="add-to-cart-container">
        <img className="add-to-cart" src="../../public/images/reserved.png" alt="Add to Cart" onClick={addToCart} />
        <div className="reserve-piece-text">Reserve Piece</div>
      </div>
    </div>
  );
}

export default ProductItem;


