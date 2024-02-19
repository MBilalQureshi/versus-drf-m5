import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import axios from "axios";
// import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
// import { useRedirect } from "../../hooks/useRedirect";
// import { setTokenTimestamp } from "../../utils/utils";

function SignInForm() {

    // const setCurrentUser = useContext(SetCurrentUserContext)
    //we'll change above code to below as its now defined in CurrentUserContext.js
    // const setCurrentUser = useSetCurrentUser()

    /**
     * So, in the SignInForm component, we’ll auto-import our useRedirect
      hook at the top of our component code. And pass it the “loggedIn” string,
      as we want to redirect our users away from this page if they are already logged in.
     */
    // useRedirect('loggedIn')
    
    const [signInData, setSignInData] = useState({
        username : '',
        password : ''
    })
    // Destructure username and password from signInData
    const {username, password} = signInData
    const history = useHistory();
    const [errors, setErrors] = useState({})
    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name] : event.target.value,
        })
    }
    const handleSubmit = async (event) => {
        //so that the page doesn’t refresh.
        event.preventDefault()
        try{
            const csrfToken = document.cookie.match(/csrftoken=([^ ;]+)/)[1];
            await axios.post("/dj-rest-auth/login/", signInData,{
                headers: {
                'X-CSRFToken': csrfToken,
                },})
            // const {data} = await axios.post('/dj-rest-auth/login/',signInData)
            // setting curent user value fetched from drf API
            // setCurrentUser(data.user)

            // Now this function should extract the expiry date from the access token and save it to the user's browser in local storage.
            // setTokenTimestamp(data);

            /*Let’s now update the redirect on successful sign in to send the user back rather than
            have them redirected to the home page.*/
            history.push('/')
            // history.goBack()
        }
        catch(err){
            setErrors(err.response?.data)
            console.log(err.response?.data.detail)
        }
    }
  return (
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign in</h1>

          
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
                <Form.Label className="d-none">username</Form.Label>
                <Form.Control type="text" placeholder="username" name="username" className="styles.Input"
                onChange={handleChange}
                value={username} />
            </Form.Group>
            {errors.username?.map((message, idx) => (
                <Alert variant="warning" key={idx}>message</Alert>
            ))}

            <Form.Group controlId="password">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" className="styles.Input"
                onChange={handleChange}
                value={password} />
            </Form.Group>
            {errors.password?.map((message, idx) => (
                <Alert variant="warning" key={idx}>message</Alert>
            ))}

            <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`} variant="primary" type="submit">
                Sign in
            </Button>
            {/* Add non_fields_erros like if password does not match */}
            {errors.non_field_errors?.map((message, idx)=>(
              <Alert variant="warning" key={idx} className="mt-3">{message}</Alert>
            ))}
          </Form>

        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">
            Don't have an account? <span>Sign up now!</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={"https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero.jpg"}
        />
      </Col>
    </Row>
  );
}

export default SignInForm;