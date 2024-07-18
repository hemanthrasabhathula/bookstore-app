import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Fade,
  FloatingLabel,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Fade appear in={true}>
        <Container className="d-flex vh-100 align-items-center justify-content-center">
          <Row className="justify-content-center">
            <Col lg={"auto"}>
              <Card style={{ width: "24rem", height: "auto" }}>
                <Card.Body className="d-flex flex-column justify-content-center">
                  <Card.Title className="mb-5 align-items-center">
                    Login/Register
                  </Card.Title>
                  {/* <Card.Subtitle className="mb-2 text-muted">
                  User Login
                </Card.Subtitle> */}

                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-4"
                  >
                    <Form.Control type="email" placeholder="name@example.com" />
                  </FloatingLabel>

                  <InputGroup className="mb-4">
                    <FloatingLabel
                      controlId="floatingPassword"
                      label="Password"
                    >
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                      ></Form.Control>
                    </FloatingLabel>
                    <InputGroup.Text
                      id="basic-addon2"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEye : faEyeSlash}
                      />
                    </InputGroup.Text>
                  </InputGroup>
                  <Button
                    className="mb-2 mt-1"
                    variant="primary"
                    style={{ padding: "10px" }}
                  >
                    Login
                  </Button>
                  <Card.Text style={{ textAlign: "center" }}>
                    Don't have an account?{" "}
                    <Card.Link as={Link} to="/register">
                      Register
                    </Card.Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fade>
    </>
  );
};

export default Login;
