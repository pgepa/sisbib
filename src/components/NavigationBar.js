import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import brasao from '../brasao.png';

const NavigationBar = () => {
  return (
    <>
      <Navbar bg="success" variant="dark">
        <>
          <Navbar.Brand as={Link} to="/">
            <img src={brasao} width="40%" height="40%" alt="brasao.png" />
          </Navbar.Brand>
          <Nav className="me-auto text-large">
            <Nav.Link as={NavLink} className="margin-large" to="/obras">
              Obras
            </Nav.Link>
            <Nav.Link as={NavLink} className="margin-large" to="/usuarios">
              Usuários
            </Nav.Link>
          </Nav>
        </>
      </Navbar>
    </>
  );
};

export default NavigationBar;
