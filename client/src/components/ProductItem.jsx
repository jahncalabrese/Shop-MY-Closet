import { Link } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";
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

    
    <div className="card px-1 py-1">
        <img
          className="image"
          alt={name}
          src={`/images/${image}`}
        />
        <Link to={`/products/${_id}`}>
          <p className="name">{name}</p>
        </Link>
      <div>
        <p className="description">{description}</p>
      </div>
      <div>
      </div>
      <div>
        <div>{size} <br></br>in stock</div>
        <span>${price}</span>
      </div>
      <button className="addToCart" onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;