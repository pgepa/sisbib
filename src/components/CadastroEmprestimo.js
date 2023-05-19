/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel, Row, Col } from 'react-bootstrap';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import EmprestimosService from '../services/emprestimos.service';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Select from 'react-select';
import DateUtils from '../utils/date.utils';

const CadastroEmprestimo = (props) => {
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

  const navigate = useNavigate();

  const handleSubmit = (data) => {
    data.id_transacao = DateUtils.getTransactionId();  
    EmprestimosService.addEmprestimo(data)
    .then((response) => {
      alert(response.data.message);
      navigate('/emprestimos');
      props.parent.reload();
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
  };

  const initialValues = {
    id_transacao: '',
    nome_funcionario: '',
    nome_usuario: '',
    registro_obra1: '',
    registro_obra2: '',
    registro_obra3: '',
    registro_obra4: '',
    registro_obra5: '',
    data_emprestimo: DateUtils.today(),
    data_prevista: DateUtils.daysAfter(15),
    data_devolucao1: DateUtils.today(),
    data_devolucao2: DateUtils.today(),
    data_devolucao3: DateUtils.today(),
    data_devolucao4: DateUtils.today(),
    data_devolucao5: DateUtils.today()
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
    { value: 'alessandra', label: 'Alessandra Mendonça' },
    { value: 'carla', label: 'Carla Blanco' },
    { value: 'rafael', label: 'Rafael Rolo' }
  ]

  const [selectedUser, setSelectedUser] = useState('');

  const handleUserChange = (selectedUser, values) => {
    values.nome_funcionario = selectedUser.value;
    setSelectedUser(selectedUser);
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema}
      onSubmit={handleSubmit}>
        {({ values }) => (
        <Form className="container card card-emprestimo my-3">
          <Row className="my-3">
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Funcionário(a) da ESAP</FormLabel>
                <Select name="nome_funcionario" component={FormikSelect} options={options}
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
                <Field name="nome_usuario" type="text" size="lg" className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="nome_usuario" component="div" className="text-danger" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="my-3">
          <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Data de empréstimo</FormLabel>
                <Field name="data_emprestimo" type="date" size="lg" className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="data_emprestimo" component="div" className="text-danger" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Data prevista da devolução</FormLabel>
                <Field name="data_prevista" type="date" size="lg" className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="data_prevista" component="div" className="text-danger" />
              </FormGroup>
            </Col>
          </Row>
          <hr className="mt-5"/>
          <Row className="my-3">
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Nº do registro da obra 1</FormLabel>
                <Field name="registro_obra1" type="text" size="lg" className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="registro_obra1" component="div" className="text-danger" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Nº do registro da obra 2</FormLabel>
                <Field name="registro_obra2" type="text" size="lg" className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="registro_obra2" component="div" className="text-danger" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Nº do registro da obra 3</FormLabel>
                <Field name="registro_obra3" type="text" size="lg" className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="registro_obra3" component="div" className="text-danger" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="my-3">
          <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Nº do registro da obra 4</FormLabel>
                <Field name="registro_obra4" type="text" size="lg" className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="registro_obra4" component="div" className="text-danger" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Nº do registro da obra 5</FormLabel>
                <Field name="registro_obra5" type="text" size="lg" className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="registro_obra5" component="div" className="text-danger" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col></Col>
            <Col>
              <FormGroup>
                <Button type="submit" className="btn-md btn-success shadow-lg px-3 py-3">
                  <BsCheckLg /><span className="mx-2">REGISTRAR</span>
                </Button>
              </FormGroup>
            </Col>
            <Col></Col>
            <Col>
              <FormGroup>
                <Button type="button" onClick={() => navigate('/emprestimos')} className="btn-md btn-danger shadow-lg px-3 py-3">
                  <BsXLg /><span className="mx-2">CANCELAR</span>
                </Button>
              </FormGroup>
            </Col>
            <Col></Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default CadastroEmprestimo;
