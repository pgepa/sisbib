/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { BsCheckLg } from 'react-icons/bs';
import EmprestimosService from '../services/emprestimos.service';
import * as Yup from 'yup';
import Select from 'react-select';

const EditarEmprestimo = (props) => {
  const validationSchema = Yup.object().shape({
    nome_funcionario: Yup.string()
      .required('Informe o nome do funcionário.'),
    nome_usuario: Yup.string()
      .required('Informe o nome do usuário.'),
    registro_obra1: Yup.string()
      .required('Informe pelo menos o título de uma obra.'),
    data_emprestimo: Yup.date()
      .required('Informe a data de empréstimo.'),
    data_prevista: Yup.date()
      .required('Informe a data prevista de devolução.'),
  });

  const initialValues = {
    id_transacao: '',
    nome_funcionario: '',
    nome_usuario: '',
    registro_obra1: '',
    registro_obra2: '',
    registro_obra3: '',
    registro_obra4: '',
    registro_obra5: '',
    data_emprestimo: '',
    data_prevista: ''
  };

  const [currentEmprestimo, setCurrentEmprestimo] = useState(initialValues);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(async () => {
    const awaitEmprestimo = await EmprestimosService.getOne(id);
    setCurrentEmprestimo(awaitEmprestimo.data);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentEmprestimo({ ...currentEmprestimo, [name]: value });
  };

  const [showAlert, setShowAlert] = useState(false);
  const [backMessage, setBackMessage] = useState('');

  const handleUpdate = () => {
    EmprestimosService.update(currentEmprestimo)
      .then((response) => {
        setBackMessage(response.data.message);
        setShowAlert(true);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const FormikSelect = ({options, field, form}) => {
    return (
      <Select
        name={field.name}
        onChange={(option) => form.setFieldValue(field.name, option.value)}
        options={options}
        value={options ? options.find(option => option.value === field.value) : ''}
      />
    );
  }

  const options = [
    { value: 'alessandra', label: 'Alessandra Mendonça'},
    { value: 'carla', label: 'Carla Blanco'},
    { value: 'rafael', label: 'Rafael Rolo'}
  ]

  const [selectedUser, setSelectedUser] = useState('');

  const handleUserChange = (selectedUser, values) => {
    values.nome_funcionario = selectedUser.value;
    setSelectedUser(selectedUser);
  }

  return (
    <Formik enableReinitialize initialValues={currentEmprestimo}
      validationSchema={validationSchema} onSubmit={handleUpdate}>
      {({ values }) => (
        <Form className="container card card-emprestimo my-3">
          <Row className="my-3">
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Funcionário(a) da ESAP</FormLabel>
                <Select name="nome_funcionario" component={FormikSelect} value={currentEmprestimo.nome_funcionario} options={options}
                  onChange={(selectedOption) => {
                      handleUserChange(selectedOption, values);
                    }
                  }
                />
                <ErrorMessage name="nome_funcionario" component="div" className="text-danger" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Nome do(a) solicitante</FormLabel>
                <Field name="nome_usuario" type="text" size="lg" value={currentEmprestimo.nome_usuario} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="nome_usuario" component="div" className="text-danger" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
            <FormGroup>
              <FormLabel className="h4 my-2">Data de empréstimo</FormLabel>
              <Field name="data_emprestimo" type="date" size="lg" value={currentEmprestimo.data_emprestimo} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
              <ErrorMessage name="data_emprestimo" component="div" className="text-danger" />
            </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Data prevista da devolução</FormLabel>
                <Field name="data_prevista" type="date" size="lg" value={currentEmprestimo.data_prevista} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="data_prevista" component="div" className="text-danger" />
              </FormGroup>
            </Col>
          </Row>
          <hr className="mt-5"/>
          <Row className="my-3">
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Nº do registro da obra 1</FormLabel>
                <Field name="registro_obra1" type="text" size="lg" value={currentEmprestimo.registro_obra1} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="registro_obra1" component="div" className="text-danger" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Data real de devolução 1</FormLabel>
                <Field name="data_devolucao1" type="date" size="lg" value={currentEmprestimo.data_devolucao1} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="data_devolucao1" component="div" className="text-danger" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Nº do registro da obra 2</FormLabel>
                <Field name="registro_obra2" type="text" size="lg" value={currentEmprestimo.registro_obra2} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="registro_obra2" component="div" className="text-danger" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Data real de devolução 2</FormLabel>
                <Field name="data_devolucao2" type="date" size="lg" value={currentEmprestimo.data_devolucao2} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="data_devolucao2" component="div" className="text-danger" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="my-3">
          <Col>
            <FormGroup>
                <FormLabel className="h4 my-2">Nº do registro da obra 3</FormLabel>
                <Field name="registro_obra3" type="text" size="lg" value={currentEmprestimo.registro_obra3} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="registro_obra3" component="div" className="text-danger" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Data real de devolução 3</FormLabel>
                <Field name="data_devolucao3" type="date" size="lg" value={currentEmprestimo.data_devolucao3} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="data_devolucao3" component="div" className="text-danger" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="my-3">
             <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Nº do registro da obra 4</FormLabel>
                <Field name="registro_obra4" type="text" size="lg" value={currentEmprestimo.registro_obra4} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="registro_obra4" component="div" className="text-danger" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Data real de devolução 4</FormLabel>
                <Field name="data_devolucao4" type="date" size="lg" value={currentEmprestimo.data_devolucao4} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="data_devolucao4" component="div" className="text-danger" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Nº do registro da obra 5</FormLabel>
                <Field name="registro_obra5" type="text" size="lg" value={currentEmprestimo.registro_obra5} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="registro_obra5" component="div" className="text-danger" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Data real de devolução 5</FormLabel>
                <Field name="data_devolucao5" type="date" size="lg" value={currentEmprestimo.data_devolucao5} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="data_devolucao5" component="div" className="text-danger" />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup className="text-center">
            <Button type="submit" onClick={handleUpdate} className="btn btn-primary rounded-pill shadow-lg px-4 py-3 m-3">
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

export default EditarEmprestimo;
