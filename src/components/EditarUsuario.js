/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { BsCheckLg } from 'react-icons/bs';
import UsuariosService from '../services/usuarios.service';
import * as Yup from 'yup';

const EditarUsuario = (props) => {
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

  const handleUpdate = () => {
    UsuariosService.update(currentUser)
      .then((response) => {
        alert(response.data.message);
        navigate(-1);
        props.parent.reload();
      })
      .catch((error) => {
        alert('Erro ao atualizar usuário!');
        console.log(error);
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
        </Form>
      )}
    </Formik>
  );
};

export default EditarUsuario;
