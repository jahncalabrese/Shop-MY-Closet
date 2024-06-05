import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Cart from "./cart";

import '../styles/Nav-bar.css'

function NavBar() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <>
        <Navbar expand="lg" bg="dark" data-bs-theme="dark" fixed="top">
          <Container>
            <Navbar.Brand as={Link} to="/">Shop My Closet</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/OrderHistory">Order History</Nav.Link>
              <Nav.Link as={Link} to="/Profile">Profile</Nav.Link>
              <Nav.Link as={Link} to="/" onClick={() => Auth.logout()}>Logout</Nav.Link>
            </Nav>
            <Cart/>
          </Container>
        </Navbar>
        </>
      );
    } else {
      return (
        <>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">Shop My Closet</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        </>
      );
    }
  }

  return (
    <nav>
      {showNavigation()}
    </nav>
  );
}

export default NavBar;
