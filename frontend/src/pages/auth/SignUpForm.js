import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";
import ModalHandler from "../../components/ModalHandler";

// This component handles user's sign up
const SignUpForm = () => {
  // Redirect user based on authentication status
  useRedirect("loggedIn");
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  // Rules list for modal during sign up
  const rules = ({
    Images: "Images should only be products related.",
    Comments:
      "Everone must be respectable towards what other have to say about products.",
    "Abusive Language":
      "Any abusive language will not be tolerated and will end up in account being revoked.",
    "Images Ownership":
      "User who upload other images must credit them in content.",
    "Account Security":
      "Every user is responsible for their own accounts security.",
  });

  // State to manage custom Modal
  const [showModal, SetShowModal] = useState(false);

  // Destructring sign up form data
  const { username, password1, password2 } = signUpData;

  // State to manage errors
  const [errors, setErrors] = useState({});

  // This history hook handles navigation
  const history = useHistory();
  
  // Handle the chnages in form data
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  // Handles the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData); //,{
      history.push("/signin");
    } catch (err) {
      setErrors(err.response?.data);
      console.log(err);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign up</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">username</Form.Label>
              <Form.Control
                type="text"
                placeholder="username"
                name="username"
                className={styles.Input}
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password1"
                className={styles.Input}
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password2"
                className={styles.Input}
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="submit"
            >
              Sign Up
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert variant="warning" key={idx} className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
          <div className="text-center my-3">
            <Button
              className={`${btnStyles.Button} ${btnStyles.Black} mb-2`}
              onClick={() => SetShowModal(true)}
            >
              Click here to see rules
            </Button>
            <ModalHandler
              show={showModal}
              close={() => SetShowModal(false)}
              rules={rules}
              title="Rules Guide"
            />
          </div>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          alt="products images in single frame"
          src={
            "https://miro.medium.com/v2/resize:fit:720/format:webp/1*ypN4LtX6QxMqQW4FT2lNyQ.png"
          }
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;
