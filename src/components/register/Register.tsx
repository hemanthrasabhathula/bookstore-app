import { faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";
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
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserRegister } from "../../model/Definitions";
import * as formik from "formik";
import * as yup from "yup";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userRegisterForm, setUserRegisterForm] = useState<UserRegister>({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const { Formik } = formik;

  const schema = yup.object({
    username: yup
      .string()
      .matches(/^\S.*$/, "Invalid username")
      .min(3, "Minimum 3 characters")
      .max(25, "Maximum 25 characters")
      .required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(/\d/, "Password must contain a number")
      .matches(/[A-Z]/, "Password must contain capital a letter")
      .matches(
        /[^a-zA-Z0-9]/,
        "Password must contain a special character [ /@#$%^&*()_+!]"
      )
      .min(8, "Password must be at least 8 characters"),
    confirmpassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onHandleSubmit = (
    values: UserRegister,
    formikHelpers: formik.FormikHelpers<UserRegister>
  ) => {
    setUserRegisterForm({ ...values, username: values.username.trimEnd() });
    console.log("Register Details", values);
  };
  useEffect(() => {
    console.log("Register Form", userRegisterForm);
  }, [userRegisterForm]);

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     console.log("Onchange", e.target.value);

  //     setUserRegisterForm({
  //       ...userRegisterForm,
  //       [e.target.name]: e.target.value,
  //     });
  //   };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={onHandleSubmit}
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
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
                      Registration
                    </Card.Title>
                    {/* <Card.Subtitle className="mb-2 text-muted">
                  User Login
                </Card.Subtitle> */}
                    <Form noValidate onSubmit={handleSubmit}>
                      <FloatingLabel
                        controlId="username"
                        label="User Name"
                        className="mb-4 mt-1"
                      >
                        <Form.Control
                          type="text"
                          placeholder="username"
                          value={values.username}
                          onChange={handleChange}
                          name="username"
                          isInvalid={touched.username && !!errors.username}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.username}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                      <FloatingLabel
                        controlId="email"
                        label="Email address"
                        className="mb-4"
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
                          {/* <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback> */}
                        </FloatingLabel>
                        <InputGroup.Text
                          id="passwordview"
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

                      <InputGroup className="mb-4">
                        <FloatingLabel
                          controlId="confirmpassword"
                          label="Confirm Password"
                        >
                          <Form.Control
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={values.confirmpassword}
                            onChange={handleChange}
                            name="confirmpassword"
                            isInvalid={
                              touched.confirmpassword &&
                              !!errors.confirmpassword
                            }
                          ></Form.Control>
                          {/* <Form.Control.Feedback type="invalid">
                          {errors.confirmpassword}
                        </Form.Control.Feedback> */}
                        </FloatingLabel>
                        <InputGroup.Text
                          id="confirmpasswordview"
                          onClick={toggleConfirmPasswordVisibility}
                        >
                          <FontAwesomeIcon
                            icon={showConfirmPassword ? faEye : faEyeSlash}
                          />
                        </InputGroup.Text>
                        {touched.confirmpassword &&
                          !!errors.confirmpassword && (
                            <Form.Control.Feedback
                              type="invalid"
                              className="d-block"
                            >
                              {errors.confirmpassword}
                            </Form.Control.Feedback>
                          )}
                      </InputGroup>
                      <Button
                        className="mb-2 mt-1"
                        variant="primary"
                        style={{ padding: "10px", width: "100%" }}
                        type={"submit"}
                      >
                        Register
                      </Button>
                    </Form>
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
        </Fade>
      )}
    </Formik>
  );
};

export default Register;
