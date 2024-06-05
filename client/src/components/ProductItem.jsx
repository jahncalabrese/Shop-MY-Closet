import { Link } from "react-router-dom";
import { useStoreContext } from "../utils/globalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const {
    _id,
    description,
    image,
    name,
    price,
    size
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
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
      <Link to={`/products/${_id}`}>
        <img className="product-image" alt={name} src={`../public/images/${image}`} />
      </Link>
      {/* <Link to={`/products/${_id}`}>
        <p className="product-name">{name}</p>
      </Link>
      <div>
        <p className="product-description">{description}</p>
      </div>
      <div>
        <p>{size} in stock</p>
        <span>${price}</span>
      </div> */}
      <button className="add-to-cart" onClick={addToCart}>Add to cart</button>
    </div>
  );
}


export default ProductItem;
