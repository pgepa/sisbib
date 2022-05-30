import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel } from 'react-bootstrap';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import EmprestimoService from '../services/emprestimo.service';
import DateUtils from '../utils/date.utils';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { propTypes } from 'react-bootstrap/esm/Image';

const CadastroEmprestimo = (props) => {
  const validationSchema = Yup.object().shape({
    id_transacao: Yup.string()
      .required('Código da transação obrigatório.'),
    id_funcionario: Yup.number()
      .required('ID do funcionário obrigatório.'),
    id_usuario: Yup.number()
      .required('ID do usuário obrigatório.'),
    id_obra: Yup.number()
      .required('ID da obra obrigatório.'),
    data_emprestimo: Yup.date()
      .required('Data de empréstimo obrigatória.'),
    data_prevista: Yup.date()
      .required('Data prevista obrigatória.'),
  });

  const navigate = useNavigate();

  const handleSubmit = (data) => {
    EmprestimoService.addEmprestimo(data)
    .then((response) => {
      alert(response.data.message);
      navigate('/emprestimos');
      propTypes.parent.reload();
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
  };

  const initialValues = {
    id_transacao: '',
    id_funcionario: '',
    id_usuario: '',
    id_obra: '',
    data_emprestimo: DateUtils.today(),
    data_prevista: DateUtils.daysAfter(7)
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema}
      onSubmit={handleSubmit}>
        {({ resetForm }) => (
        <Form className="container card card-usuario my-3">
          <FormGroup>
            <FormLabel className="h4 my-2">Código da transação</FormLabel>
            <Field name="id_transacao" type="text" size="lg" className="form-control shadow h4 mx-1 mb-2" />
            <ErrorMessage name="id_transacao" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">ID do funcionário</FormLabel>
            <Field name="id_funcionario" type="number" size="lg" className="form-control shadow h4 mx-1 mb-2" />
            <ErrorMessage name="id_funcionario" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">ID do usuário</FormLabel>
            <Field name="id_usuario" type="number" size="lg" className="form-control shadow h4 mx-1 mb-2" />
            <ErrorMessage name="id_usuario" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">ID da obra</FormLabel>
            <Field name="id_obra" type="text" size="lg" className="form-control shadow h4 mx-1 mb-2" />
            <ErrorMessage name="id_obra" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">Data de empréstimo</FormLabel>
            <Field name="data_emprestimo" type="date" size="lg" className="form-control shadow h4 mx-1 mb-2" />
            <ErrorMessage name="data_emprestimo" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">Data prevista de devolução</FormLabel>
            <Field name="data_prevista" type="date" size="lg" className="form-control shadow h4 mx-1 mb-2" />
            <ErrorMessage name="data_prevista" component="div" className="text-danger" />
          </FormGroup>
          <FormGroup>
            <FormLabel className="h4 my-2">Data real de devolução</FormLabel>
            <Field name="data_devolucao" type="date" size="lg" className="form-control shadow h4 mx-1 mb-2" />
            <ErrorMessage name="data_devolucao" component="div" className="text-danger" />
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

export default CadastroEmprestimo;
