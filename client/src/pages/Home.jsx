
import { useQuery} from '@apollo/client';
//import UserCard from '../components/UserCard';
import './Home.css';
import { QUERY_ALL_PRODUCTS } from '../utils/queries';

const Home = () => {
  const { loading, error, data } = useQuery(QUERY_ALL_PRODUCTS);
  console.log(loading, error, data);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <section className="user-list">
      {data.products?.map(product => (
        // <UserCard key={user.id} user={user} />
        <h1>Hello world</h1>
      ))}
    </section>
  );
};

export default Home;