import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import brasao from '../brasao.png';
import {FaBook} from 'react-icons/fa';
import {FaUsers} from 'react-icons/fa';
import {FaUserPlus} from 'react-icons/fa';


const NavigationBar = () => {
  return (
    <Navbar bg="success" variant="dark">
      <Navbar.Brand className="mx-0" as={Link} to="/">
        <img src={brasao} width="40%" height="40%" alt="brasao.png" />
      </Navbar.Brand>
      <Nav className="mx-0 text-large">
        <Nav.Link as={NavLink} className="mx-3" to="/obras">
          <FaBook/>
          Obras
        </Nav.Link>
        <Nav.Link as={NavLink} className="mx-5" to="/usuarios">
          <FaUsers/>
          Usuários
        </Nav.Link>
        <Nav.Link as={NavLink} className="mx-5" to="/cadastrousuario">
          <FaUserPlus/>
          ADD Usuários
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
