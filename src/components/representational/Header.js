import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const Header = (props) => {
    return (
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Student Registry</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <NavDropdown 
                  title={props.currentRole}
                  id="collasible-nav-dropdown"
                  className=" mr-sm-4">
                  <NavDropdown.Item
                    title="Admin Staff"  
                    onClick={(e) => props.onRoleChange(e.target.title)}>
                      Admin Staff
                  </NavDropdown.Item>
                  <NavDropdown.Item 
                    title="Registrar"
                    onClick={(e) => props.onRoleChange(e.target.title)}>
                      Registrar
                  </NavDropdown.Item>
                </NavDropdown>
                <Button 
                  variant="primary"
                  onClick={props.onOpenModal}>Add New Student</Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
}



export default Header;