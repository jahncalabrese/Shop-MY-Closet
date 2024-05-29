import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import './UserDetail.css';

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      username
      clothingItems {
        id
        name
        description
      }
    }
  }
`;

const UserDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { user } = data;

  return (
    <section className="user-detail">
      <h2>{user.username}</h2>
      <div className="items-container">
        {user.clothingItems.map(item => (
          <div key={item.id} className="item-card">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserDetail;