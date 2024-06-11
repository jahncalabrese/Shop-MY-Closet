import {useState} from 'react';
import { useQuery, gql } from '@apollo/client';
import Auth from '../utils/auth';
import './Profile.css';
import FileUploader from '../components/UploadFiles.jsx';
import {GET_PROFILE} from '../utils/queries.js';


function Profile() {

  return(
      <div className='container '>
        <FileUploader />
      </div>

	);
}

export default Profile;