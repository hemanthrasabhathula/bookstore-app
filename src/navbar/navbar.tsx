import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useBooks } from "../components/bookcontext/BookContext";
import { Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useBookStoreContext } from "../components/bookcontext/BookStoreContext";
import { useAuth } from "../context/AuthContext";

const NavBar = (props: { children: React.ReactNode }) => {
  const { cartItems, clearData } = useBookStoreContext();
  const navigate = useNavigate();
  const [booksCount, setBooksCount] = useState(0);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    clearData();
    logout();
    navigate("/login");
  };

  useEffect(() => {
    setBooksCount(cartItems.length);
  }, [cartItems]);
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        className="bg-body-tertiary"
        data-bs-theme="dark"
        style={{ backgroundColor: "transparent !important;" }}
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            Best-Lines-Book
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link eventKey={1} as={Link} to="/books">
                Books
              </Nav.Link>
              {/* <Nav.Link href="#pricing">Branches</Nav.Link> */}
              <Nav.Link eventKey={2} as={Link} to="/branches">
                Branches
              </Nav.Link>
              <Nav.Link eventKey={3} as={Link} to="/addbook">
                Add Book
              </Nav.Link>
            </Nav>
            <Nav>
              {/* <Nav.Link href="#deets">User</Nav.Link .Link> */}
              <Nav.Link eventKey={4} as={Link} to="/cart">
                Cart
                {booksCount === 0 ? null : ( // If no books are found, display a message to the user
                  <Badge bg="warning" text="dark">
                    {booksCount}
                  </Badge>
                )}
              </Nav.Link>
              {user && (
                <>
                  <NavDropdown
                    title={user ? user.username : "User"}
                    id="collapsible-nav-dropdown"
                  >
                    {!user && (
                      <NavDropdown.Item as={Link} to="/login">
                        Login
                      </NavDropdown.Item>
                    )}

                    <NavDropdown.Item as={Link} to="/user">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/transactions">
                      Transactions
                    </NavDropdown.Item>
                    {/* <NavDropdown.Item href="#action/3.3">logout</NavDropdown.Item> */}
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      Log out
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {props.children}
    </div>
  );
};

export default NavBar;
