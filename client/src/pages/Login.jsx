
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {LOGIN} from '../utils/mutations'

function Login() {
  const navigate = useNavigate()
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { 
          email: formState.email,
          password: formState.password,
        },
      });
      console.log('Login user:', data.login);
      // Redirect to login page or any other page after successful registration
      navigate("/")
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <Link to="/">← Home</Link>

      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
            value={formState.email}
            required
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="password">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="password"
            onChange={handleChange}
            value={formState.password}
            required
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
