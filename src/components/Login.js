import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel, Col, Row } from 'react-bootstrap';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import UsuariosService from '../services/usuarios.service';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const LoginUsuario = (props) => {
    const validationSchema = Yup.object().shape({
        fullname: Yup.string()
        .required('Email obrigatório'),
        password: Yup.string()
        .required('Senha obrigatória')
      });
    
      const navigate = useNavigate();

      const handleSubmit = (data) => {
        UsuariosService.addUsuario(data)
        .then((response) => {
          alert(response.data.message);
          navigate('/usuarios');
          props.parent.reload();
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
      };
    
      const initialValues = {
        fullname: '',
        password: ''
      };
    
      return (
        <Formik initialValues={initialValues} validationSchema={validationSchema}
        onSubmit={handleSubmit}>
          {({ resetForm }) => (
          <Form className="container card card-usuario my-3">
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
            <Row className="mt-4 mx-0">
              <Col>
                <FormGroup className="text-center">
                  <Button type="submit" onClick={handleSubmit} className="btn btn-primary rounded-pill shadow-lg px-4 py-3">
                    <BsCheckLg /><span className="mx-2">Entrar</span>
                  </Button>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="text-center">      
                  <Button type="button" onClick={resetForm} className="btn btn-danger rounded-pill shadow-lg px-4 py-3">
                    <BsXLg /><span className="mx-2">CANCELAR</span>
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
      );
}

export default LoginUsuario;