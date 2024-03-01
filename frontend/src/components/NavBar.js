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
import { useCurrentUserContext } from '../contexts/CurrentUserContext'

const NavBar = () => {
  const currentUser = useCurrentUserContext()
  const loggedInIcons = <>{currentUser?.username}</>
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