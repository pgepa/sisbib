import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel, Card, Col, Row } from 'react-bootstrap';
import { BsCheckLg } from 'react-icons/bs';
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
    AuthService.login({
      email: data.email?.trim(),
      password: data.password,
    })
      .then((response) => {
        if (!response.data?.accessToken) {
          alert(response.data?.message || 'Login ou senha inválidos!');
          return;
        }
        alert(response.data.message);
        navigate('/obrasresumidas');
        window.location.reload();
      })
      .catch((error) => {
        const message = error.response?.data?.message
          || (error.response?.status === 401 ? 'Senha inválida.' : null)
          || (error.message === 'Network Error' ? 'Não foi possível contactar o servidor. Verifique se o backend está em execução.' : null)
          || 'Login ou senha inválidos!';
        alert(message);
        console.error(error);
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
          <h1 className='text-center mt-5'>Bem-vindo(a) ao Sistema de Controle Bibliográfico <br /> SiSBiB!</h1>
          <hr className='container' />
          <Form>
            <Card className="cardLogin">
              <h2 className='text-center'>Login</h2>
              <hr />
              <FormGroup>
                <FormLabel className='mx-1'>Email</FormLabel>
                <Field name="email" type="email" className="form-control mb-2" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </FormGroup>
              <FormGroup>
                <FormLabel className='mx-1'>Senha</FormLabel>
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
            </Card>
          </Form>
        </section>
      )}
    </Formik >
  );
}

export default Login;