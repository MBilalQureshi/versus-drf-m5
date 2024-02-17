import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
// import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'
// import FormControl from 'react-bootstrap/FormControl'
import logo from '../assets/versus-logo.png'
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
  return (
      <Navbar className={styles.NavBar} expand="md" fixed='top'>
          <Container>
              <Navbar.Brand>
                <img src={logo} alt='versus logo' height={120}/>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ml-auto text-left">
                      <Nav.Link>Home</Nav.Link>
                      <Nav.Link>Login</Nav.Link>
                      <Nav.Link>Register</Nav.Link>
                      <Nav.Link>Contact</Nav.Link>
                      <Nav.Link>About Us</Nav.Link>
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