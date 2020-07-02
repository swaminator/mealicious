import React from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';


class Header extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Recipes</Nav.Link>
          <Nav.Link href="#link">Add new</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    )
  }
}

export default Header;