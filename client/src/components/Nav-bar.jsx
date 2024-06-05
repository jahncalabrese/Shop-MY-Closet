import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import '../styles/Nav-bar.css'

function NavBar() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <>
        <Navbar expand="lg" bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">Shop My Closet</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/OrderHistory">Order History</Nav.Link>
              <Nav.Link as={Link} to="/Profile">Profile</Nav.Link>
              <Nav.Link as={Link} to="/" onClick={() => Auth.logout()}>Logout</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        </>
        // {/* <ul className="flex-row">
        //   <li className="mx-1">
        //     <Link to="/OrderHistory">
        //       Order History
        //     </Link>
        //   </li>
        //   <li className="mx-1">
        //     <Link to="/Profile">
        //         Profile
        //     </Link>
        //   </li>
        //   <li className="mx-1">
        //     {/* this is not using the Link component to logout or user and then refresh the application to the start */}
        //     <a href="/" onClick={() => Auth.logout()}>
        //       Logout
        //     </a>
        //   </li>
        // </ul> */}
      );
    } else {
      return (
        <>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">Shop My Closet</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        </>
        // <ul className="flex-row">
        //   <li className="mx-1">
        //     <Link to="/register">
        //       Register
        //     </Link>
        //   </li>
        //   <li className="mx-1">
        //     <Link to="/login">
        //       Login
        //     </Link>
        //   </li>
        // </ul>
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
