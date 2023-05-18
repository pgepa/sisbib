import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel, Row, Col } from 'react-bootstrap';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import AuthService from '../services/auth.service';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const CadastroUsuario = (props) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Informe seu nome'),
    email: Yup.string()
      .required('Informe seu email')
      .email('O email deve conter "@" e ponto "."'),
    phone: Yup.string()
      .required('Informe seu telefone')
      .min(8,'O número de telefone deve conter pelo menos 8 digitos'),
    cpf: Yup.string()
      .required('Informe seu CPF')
      .length(11,'CPF deve conter 11 dígitos'),
    inscription: Yup.string()
      .required('Informe seu número de matrícula')
      .min(6, 'O número de matrícula deve conter no mínimo 6 caracteres')
      .max(8, 'O número de matrícula deve conter no máximo 8 caracteres'),
    department: Yup.string()
      .required('Informe seu setor'),
    password: Yup.string()
      .required('Defina uma senha')
      .min(6, 'A senha deve conter no mínimo 6 caracteres')
      .max(20, 'A senha deve conter no máximo 20 caracteres'),
    confirmPassword: Yup.string()
      .required('Confirmação de senha necessária')
      .oneOf(
        [Yup.ref('password'), null],
        'A senha de confirmação é diferente da original.'
      ),
  });

  const navigate = useNavigate();

  const handleSubmit = (data) => {
    AuthService.addUser(data)
    .then((response) => {
      alert(response.data.message);
      navigate(-1);
      props.parent.reload();
    })
    .catch((error) => {
      alert('Erro ao cadastrar usuário!');
      console.log(error);
    });
  };

  const initialValues = {
    name: '',
    email: '',
    cpf: '',
    inscription: '',
    department: '',
    phone:'',
    password: '',
    confirmPassword: ''
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema}
      onSubmit={handleSubmit}>
        {() => (
        <Form className="container card card-usuario my-3">
          <FormGroup>
            <FormLabel className="h4 my-2 ">Nome</FormLabel>
            <Field name="name" type="text" size="lg" className="form-control shadow h4 mx-0 mb-2" />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">Email</FormLabel>
            <Field name="email" type="email" size="lg" className="form-control shadow h4 mx-0 mb-2" />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">CPF</FormLabel>
            <Field name="cpf" type="text" size="lg" className="form-control shadow h4 mx-0 mb-2" />
            <ErrorMessage name="cpf" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">Matrícula</FormLabel>
            <Field name="inscription" type="text" size="lg" className="form-control shadow h4 mx-0 mb-2" />
            <ErrorMessage name="inscription" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">Telefone</FormLabel>
            <Field name="phone" type="text" size="lg" className="form-control shadow h4 mx-0 mb-2" />
            <ErrorMessage name="phone" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">Setor</FormLabel>
            <Field name="department" type="text" size="lg" className="form-control shadow h4 mx-0 mb-2" />
            <ErrorMessage name="department" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">Senha</FormLabel>
            <Field name="password" type="password" size="lg" className="form-control shadow h4 mx-0 mb-2" />
            <ErrorMessage name="password" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">Confirmar senha</FormLabel>
            <Field name="confirmPassword" type="password" size="lg" className="form-control shadow h4 mx-0 mb-2" />
            <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
          </FormGroup>
          <Row className="mt-4 mx-0">
            <Col>
              <FormGroup className="text-center">
                <Button type="submit" className="btn btn-success shadow-lg px-4 py-3">
                  <BsCheckLg /><span className="mx-2">REGISTRAR</span>
                </Button>
              </FormGroup>
            </Col>
            <Col>  
              <FormGroup className="text-center">
                <Button type="button" onClick={() => navigate(-1)} className="btn btn-danger shadow-lg px-4 py-3">
                  <BsXLg /><span className="mx-2">CANCELAR</span>
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default CadastroUsuario;
