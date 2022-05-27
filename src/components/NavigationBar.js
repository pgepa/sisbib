import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import brasao from "../brasao.png";
import { FaHome, FaUsers } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";

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
            <Nav.Link as={Link} to="/" variant="white" className="mx-4">
              <FaHome />&nbsp;&nbsp;Início
            </Nav.Link>
            <Nav.Link as={Link} to="/obras" variant="white" className="mx-4">
              <SiBookstack />&nbsp;&nbsp;Obras
            </Nav.Link>
            <Nav.Link as={Link} to="/usuarios" variant="white" className="mx-4" >
              <FaUsers />&nbsp;&nbsp;Usuários
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
