import React from 'react';
import { Link, } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import brasao from '../brasao.png';
import {FaBook, FaUserPlus, FaHome} from 'react-icons/fa';



const NavigationBar = () => {
  return (
        <Navbar bg="success" variant="dark" expand="lg">
    <Container fluid>
        <Navbar.Brand as={Link} to="/">
            <img src={brasao} width="50%" height="50%" alt="brasao.png" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto font-size">
            <Nav.Link as={Link} to="/">
               <FaHome className='icons'/> Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/obras">
                <FaBook className='icons'/> Obras
            </Nav.Link>
            <Nav.Link as={Link} to="/usuarios">
                <FaUserPlus className='icons'/> Usuarios
            </Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/usuarios">Usuários</NavDropdown.Item>
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
