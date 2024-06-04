import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Auth from '../utils/auth';
import './Profile.css';

const GET_PROFILE = gql`
  query GetProfile {
    me {
      id
      username
      email
      items {
        id
        name
        image
      }
    }
  }
`;

function Profile() {
  const { loading, error, data } = useQuery(GET_PROFILE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { me } = data;

  return (
    <div className="profile-container">
      <h2>{me.username}</h2>
      <p>Email: {me.email}</p>
      <h3>My Items</h3>
      <div className="items-container">
        {me.items.map(item => (
          <div key={item.id} className="item-card">
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <button onClick={() => Auth.logout()}>Logout</button>
    </div>
  );
}

export default Profile;
