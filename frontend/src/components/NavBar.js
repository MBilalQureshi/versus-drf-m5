import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/versus-logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import Avatar from "./Avatar";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import modalStyles from "../styles/Modal.module.css";
import { removeTokenTimestamp } from "../utils/utils";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

// This component handles the navigation bar and redirecting user
const NavBar = () => {
  // Context hook to get current user
  const currentUser = useCurrentUser();

  // Context hook to set current user
  const setCurrentUser = useSetCurrentUser();

  // This state set's the signout modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (event) => {
    event.preventDefault();
    setShow(true);
  };

  //well import our toggle custom hook here
  const {expanded, setExpanded, ref} = useClickOutsideToggle();

  // This history hook handles navigation
  const history = useHistory();

  // Hnadles user logout
  const handleSignOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
      history.push('/');
    } catch (err) {
      console.log(err);
    }
    handleClose();
  };

  // Link to add new post
  const addPostIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/posts/create"
    >
      <i className="far fa-plus-square"></i>Add Post
    </NavLink>
  );

  // Logged in icons once user is logged in
  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/trending"
      >
        <i className="fa-solid fa-arrow-trend-up"></i>Trending
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/voted"
      >
        <i className="fa-solid fa-square-poll-vertical"></i>Voted
      </NavLink>
      <NavLink className={styles.NavLink} onClick={handleShow} to="">
        <i className="fas fa-sign-out-alt"></i>Sign out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar
          src={currentUser?.profile_image}
          text={currentUser?.username}
          height={40}
        />
      </NavLink>
    </>
  );

  // Logged out icons once user is logged out
  const loggedOutIcons = (
    <>
      <NavLink
        to="/signin"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fa-solid fa-right-to-bracket"></i>Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fa-solid fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

  return (
    <div>
      <Navbar expanded = {expanded} className={styles.NavBar} expand="md" fixed="top">
        <Container>
          <NavLink to="/">
            <Navbar.Brand>
              <img src={logo} alt="versus logo" height={75} width={75} />
            </Navbar.Brand>
          </NavLink>
          {currentUser && addPostIcon}
          <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto text-left">
              <NavLink
                exact
                to="/"
                className={styles.NavLink}
                activeClassName={styles.Active}
              >
                <i className="fa-solid fa-house"></i>Home
              </NavLink>
              {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className={modalStyles.header}>
          <Modal.Title>Sign Out</Modal.Title>
        </Modal.Header>
        <Modal.Body className={modalStyles.body}>
          <p className="text-dark">Are you sure you want to sign out?</p>
        </Modal.Body>
        <Modal.Footer className={modalStyles.footer}>
          <Button variant="outline-secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NavBar;
