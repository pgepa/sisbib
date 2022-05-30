import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel } from 'react-bootstrap';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import UsuarioService from '../services/usuario.service';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const CadastroUsuario = (props) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Nome obrigatório'),
    email: Yup.string()
      .required('Email obrigatório')
      .email('Email deve conter "@" e ponto "."'),
    cpf: Yup.string()
      .required('CPF obrigatório')
      .length(11,'CPF deve conter 11 dígitos'),
    inscription: Yup.string()
      .required('Número de matrícula obrigatório')
      .min(6, 'Número de matrícula deve conter no mínimo 6 caracteres')
      .max(8, 'Número de matrícula deve conter no máximo 8 caracteres'),
    department: Yup.string()
      .required('Setor obrigatório'),
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
    UsuarioService.addUsuario(data)
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
    name: '',
    email: '',
    cpf: '',
    inscription: '',
    department: '',
    password: '',
    confirmPassword: ''
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema}
      onSubmit={handleSubmit}>
        {({ resetForm }) => (
        <Form className="container card card-usuario my-3">
          <FormGroup>
            <FormLabel className="h4 my-2">Nome</FormLabel>
            <Field name="name" type="text" size="lg" className="form-control shadow h4 mx-1 mb-2" />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">Email</FormLabel>
            <Field name="email" type="email" size="lg" className="form-control shadow h4 mx-1 mb-2" />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">CPF</FormLabel>
            <Field name="cpf" type="text" size="lg" className="form-control shadow h4 mx-1 mb-2" />
            <ErrorMessage name="cpf" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">Matrícula</FormLabel>
            <Field name="inscription" type="text" size="lg" className="form-control shadow h4 mx-1 mb-2" />
            <ErrorMessage name="inscription" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">Setor</FormLabel>
            <Field name="department" type="text" size="lg" className="form-control shadow h4 mx-1 mb-2" />
            <ErrorMessage name="department" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">Senha</FormLabel>
            <Field name="password" type="password" size="lg" className="form-control shadow h4 mx-1 mb-2" />
            <ErrorMessage name="password" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">Confirmar senha</FormLabel>
            <Field name="confirmPassword" type="password" size="lg" className="form-control shadow h4 mx-1 mb-2" />
            <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <Button type="submit" onClick={handleSubmit} className="btn btn-primary rounded-pill shadow-lg px-4 py-3 m-3">
              <BsCheckLg /><span className="mx-2">REGISTRAR</span>
            </Button>
            <Button type="button" onClick={resetForm} className="btn btn-danger rounded-pill shadow-lg px-4 py-3 m-3">
              <BsXLg /><span className="mx-2">CANCELAR</span>
            </Button>
          </FormGroup>
        </Form>
      )}
    </Formik>
  );
};

export default CadastroUsuario;
