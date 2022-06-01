/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { BsCheckLg } from 'react-icons/bs';
import EmprestimoService from '../services/emprestimo.service';
import * as Yup from 'yup';

const EditarEmprestimo = (props) => {
  const validationSchema = Yup.object().shape({
    nome_funcionario: Yup.string()
      .required('Informe o nome do funcionário.'),
    nome_usuario: Yup.string()
      .required('Informe o nome do usuário.'),
    titulo_obra1: Yup.string()
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
    titulo_obra1: '',
    titulo_obra2: '',
    titulo_obra3: '',
    data_emprestimo: '',
    data_prevista: ''
  };

  const [currentEmprestimo, setCurrentEmprestimo] = useState(initialValues);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(async () => {
    const awaitEmprestimo = await EmprestimoService.getOne(id);
    setCurrentEmprestimo(awaitEmprestimo.data);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentEmprestimo({ ...currentEmprestimo, [name]: value });
  };

  const handleUpdate = () => {
    EmprestimoService.update(currentEmprestimo)
      .then((response) => {
        alert(response.data.message);
        navigate('/emprestimos');
        props.parent.reload();
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <Formik enableReinitialize initialValues={currentEmprestimo}
      validationSchema={validationSchema} onSubmit={handleUpdate}>
      {() => (
        <Form className="container card card-usuario my-3">
        <FormGroup>
          <FormLabel className="h4 my-2">Nome do funcionário</FormLabel>
          <Field name="nome_funcionario" type="text" size="lg" value={currentEmprestimo.nome_funcionario} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
          <ErrorMessage name="nome_funcionario" component="div" className="text-danger" />
        </FormGroup>
        <FormGroup>
          <FormLabel className="h4 my-2">Nome do usuário</FormLabel>
          <Field name="nome_usuario" type="text" size="lg" value={currentEmprestimo.nome_usuario} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
          <ErrorMessage name="nome_usuario" component="div" className="text-danger" />
        </FormGroup>
        <FormGroup>
          <FormLabel className="h4 my-2">Título da obra 1</FormLabel>
          <Field name="titulo_obra1" type="text" size="lg" value={currentEmprestimo.titulo_obra1} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
          <ErrorMessage name="titulo_obra1" component="div" className="text-danger" />
        </FormGroup>
        <FormGroup>
          <FormLabel className="h4 my-2">Título da obra 2</FormLabel>
          <Field name="titulo_obra2" type="text" size="lg" value={currentEmprestimo.titulo_obra2} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
          <ErrorMessage name="titulo_obra2" component="div" className="text-danger" />
        </FormGroup>
        <FormGroup>
          <FormLabel className="h4 my-2">Título da obra 3</FormLabel>
          <Field name="titulo_obra3" type="text" size="lg" value={currentEmprestimo.titulo_obra3} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
          <ErrorMessage name="titulo_obra3" component="div" className="text-danger" />
        </FormGroup>
        <FormGroup>
          <FormLabel className="h4 my-2">Data de empréstimo</FormLabel>
          <Field name="data_emprestimo" type="date" size="lg" value={currentEmprestimo.data_emprestimo} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
          <ErrorMessage name="data_emprestimo" component="div" className="text-danger" />
        </FormGroup>
        <FormGroup>
          <FormLabel className="h4 my-2">Data prevista de devolução</FormLabel>
          <Field name="data_prevista" type="date" size="lg" value={currentEmprestimo.data_prevista} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
          <ErrorMessage name="data_prevista" component="div" className="text-danger" />
        </FormGroup>
        <FormGroup>
          <FormLabel className="h4 my-2">Data real de devolução</FormLabel>
          <Field name="data_devolucao" type="date" size="lg" value={currentEmprestimo.data_devolucao} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
          <ErrorMessage name="data_devolucao" component="div" className="text-danger" />
        </FormGroup>
        <FormGroup>
          <Button type="submit" onClick={handleUpdate} className="btn btn-primary rounded-pill shadow-lg px-4 py-3 m-3">
            <BsCheckLg /><span className="mx-2">ATUALIZAR</span>
          </Button>
        </FormGroup>
      </Form>
      )}
    </Formik>
  );
};

export default EditarEmprestimo;
