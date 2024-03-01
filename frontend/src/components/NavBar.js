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
      const csrfToken = document.cookie.match(/csrftoken=([^ ;]+)/)[1];
      axios.post('dj-rest-auth/logout/', {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      })
      setCurrentUser(null)
    }catch(err){
      console.log(err.response?.data)
    }
  }
  // const loggedInIcons = <>{currentUser?.username}</>
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
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ml-auto text-left">
                      <NavLink exact to='/' className={styles.NavLink} activeClassName={styles.Active}>Home</NavLink>
                      {currentUser ? loggedInIcons : loggedOutIcons}
                      <NavLink to='' className={styles.NavLink} activeClassName={styles.Active}>Contact</NavLink>
                      <NavLink to='' className={styles.NavLink} activeClassName={styles.Active}>About Us</NavLink>
                  </Nav>
                  {/* <Form inline> */}
                    {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
                    {/* <Button variant="outline-success"><i class="fa-solid fa-magnifying-glass"></i></Button> */}
                  {/* </Form> */}
              </Navbar.Collapse>
          </Container>
      </Navbar>
  )
}

export default NavBar