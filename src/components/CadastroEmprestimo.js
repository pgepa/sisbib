/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel } from 'react-bootstrap';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import EmprestimoService from '../services/emprestimo.service';
import UsuarioService from '../services/usuario.service';
import DateUtils from '../utils/date.utils';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Select from 'react-select';

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
      props.parent.reload();
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

  const [usuarios,setUsuarios] = useState();

  useEffect(async () => {
    const awaitUsuarios = await UsuarioService.getNames(10, 1);
    setUsuarios(awaitUsuarios.data);
  }, []);

  const options = [
    { label: 'Audio', value: 'audio' },
    { label: 'Graphs', value: 'graph' },
    { label: 'Picture', value: 'picture' },
    { label: 'Video', value: 'video' },
    { label: 'Other', value: 'other' },
  ];

  const FormikSelect = ({options, field, form}) => {
    return (
      <Select
        name={field.name}
        onBlur={field.onBlur}
        onChange={({ value }) => form.setFieldValue(field.name, value)}
        options={options}
        value={(() => {
          if (!options) return '';
          for (let optionsLength = options.length, i = 0; i < optionsLength; i++) {
            const option = options[i];
            if (option.options) {
              const valueCandidate = option.options.find(({ value }) => value === field.value);
              if (valueCandidate) return valueCandidate;
            }
            if (option.value === field.value) return option.value;
          }
          return '';
        })()}
      />
    );
  }

  // <Field name="id_usuario" type="number" size="lg" className="form-control shadow h4 mx-1 mb-2" />

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
            <FormLabel className="h4 my-2">Nome do usuário</FormLabel>
            <Field name="name" component={FormikSelect} options={options} />
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
