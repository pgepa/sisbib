import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import { Form } from 'react-bootstrap';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import * as Yup from 'yup';

const CadastroUsuario = () => {
  const validationSchema = Yup.object().shape({
    fullname: Yup.string()
      .required('Nome obrigatório'),
    setor: Yup.string()
      .required('Setor obrigatório'),
    matricula: Yup.string()
      .required('Número de matrícula obrigatório')
      .min(6, 'Número de matrícula deve conter no mínimo 6 caracteres')
      .max(8, 'Número de matrícula deve conter no máximo 8 caracteres'),
    cpf: Yup.string()
      .required('CPF obrigatório'),
    email: Yup.string()
      .required('Email obrigatório')
      .email('Email deve conter "@" e ponto "."'),
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

  const handleSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
  };

  const initialValues = {
    fullname: '',
    setor: '',
    matricula: '',
    cpf: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ resetForm }) => (
        <Container>
          <Form>
            <Form.Group>
              <Form.Label className="h4 my-2">Nome</Form.Label>
              <Form.Control name="fullname" type="text" size="lg" className="shadow h4 mx-1 mb-2 w-50" />
              <ErrorMessage name="fullname" className="text-danger" />
            </Form.Group>
            <Form.Group>
              <Form.Label className="h4 my-2">Email</Form.Label>
              <Form.Control name="email" type="email" size="lg" className="shadow h4 mx-1 mb-2 w-50" />
              <ErrorMessage name="email" className="text-danger" />
            </Form.Group>
            <Form.Group>
              <Form.Label className="h4 my-2">CPF</Form.Label>
              <Form.Control name="cpf" type="text" size="lg" className="shadow h4 mx-1 mb-2 w-50" />
              <ErrorMessage name="cpf"className="text-danger" />
            </Form.Group>
            <Form.Group>
              <Form.Label className="h4 my-2">Matrícula</Form.Label>
              <Form.Control name="matricula" type="text" size="lg" className="shadow h4 mx-1 mb-2 w-50" />
              <ErrorMessage name="matricula" className="text-danger" />
            </Form.Group>
            <Form.Group>
              <Form.Label className="h4 my-2">Setor</Form.Label>
              <Form.Control name="setor" type="text" size="lg" className="shadow h4 mx-1 mb-2 w-50" />
              <ErrorMessage name="setor" className="text-danger" />
            </Form.Group>
            <Form.Group>
              <Form.Label className="h4 my-2">Senha</Form.Label>
              <Form.Control name="password" type="password" size="lg" className="shadow h4 mx-1 mb-2 w-50" />
              <ErrorMessage name="password" className="text-danger" />
            </Form.Group>
            <Form.Group>
              <Form.Label className="h4 my-2">Confirmar senha</Form.Label>
              <Form.Control name="confirmPassword" type="password" size="lg" className="shadow h4 mx-1 mb-2 w-50" />
              <ErrorMessage name="confirmPassword" className="text-danger" />
            </Form.Group>
            <Form.Group>
              <Button type="submit" className="btn-lg btn-primary rounded-pill shadow-lg px-5 py-3 m-5">
                <BsCheckLg /><span className="mx-2">REGISTRAR</span>
              </Button>
              <Button type="button" onClick={resetForm} className="btn-lg btn-danger rounded-pill shadow-lg px-5 py-3 m-5">
                <BsXLg /><span className="mx-2">CANCELAR</span>
              </Button>
            </Form.Group>
          </Form>
        </Container>
      )}
    </Formik>
  );
};

export default CadastroUsuario;
