import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import UserDetail from './pages/UserDetail';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Product from './pages/Product';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <NoMatch />,
    children: [
      {
        index: true, 
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/userdetail',
        element: <UserDetail />
      }, {
        path: '/register',
        element: <Register />
      }, {
        path: '/profile',
        element: <Profile />
      }, {
        path: '/products/:id',
        element: <Product />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
