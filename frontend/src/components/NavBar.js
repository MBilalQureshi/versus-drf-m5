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

const NavBar = () => {
  const currentUser = useCurrentUser()
  const setCurrentUser = useSetCurrentUser()
  const handleSignOut = async() => {
    try{
      await axios.post('dj-rest-auth/logout/')
      setCurrentUser(null)
    }catch(err){
      console.log(err.response?.data)
    }
  }

  const addPostIcon = (
    <NavLink className={styles.NavLink} activeClassName={styles.Active} to='/posts/create'><i className="far fa-plus-square"></i>Add Post</NavLink>
  ) 

  const loggedInIcons = (
    <>
      {/* Add remaining links after logout task */}
      <NavLink to='/' className={styles.NavLink} activeClassName={styles.Active} onClick={handleSignOut}>Sign out</NavLink>
    </>
    )
  const loggedOutIcons = (
    <>
      <NavLink to='/signin' className={styles.NavLink} activeClassName={styles.Active}>Sign in</NavLink>
      <NavLink to='/signup' className={styles.NavLink} activeClassName={styles.Active}>Sign up</NavLink>
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
                      <NavLink exact to='/' className={styles.NavLink} activeClassName={styles.Active}>Home</NavLink>
                      {currentUser ? loggedInIcons : loggedOutIcons}
                  </Nav>
              </Navbar.Collapse>
          </Container>
      </Navbar>
  )
}

export default NavBar