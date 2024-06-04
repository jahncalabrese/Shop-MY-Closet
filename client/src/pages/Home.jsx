import CategoryMenu from '../components/CategoryMenu';
import Product from '../components/product';
//import Cart from '../components/cart'
import CategoryMenu from '../components/CategoryMenu';
import Product from '../components/product';
//import Cart from '../components/cart'
import './Home.css';

function Home() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="home-container">
      {data.users.map(user => (
        <div key={user.id} className="user-card">
          <h3>{user.username}</h3>
          <div className="items-container">
            {user.items.map(item => (
              <div key={item.id} className="item-card">
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <Link to={`/product/${item.id}`}>View Details</Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;