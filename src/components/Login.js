import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import { FormGroup, Form, Card, Container, Col, Row } from 'react-bootstrap';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import AuthService from '../services/auth.service';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './Styles/Login.scss';

const Login = (props) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Informe seu email.')
      .email('O email deve conter "@" e ponto "."'),
    password: Yup.string()
      .required('Informe sua senha.')
  });

  const navigate = useNavigate();

  const handleLogin = (data) => {
    AuthService.login(data)
      .then((response) => {
        console.log(`handleLogin response = ${response}`);
        alert(response.data.message);
        navigate('/obrasresumidas');
        window.location.reload();
      })
      .catch((error) => {
        alert('Login ou senha inválidos!');
        console.log(error);
      });
  };

  const initialValues = {
    email: '',
    password: ''
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema}
      onSubmit={handleLogin}>
      {() => (
        <section>

          <Container>
            <h1 className='text-center mt-5'>Bem-vindo(a) ao Sistema de Controle Bibliográfico <br /> SiSBiB!</h1>
            <hr />
          </Container>

          <Container>
            <Card className='cardLogin'>
              <Form>

                <h2 className='text-center'>Login</h2>
                <hr />

                <FormGroup>
                  <Form.Label className='mx-1'>Email</Form.Label>
                  <Field name="email" type="email" className="form-control mb-2" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </FormGroup>

                <FormGroup>
                  <Form.Label className='mx-1'>Senha</Form.Label>
                  <Field name="password" type="password" className="form-control mb-2" />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </FormGroup>

                <Row className="mt-4">
                  <Col>
                    <Button type="submit" className="btnLogin shadow-lg">
                      <BsCheckLg /><span className="mx-2">ENTRAR</span>
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Container>

        </section>

      )
      }
    </Formik >
  );
}

export default Login;