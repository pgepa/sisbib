import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import brasao from '../brasao.png';
import {FaBook} from 'react-icons/fa';
import {FaUsers} from 'react-icons/fa';
import {FaUserPlus} from 'react-icons/fa';


const NavigationBar = () => {
  return (
        <Navbar bg="success" variant="dark" expand="lg">
    <Container>
        <Navbar.Brand as={Link} to="/">
            <img src={brasao} width="40%" height="40%" alt="brasao.png" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
                Inicio
                </Nav.Link>
            <Nav.Link as={Link} to="/obras">
                <FaBook/> Obras
                </Nav.Link>
            <Nav.Link as={Link} to="/usuarios">
                <FaUserPlus/> Usuarios
                </Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
  );
};

export default NavigationBar;
