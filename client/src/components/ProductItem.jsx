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
      <Link to={`/products/${item._id}`}>
        <img className="product-image" alt={item.name} src={`/images/${item.image}`} />
      </Link>
      <button className="add-to-cart" onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;


