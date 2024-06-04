

//import Cart from '../components/cart'
import CategoryMenu from '../components/CategoryMenu';
import Product from '../components/product';
// import { QUERY_USER } from '../utils/queries';
// import { useQuery } from '@apollo/client';
//import Cart from '../components/cart'
import './Home.css';

function Home() {
  // const { loading, error, data } = useQuery(QUERY_USER);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="home-container">
      
          <div className="items-container">
            <CategoryMenu/>
            <Product/>
          </div>
    </div>
  );
}

export default Home;

/* {data.users.map(user => (
        <div key={user.id} className="user-card">
          <h3>{user.username}</h3> */
 /* </div>
      ))} */