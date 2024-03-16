import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
// import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'
// import FormControl from 'react-bootstrap/FormControl'
import logo from '../assets/versus-logo.png'
import styles from '../styles/NavBar.module.css'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext'
import axios from 'axios'
import Avatar from './Avatar'

const NavBar = () => {
  const currentUser = useCurrentUser()
  const setCurrentUser = useSetCurrentUser()
  const handleSignOut = async() => {
    try{
      await axios.post('/dj-rest-auth/logout/')
      setCurrentUser(null)
    }catch(err){
      console.log(err.response?.data)
    }
  }

  // console.log(currentUser)

  const addPostIcon = (
    <NavLink className={styles.NavLink} activeClassName={styles.Active} to='/posts/create'><i className="far fa-plus-square"></i>Add Post</NavLink>
  ) 

  const loggedInIcons = (
    <>
      <NavLink className={styles.NavLink} activeClassName={styles.Active} to='/trending'><i className="fa-solid fa-arrow-trend-up"></i>Trending</NavLink>
      <NavLink className={styles.NavLink} activeClassName={styles.Active} to='/voted'><i className="fa-solid fa-square-poll-vertical"></i>Voted</NavLink>
      <NavLink to='/' className={styles.NavLink} onClick={handleSignOut}><i className="fas fa-sign-out-alt"></i>Sign out</NavLink>
      <NavLink className={styles.NavLink} to={`/profiles/${currentUser?.profile_id}`}><Avatar src={currentUser?.profile_image} text={currentUser?.username} height={40} /></NavLink>
    </>
  )
  const loggedOutIcons = (
    <>
      <NavLink to='/signin' className={styles.NavLink} activeClassName={styles.Active}><i className="fa-solid fa-right-to-bracket"></i>Sign in</NavLink>
      <NavLink to='/signup' className={styles.NavLink} activeClassName={styles.Active}><i className="fa-solid fa-user-plus"></i>Sign up</NavLink>
    </>
  )
  return (
      <Navbar className={styles.NavBar} expand="md" fixed='top'>
          <Container>
            <NavLink to='/'>
              <Navbar.Brand>
                <img src={logo} alt='versus logo' height={75} width={75}/>
              </Navbar.Brand>
              </NavLink>

              {/* Current logged in user Icon */}
              {currentUser && addPostIcon}

              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ml-auto text-left">
                      <NavLink exact to='/' className={styles.NavLink} activeClassName={styles.Active}><i className="fa-solid fa-house"></i>Home</NavLink>
                      {currentUser ? loggedInIcons : loggedOutIcons}
                  </Nav>
              </Navbar.Collapse>
          </Container>
      </Navbar>
  )
}

export default NavBar