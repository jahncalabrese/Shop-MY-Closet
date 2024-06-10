import Auth from "../utils/auth";
import { Link, useLocation } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Cart from "./cart";
import CategoryMenu from './CategoryMenu'; // Import the CategoryMenu
import '../styles/Nav-bar.css'

function NavBar() {
  const location = useLocation(); // Get the current pathname

  const hideCategoryMenu = location.pathname !== "/"; // Only show on home route

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <>
        <Navbar expand="lg" bg="transparent" variant="dark" fixed="top" className="navbar-custom">
          <Container>
            <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">galleria manichino</Navbar.Brand>
            <Nav className="me-auto navbar-nav-custom">
              <Nav.Link as={Link} to="/OrderHistory">order history</Nav.Link>
              <Nav.Link as={Link} to="/Profile">profile</Nav.Link>
              <Nav.Link as={Link} to="/" onClick={() => Auth.logout()}>logout</Nav.Link>
            </Nav>
            {!hideCategoryMenu && <CategoryMenu />}
            <Cart/>
          </Container>
        </Navbar>
        </>
      );
    } else {
      return (
        <>
        <Navbar bg="transparent" variant="dark" fixed="top" className="navbar-custom">
          <Container>
            <Navbar.Brand as={Link} to="/">galleria manichino</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/register">register</Nav.Link>
              <Nav.Link as={Link} to="/login">login</Nav.Link>
              {/* <CategoryMenu /> Add CategoryMenu here */}
              </Nav>
            {!hideCategoryMenu && <CategoryMenu />}
            <Cart/>
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
