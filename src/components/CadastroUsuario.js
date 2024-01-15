import React from 'react';
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel, Row, Col, Container } from 'react-bootstrap';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import AuthService from '../services/auth.service';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';

const CadastroUsuario = (props) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Informe seu nome'),
    email: Yup.string()
      .required('Informe seu email')
      .email('O email deve conter "@" e ponto "."'),
    phone: Yup.string()
      .required('Informe seu telefone')
      .min(8, 'O número de telefone deve conter pelo menos 8 digitos'),
    cpf: Yup.string()
      .required('Informe seu CPF')
      .length(14, 'CPF deve conter 11 dígitos'),
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
    phone: '',
    password: '',
    confirmPassword: ''
  };

  return (


    <Formik initialValues={initialValues} validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {() => (

        <Container>
          <Card className='mt-5 mb-5 p-3'>

            <div className='text-center mt-3'>
              <h1>Cadastro de Usuário</h1>
              <hr />
            </div>

            <Form>
              <FormGroup className='mb-3'>
                <FormLabel className='mx-1'>Nome</FormLabel>
                <Field name="name" type="text" className="form-control" />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </FormGroup>
              <FormGroup className='mb-3'>
                <Row>
                  <Col>
                    <FormLabel className='mx-1'>Email</FormLabel>
                    <Field name="email" type="email" className="form-control" />
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </Col>
                  <Col>
                    <FormLabel className='mx-1'>Telefone</FormLabel>
                    <Field name="phone" type="text" className="form-control" />
                    <ErrorMessage name="phone" component="div" className="text-danger" />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md className='mb-3'>
                    <FormLabel className='mx-1'>CPF</FormLabel>
                    <Field as={InputMask} mask='999.999.999-99' placeholder='___.___.___-__' name="cpf" type="text" className="form-control" />
                    <ErrorMessage name="cpf" component="div" className="text-danger" />
                  </Col>

                  <Col md className='mb-3'>
                    <FormLabel className='mx-1'>Matrícula</FormLabel>
                    <Field name="inscription" type="text" className="form-control" />
                    <ErrorMessage name="inscription" component="div" className="text-danger" />
                  </Col>

                  <Col md className='mb-3'>
                    <FormLabel className='mx-1'>Setor</FormLabel>
                    <Field name="department" type="text" className="form-control" />
                    <ErrorMessage name="department" component="div" className="text-danger" />
                  </Col>
                </Row>
              </FormGroup>

              <FormGroup className='mb-3'>
                <Row>
                  <Col>
                    <FormLabel className='mx-1'>Senha</FormLabel>
                    <Field name="password" type="password" className="form-control" />
                    <ErrorMessage name="password" component="div" className="text-danger" />
                  </Col>

                  <Col>
                    <FormLabel className='mx-1'>Confirmar senha</FormLabel>
                    <Field name="confirmPassword" type="password" className="form-control" />
                    <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                  </Col>
                </Row>

              </FormGroup>

              <Container className='mt-5 mb-3 text-center'>
                <Row>
                  <Col>
                    <Button type="submit" className="btn btn-success px-4 py-2 ">
                      <BsCheckLg className='icon mx-1' size={15} /> Registrar
                    </Button>

                  </Col>
                  <Col>
                    <Button type="button" onClick={() => navigate(-1)} className="btn btn-danger px-4 py-2 ">
                      <BsXLg className='icon mx-1' size={15} /> Cancelar
                    </Button>

                  </Col>
                </Row>
              </Container>

            </Form>
          </Card>

        </Container>

      )}
    </Formik>

  );
};

export default CadastroUsuario;
