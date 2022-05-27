import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Row } from 'react-bootstrap';

const Home = () => {
    return (
        <Container className="display-6 my-4 p-5">
            Bem-vindo(a) ao Sistema de Controle Bibliográfico SiSBiB!
            <Row className='justify-content-center' lg="6" >
                <Button variant="success" as={Link} to="/login" >Entrar</Button>
            </Row>
        </Container>
    );
};

export default Home;
