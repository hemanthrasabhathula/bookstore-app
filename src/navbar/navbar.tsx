import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useBooks } from "../components/bookcontext/BookContext";
import { Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NavBar = (props: { children: React.ReactNode }) => {
  const { bookslist } = useBooks();
  const navigate = useNavigate();
  const [booksCount, setBooksCount] = useState(0);
  useEffect(() => {
    setBooksCount(bookslist.length);
  }, [bookslist]);
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Book-Store App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Books
              </Nav.Link>
              <Nav.Link href="#pricing">Branches</Nav.Link>
              <Nav.Link as={Link} to="/addbook">
                Add Book
              </Nav.Link>
            </Nav>
            <Nav>
              {/* <Nav.Link href="#deets">User</Nav.Link .Link> */}
              <Nav.Link eventKey={2} as={Link} to="/cart">
                Cart
                {booksCount === 0 ? null : ( // If no books are found, display a message to the user
                  <Badge bg="warning" text="dark">
                    {booksCount}
                  </Badge>
                )}
              </Nav.Link>
              <NavDropdown title="User" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Transactions
                </NavDropdown.Item>
                {/* <NavDropdown.Item href="#action/3.3">logout</NavDropdown.Item> */}
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Log out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {props.children}
    </div>
  );
};

export default NavBar;
