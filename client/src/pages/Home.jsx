import CategoryMenu from "../components/CategoryMenu";
import Product from "../components/product";
// import { QUERY_USER } from '../utils/queries';
// import { useQuery } from '@apollo/client';
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="items-container">
        <CategoryMenu />
      </div>
      <div className="items-container">
        <Product />
      </div>
    </div>
  );
}

export default Home;


