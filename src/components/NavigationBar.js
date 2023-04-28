import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import brasao from '../brasao.png';
import { FaHome, FaUsers, FaExchangeAlt} from 'react-icons/fa';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import './Styles/NavigationBar.scss';

const NavigationBar = (props) => {
  const [showAdmin, setShowAdmin] = useState(true);
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
      <Container fluid>

        <img src={brasao} className='brasao' alt="brasao.png" />

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto font-size">

            <Nav.Link as={Link} to="/" >
              <FaHome /> <span className="align-middle">Início</span>
            </Nav.Link>
            
            <NavDropdown className='dropdown' title="Obras">
              <NavDropdown.Item as={Link}  to="/obrasdetalhadas" className='dropdown-item' >Detalhadas</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/obrasresumidas" className='dropdown-item' >Resumidas</NavDropdown.Item>
            </NavDropdown>

            {!currentUser && (
              <Nav.Link as={Link} to="/login" >
                <BiLogIn /> <span className="align-middle">Login</span>
              </Nav.Link>)}
            {showAdmin && (
              <Nav.Link as={Link} to="/usuarios" >
                <FaUsers /> <span className="align-middle">Usuários</span>
              </Nav.Link>)}
            {showAdmin && (
              <Nav.Link as={Link} to="/emprestimos" >
                <FaExchangeAlt /> <span className="align-middle">Empréstimos</span>
              </Nav.Link>)}
            {currentUser && (
              <Nav.Link onClick={logout} >
                <BiLogOut /> <span className="align-middle">Logout</span>
              </Nav.Link>)}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
