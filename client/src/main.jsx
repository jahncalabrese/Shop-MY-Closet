import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home';
import OrderHistory from './pages/OrderHistory.jsx'
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile';
import Product from './pages/Product';
import NoMatch from './pages/NoMatch';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <h1>NO MATCH PAGE PLACEHOLDER</h1>,
    children: [
      {
        index: true, 
        element: <Home />
      }, {
        path: '/orderHistory',
        element: <OrderHistory />
      },
      {
        path: '/login',
        element: <Login />
      }, {
        path: '/register',
        element: <Register />
      }, {
        path: '/profile',
        element: <Profile />
      }, {
        path: '/products/:id',
        element: <ProductDetail />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
