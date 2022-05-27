import React from 'react';
import { Link, } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import brasao from '../brasao.png';
import { FaHome, FaUsers} from 'react-icons/fa';
import {SiBookstack} from "react-icons/si";



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
               <SiBookstack/>Obras
            </Nav.Link>

            <Nav.Link as={Link} to="/usuarios">
               <FaUsers/>Usuários
            </Nav.Link>
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
  );
};

export default NavigationBar;
