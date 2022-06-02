/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { BsCheckLg } from 'react-icons/bs';
import UsuariosService from '../services/usuarios.service';
import * as Yup from 'yup';

const EditarUsuario = (props) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Nome obrigatório'),
    email: Yup.string()
      .required('Email obrigatório')
      .email('Email deve conter "@" e ponto "."'),
    phone: Yup.string()
      .required('Telefone obrigatório')
      .length(9,'Número de telefone deve conter 9 digitos'),
    cpf: Yup.string()
      .required('CPF obrigatório')
      .length(11, 'CPF deve conter 11 dígitos'),
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

  const initialValues = {
    name: '',
    email: '',
    cpf: '',
    inscription: '',
    department: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };

  const [currentUser, setCurrentUser] = useState(initialValues);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(async () => {
    const awaitUsuario = await UsuariosService.getOne(id);
    setCurrentUser(awaitUsuario.data);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const [showAlert, setShowAlert] = useState(false);
  const [backMessage, setBackMessage] = useState('');

  const handleUpdate = () => {
    UsuariosService.update(currentUser)
      .then((response) => {
        setBackMessage(response.data.message);
        setShowAlert(true);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <Formik enableReinitialize initialValues={currentUser}
      validationSchema={validationSchema} onSubmit={handleUpdate}>
      {() => (
        <Form className="container card card-usuario my-3">
          <FormGroup>
            <FormLabel className="h4 my-2">Nome</FormLabel>
            <Field name="name" type="text" size="lg" value={currentUser.name} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">Email</FormLabel>
            <Field name="email" type="email" size="lg" value={currentUser.email} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">CPF</FormLabel>
            <Field name="cpf" type="text" size="lg" value={currentUser.cpf} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
            <ErrorMessage name="cpf" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">Matrícula</FormLabel>
            <Field name="inscription" type="text" size="lg" value={currentUser.inscription} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
            <ErrorMessage name="inscription" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">Telefone</FormLabel>
            <Field name="phone" type="text" size="lg" value={currentUser.phone} onChange={handleInputChange} className="form-control shadow h4 mx-0 mb-2" />
            <ErrorMessage name="phone" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">Setor</FormLabel>
            <Field name="department" type="text" size="lg" value={currentUser.department} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
            <ErrorMessage name="department" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup className="text-center">
            <Button type="submit" onClick={handleUpdate} className="btn btn-primary rounded-pill shadow-lg px-4 py-3 mt-4">
              <BsCheckLg /><span className="mx-2">ATUALIZAR</span>
            </Button>
          </FormGroup>
          {
            showAlert && (
              <Alert variant="success" className="mt-4" onClose={() => {
                setShowAlert(false);
                navigate(-1);
                props.parent.reload();
              }} dismissible>
                {backMessage}
              </Alert>
            )
          }
        </Form>
      )}
    </Formik>
  );
};

export default EditarUsuario;
