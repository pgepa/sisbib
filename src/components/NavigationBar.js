import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import brasao from '../brasao.png';

const NavigationBar = () => {
    return ( 
        <>
            <Navbar bg="success" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={brasao} width="40%" height="40%"
                            className="d-inline-block align-top"
                            alt="brasao.png" />
                    </Navbar.Brand>
                    <Nav className="col-auto me-auto display-6">
                        <Nav.Link href="/obras">Obras</Nav.Link>
                        <Nav.Link href="/usuarios">Usuários</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default NavigationBar;