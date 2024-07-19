import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
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
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserLogin } from "../../model/Definitions";
import * as formik from "formik";
import * as yup from "yup";
import { LoginUserAPI } from "../../utils/AuthenticationService";
import ToastItem from "../common/ToastItem";
import { useAuth } from "../../context/AuthContext";
import StorageService from "../../utils/StorageService";
import { SESSION_TIMEOUT } from "../../model/Constants";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const { user, login } = useAuth();

  const [userLogin, setUserLogin] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastObject, setToastObject] = useState({
    heading: "",
    message: "",
    variant: "", // e.g., 'success', 'error', etc.
  });
  const toggleShowtoast = () => setShowToast(!showToast);

  const navigate = useNavigate();

  const { Formik } = formik;

  const schema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const onHandleSubmit = (
    values: UserLogin,
    formikHelpers: formik.FormikHelpers<UserLogin>
  ) => {
    console.log("Login values ", values);
    values.email = values.email.trim();
    setUserLogin(values);

    setLoading(true);
    LoginUserAPI(values)
      .then((response) => {
        setLoading(false);
        console.log("Login response", response);
        if (response.status === 200) {
          // Successful login
          console.log("Login Success");
          setToastObject({
            heading: "Login Success",
            message: response.message,
            variant: "success",
          });
          toggleShowtoast();
          login(response.data, SESSION_TIMEOUT); // 1 minute expiry
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else if (response.status === 401) {
          // password incorrect
          console.log("password incorrect");
          formikHelpers.setErrors({ password: response.message });
        } else if (response.status === 404) {
          //User does not exist
          formikHelpers.setErrors({ email: response.message });
        } else {
          console.log("Error logging in", response.message);
          setToastObject({
            heading: "Login Error",
            message: response.message,
            variant: "error",
          });
          toggleShowtoast();
        }
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log("Error logging in", error);
        setToastObject({
          heading: "Login Error",
          message: error.message ? error.message : "Error logging in",
          variant: "danger",
        });
        toggleShowtoast();
      });
  };

  useEffect(() => {
    console.log("User", user);
    if (StorageService.getUserSession()) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={onHandleSubmit}
        initialValues={{
          email: "",
          password: "",
        }}

        //   onchange={handleChange}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Fade appear in={true}>
            <Container className="d-flex vh-100 align-items-center justify-content-center">
              <Row className="justify-content-center">
                <Col lg={"auto"}>
                  <Card
                    style={{ width: "26rem", height: "auto", padding: "10px" }}
                  >
                    <Card.Body className="d-flex flex-column justify-content-center">
                      <Card.Title className="mb-4 align-items-center">
                        Login/Register
                      </Card.Title>
                      {/* <Card.Subtitle className="mb-2 text-muted">
                  User Login
                </Card.Subtitle> */}
                      <Form noValidate onSubmit={handleSubmit}>
                        <FloatingLabel
                          controlId="email"
                          label="Email address"
                          className="mb-4 mt-1"
                        >
                          <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            value={values.email}
                            onChange={handleChange}
                            name="email"
                            isInvalid={touched.email && !!errors.email}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </FloatingLabel>

                        <InputGroup className="mb-4">
                          <FloatingLabel controlId="password" label="Password">
                            <Form.Control
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              value={values.password}
                              onChange={handleChange}
                              name="password"
                              isInvalid={touched.password && !!errors.password}
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
                          {touched.password && !!errors.password && (
                            <Form.Control.Feedback
                              type="invalid"
                              className="d-block"
                            >
                              {errors.password}
                            </Form.Control.Feedback>
                          )}
                        </InputGroup>
                        <Button
                          className="mb-2 mt-1"
                          variant="primary"
                          style={{ padding: "10px", width: "100%" }}
                          type={"submit"}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                              <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                              <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                            </>
                          ) : (
                            <>{`Login`}</>
                          )}
                        </Button>
                      </Form>
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
        )}
      </Formik>
      <ToastItem
        showToast={showToast}
        {...toastObject}
        toggleToast={toggleShowtoast}
      />
    </>
  );
};

export default Login;
