import CategoryMenu from '../components/CategoryMenu';
import Product from '../components/product';
//import Cart from '../components/cart'
import './Home.css';

const Home = () => {
  

  return (
    <div className="container">
      <CategoryMenu />
      <Product />
      {/* <Cart /> */}
    </div>
  );
};

export default Home;