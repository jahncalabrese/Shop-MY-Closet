import React from 'react';
import { useQuery, gql } from '@apollo/client';
import UserCard from '../components/UserCard';
import './Home.css';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
      clothingItems {
        id
        name
      }
    }
  }
`;

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