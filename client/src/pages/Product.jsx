import { useQuery } from '@apollo/client';
import './Product.css';
import { QUERY_ALL_PRODUCTS } from '../utils/queries';

const Product = () => {
  const { loading, error, data } = useQuery(QUERY_ALL_PRODUCTS);

  console.log(loading, error, data);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <section className="user-list">
      {data.users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </section>
  );
};

export default Product;