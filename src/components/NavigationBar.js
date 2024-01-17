import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import brasao from '../brasao.png';
import { FaUsers, FaExchangeAlt } from 'react-icons/fa';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { BiBarcodeReader } from "react-icons/bi";
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import './Styles/NavigationBar.scss';

const NavigationBar = (props) => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowAdmin(user.roles.includes('ROLE_ADMIN'));
    }
  }, []);

  const navigate = useNavigate();

  const logout = () => {
    AuthService.logout();
    alert('Logout efetuado com sucesso.');
    setShowAdmin(false);
    setCurrentUser(null);
    navigate('/');
  }

  return (
    <Navbar className='navigationBar navbar-expand-lg' expand="lg">
      <Container fluid className='mx-4'>

        <img src={brasao} className='brasao' alt="brasao.png" />

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto font-size">

            <NavDropdown className='dropdown mx-3' title="Obras">
              <NavDropdown.Item as={Link} to="/obrasdetalhadas" className='dropdown-item' >Detalhadas</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/obrasresumidas" className='dropdown-item' >Resumidas</NavDropdown.Item>
            </NavDropdown>

            {showAdmin && (
              <Nav.Link href='http://esap.pge.pa.gov.br:5000/' target='_blank' className='mx-3'>
                <BiBarcodeReader /> <span className="align-middle">SIEB</span>
              </Nav.Link>)}

            {showAdmin && (
              <Nav.Link as={Link} className='mx-3' to="/usuarios" >
                <FaUsers /> <span className="align-middle">Usuários</span>
              </Nav.Link>)}

            {showAdmin && (
              <Nav.Link as={Link} className='mx-3' to="/emprestimos" >
                <FaExchangeAlt /> <span className="align-middle">Empréstimos</span>
              </Nav.Link>)}

          </Nav>

          {!currentUser && (
            <Button as={Link} className='btnLogin mx-3' to="/" >
              <BiLogIn /> <span className="align-middle">Login</span>
            </Button>)}

          {currentUser && (
            <Button onClick={logout} className='btnLogout mx-3'>
              <BiLogOut /> <span className="align-middle">Logout</span>
            </Button>)}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
