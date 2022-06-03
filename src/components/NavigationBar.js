import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import brasao from '../brasao.png';
import { FaHome, FaUsers, FaExchangeAlt } from 'react-icons/fa';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

const NavigationBar = (props) => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowAdmin(user.roles.includes('ROLE_ADMIN'));
    }
  },[]);
  
  const navigate = useNavigate();

  const logout = () => {
    AuthService.logout();
    alert('Logout efetuado com sucesso.');
    setShowAdmin(false);
    setCurrentUser(null);
    navigate('/');
  }

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
            {!currentUser && (
              <Nav.Link as={Link} to="/login" variant="white" className="mx-4" >
                <BiLogIn />&nbsp;&nbsp;Login
              </Nav.Link>)}
            {showAdmin && (
              <Nav.Link as={Link} to="/usuarios" variant="white" className="mx-4" >
                <FaUsers />&nbsp;&nbsp;Usuários
              </Nav.Link>)}
            {showAdmin && (
              <Nav.Link as={Link} to="/emprestimos" variant="white" className="mx-4" >
                <FaExchangeAlt />&nbsp;&nbsp;Empréstimos
              </Nav.Link>)}
            {currentUser && (
              <Nav.Link  onClick={logout} variant="white" className="mx-4" >
                <BiLogOut />&nbsp;&nbsp;Logout
              </Nav.Link>)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
