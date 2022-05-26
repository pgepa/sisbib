import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
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
        <Nav.Link as={NavLink} className="mx-5" to="/cadastrousuario" text-center>
          <FaUserPlus/>
          Cadastrar Usuários
        </Nav.Link>
      
        <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Dropdown Button
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="/cadastrousuario"><FaUserPlus/>Cadastrar Usuário</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>

      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
