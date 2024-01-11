import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import { Form, FormGroup, FormLabel, Row, Col, Container } from 'react-bootstrap';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import AuthService from '../services/auth.service';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './Styles/CadastroUsuario.scss';

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
      .length(11, 'CPF deve conter 11 dígitos'),
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
    <section id='usuerRegister'>

      <Formik initialValues={initialValues} validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {() => (

          <Container>
            <Card className='mt-5 mb-5 p-3'>

              <div className='cardHeader'>
                <h1>Cadastro de Usuário</h1>
                <hr />
              </div>

              <Form>
                <FormGroup className='mb-3'>
                  <Form.Label className='mx-1'>Nome</Form.Label>
                  <Field name="name" type="text" className="form-control" />
                  <ErrorMessage name="name" component="div" className="text-danger" />
                </FormGroup>
                <FormGroup className='mb-3'>
                  <Form.Label className='mx-1'>Email</Form.Label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </FormGroup>
                <FormGroup className='mb-3'>
                  <Row>
                    <Col>
                      <Form.Label className='mx-1'>CPF</Form.Label>
                      <Field name="cpf" type="text" className="form-control" />
                      <ErrorMessage name="cpf" component="div" className="text-danger" />
                    </Col>

                    <Col>
                      <Form.Label className='mx-1'>Matrícula</Form.Label>
                      <Field name="inscription" type="text" className="form-control" />
                      <ErrorMessage name="inscription" component="div" className="text-danger" />
                    </Col>

                    <Col>
                      <Form.Label className='mx-1'>Setor</Form.Label>
                      <Field name="department" type="text" className="form-control" />
                      <ErrorMessage name="department" component="div" className="text-danger" />
                    </Col>
                  </Row>

                </FormGroup>

                <FormGroup className='mb-3'>
                  <Form.Label className='mx-1'>Telefone</Form.Label>
                  <Field name="phone" type="text" className="form-control" />
                  <ErrorMessage name="phone" component="div" className="text-danger" />
                </FormGroup>

                <FormGroup className='mb-3'>
                  <Row>
                    <Col>
                      <Form.Label className='mx-1'>Senha</Form.Label>
                      <Field name="password" type="password" className="form-control" />
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </Col>

                    <Col>
                      <Form.Label className='mx-1'>Confirmar senha</Form.Label>
                      <Field name="confirmPassword" type="password" className="form-control" />
                      <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                    </Col>
                  </Row>

                </FormGroup>
                <Row className="mt-4 mx-0">
                  <Col>
                    <FormGroup className="text-center">
                      <Button type="submit" className="btn btn-success px-4 py-2 ">
                        <BsCheckLg className='icon mx-1' size={15} /> Registrar
                      </Button>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup className="text-center">
                      <Button type="button" onClick={() => navigate(-1)} className="btn btn-danger px-4 py-2 ">
                        <BsXLg className='icon mx-1' size={15} /> Cancelar
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </Card>

          </Container>

        )}
      </Formik>

    </section>
  );
};

export default CadastroUsuario;
