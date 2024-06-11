import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Auth from '../utils/auth';
import './Profile.css';
import FileUploader from '../components/UploadFiles.jsx';

const GET_PROFILE = gql`
	query GetProfile {
		user {
			items {
				_id
				image
				name
				description
			}
			firstName
			email
			lastName
		}
	}
`;

function Profile() {
	const { loading, error, data } = useQuery(GET_PROFILE);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const me = data?.user || {};
	console.log('me', me);
	return (
		<div className="profile-container">
			<h2>{`${me.firstName} ${me.lastName}`}</h2>
			<p>Email: {me.email}</p>
			<h3>My Items</h3>
			<div className="items-container">
				{me.items ? (
					me.items.map((item) => (
						<div key={item.id} className="item-card">
							<img src={item.image} alt={item.name} />
							<p>{item.name}</p>
						</div>
					))
        
				) : (
					<h4>You have not uploaded any items yet.</h4>
				)}
			</div>
      <div className='container '>
        <FileUploader />
      </div>
			<button onClick={() => Auth.logout()}>Logout</button>
		</div>
	);
}

export default Profile;