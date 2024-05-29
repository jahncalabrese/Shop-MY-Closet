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

const Home = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  
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

export default Home;