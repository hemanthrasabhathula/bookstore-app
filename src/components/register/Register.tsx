import { faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <>
      <Container className="d-flex vh-100 align-items-center justify-content-center">
        <Row className="justify-content-center">
          <Col lg={"auto"}>
            <Card style={{ width: "24rem", height: "auto" }}>
              <Card.Body className="d-flex flex-column justify-content-center">
                <Card.Title className="mb-4 align-items-center">
                  Registration
                </Card.Title>
                {/* <Card.Subtitle className="mb-2 text-muted">
                  User Login
                </Card.Subtitle> */}

                <FloatingLabel
                  controlId="username"
                  label="User Name"
                  className="mb-4 mt-1"
                >
                  <Form.Control type="text" placeholder="username" />
                </FloatingLabel>
                <FloatingLabel
                  controlId="email"
                  label="Email address"
                  className="mb-4"
                >
                  <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>

                <InputGroup className="mb-4">
                  <FloatingLabel controlId="password" label="Password">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                    ></Form.Control>
                  </FloatingLabel>
                  <InputGroup.Text
                    id="passwordview"
                    onClick={togglePasswordVisibility}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </InputGroup.Text>
                </InputGroup>

                <InputGroup className="mb-4">
                  <FloatingLabel
                    controlId="confirmpassword"
                    label="Confirm Password"
                  >
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                    ></Form.Control>
                  </FloatingLabel>
                  <InputGroup.Text
                    id="confirmpasswordview"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEye : faEyeSlash}
                    />
                  </InputGroup.Text>
                </InputGroup>
                <Button
                  className="mb-2 mt-1"
                  variant="primary"
                  style={{ padding: "10px" }}
                >
                  Register
                </Button>
                <Card.Text style={{ textAlign: "center" }}>
                  Already have an account?{" "}
                  <Card.Link as={Link} to="/login">
                    Login
                  </Card.Link>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
