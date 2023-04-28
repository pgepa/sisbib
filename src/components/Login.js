import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel, Col, Row } from 'react-bootstrap';
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
        <Form className="container card card-usuario my-5">
          <FormGroup>
            <FormLabel className="h4 my-2">Email</FormLabel>
            <Field name="email" type="email" size="lg" className="form-control shadow h4 mx-0 mb-2" />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">Senha</FormLabel>
            <Field name="password" type="password" size="lg" className="form-control shadow h4 mx-0 mb-2" />
            <ErrorMessage name="password" component="div" className="text-danger" />
          </FormGroup>
          <Row className="mt-4">
            <Col>
            <Button type="submit" className="btn shadow-lg">
                  <BsCheckLg /><span className="mx-2">ENTRAR</span>
                </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
}

export default Login;