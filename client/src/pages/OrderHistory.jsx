import { Link } from 'react-router-dom';
import "./OrderHistory.css";
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <>
      <div className="order-history-container-custom">
        {user ? (
          <>
            <h2>
              Order History for {user.firstName} {user.lastName}
            </h2>
            {user.orders.map((order) => (
              <div key={order._id} className="order-container-custom">
                <div className="order-date-container-custom">
                  <label>Order Date:</label>
                  <h3>{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</h3>
                </div>
                <div className="order-products-container-custom">
                  {order.products.map(({ _id, image, name, price }, index) => (
                    <div key={index} className="product-card-custom">
                      <Link to={`/products/${_id}`}>
                        <div className="frame-container-order-custom">
                          <img className="frame-image-order-custom" src="/images/picture-frame.png" alt="Frame" />
                          <img className="product-image-order-custom" alt={name} src={`/images/${image}`} />
                        </div>
                      </Link>
                      <div>
                        <span>${price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : null}
        <Link to="/">← Back to Products</Link>
      </div>
    </>
  );
}


export default OrderHistory;