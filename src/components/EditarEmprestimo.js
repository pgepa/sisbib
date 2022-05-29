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
    id_transacao: Yup.string()
      .required('Código da transação obrigatório.'),
    id_funcionario: Yup.number()
      .required('ID do funcionário obrigatório.'),
    id_Emprestimo: Yup.number()
      .required('ID do usuário obrigatório.'),
    id_obra: Yup.number()
      .required('ID da obra obrigatório.'),
    data_emprestimo: Yup.date()
      .required('Data de empréstimo obrigatória.'),
    data_prevista: Yup.date()
      .required('Data prevista obrigatória.'),
  });

  const initialValues = {
    id_transacao: '',
    id_funcionario: '',
    id_Emprestimo: '',
    id_obra: '',
    data_emprestimo: '',
    data_prevista: ''
  };

  const [currentEmprestimo, setCurrentEmprestimo] = useState(initialValues);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(async () => {
    const awaitEmprestimo = await EmprestimoService.getOne(id);
    return setCurrentEmprestimo(awaitEmprestimo.data);
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
          <FormLabel className="h4 my-2">Código da transação</FormLabel>
          <Field name="id_transacao" type="text" size="lg" value={currentEmprestimo.id_transacao} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
          <ErrorMessage name="id_transacao" component="div" className="text-danger" />
        </FormGroup>
        <FormGroup>
          <FormLabel className="h4 my-2">ID do funcionário</FormLabel>
          <Field name="id_funcionario" type="number" size="lg" value={currentEmprestimo.id_funcionario} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
          <ErrorMessage name="id_funcionario" component="div" className="text-danger" />
        </FormGroup>
        <FormGroup>
          <FormLabel className="h4 my-2">ID do usuário</FormLabel>
          <Field name="id_usuario" type="number" size="lg" value={currentEmprestimo.id_usuario} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
          <ErrorMessage name="id_usuario" component="div" className="text-danger" />
        </FormGroup>
        <FormGroup>
          <FormLabel className="h4 my-2">ID da obra</FormLabel>
          <Field name="id_obra" type="text" size="lg" value={currentEmprestimo.id_obra} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
          <ErrorMessage name="id_obra" component="div" className="text-danger" />
        </FormGroup>
        <FormGroup>
          <FormLabel className="h4 my-2">Data de empréstimo</FormLabel>
          <Field name="data_emprestimo" type="date" size="lg" value={currentEmprestimo.data_emprestimo} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
          <ErrorMessage name="data_emprestimo" component="div" className="text-danger" />
        </FormGroup>
        <FormGroup>
          <FormLabel className="h4 my-2">Data prevista</FormLabel>
          <Field name="data_prevista" type="date" size="lg" value={currentEmprestimo.data_prevista} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
          <ErrorMessage name="data_prevista" component="div" className="text-danger" />
        </FormGroup>
        <FormGroup>
          <FormLabel className="h4 my-2">Data de devolução</FormLabel>
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
