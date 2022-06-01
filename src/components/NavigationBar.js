import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import brasao from "../brasao.png";
import { FaHome, FaUsers, FaExchangeAlt } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";

const strObras = 'Obras';

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
            <NavDropdown title="Obras" variant="white" className="mx-4">
              <NavDropdown.Item as={Link} to="/obrasdetalhadas">Detalhadas</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/obrasresumidas">Resumidas</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/usuarios" variant="white" className="mx-4" >
              <FaUsers />&nbsp;&nbsp;Usuários
            </Nav.Link>
            <Nav.Link as={Link} to="/emprestimos" variant="white" className="mx-4" >
              <FaExchangeAlt />&nbsp;&nbsp;Empréstimos
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
