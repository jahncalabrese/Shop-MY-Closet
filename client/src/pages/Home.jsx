import { useQuery} from '@apollo/client';
import Product from '../components/Product';
//import Cart from '../components/cart'
import './Home.css';

const Home = () => {
  

  return (
    <div className="container">
      <Product />
      {/* <Cart /> */}
    </div>
  );
};

export default Home;