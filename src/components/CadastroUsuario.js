import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegistroUsuario = () => {
    
    const validationSchema = Yup.object().shape({
        fullname: Yup.string().required('Nome obrigatório'),
        setor: Yup.string().required('Setor obrigatório'),
        matricula: Yup.string()
        .required('Número de matrícula obrigatŕio')
        .min(6,'Número de matrícula incorreto')
        .max(8,'Número de matrícula incorreto'),
        cpf: Yup.string()
          .required('CPF obrigatório')
          .min(11, 'CPF incompleto')
          .max(11, 'CPF errado'),
        email: Yup.string()
          .required('Email obrigatório')
          .email('Email inválido'),
        password: Yup.string()
          .required('Defina uma senha')
          .min(6, 'A senha deve conter no mínimo 6 caractres')
          .max(40, 'A senha deve conter no máximo 40 caractres'),
        confirmPassword: Yup.string()
          .required('Confirmação de senha necessária')
          .oneOf([Yup.ref('password'), null], 'Confirmação de senha incorreta')
          
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
        setor: ''
      };
    
      return (
        <div className="register-form">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ resetForm }) => (
                <Form>
                  <div className="form-group">
                    <label>Nome</label>
                    <Field name="fullname" type="text" className="form-control" />
                    <ErrorMessage
                      name="fullname"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label>Setor</label>
                    <Field name="setor" type="text" className="form-control" />
                    <ErrorMessage
                      name="setor"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="matricula"> Matrícula </label>
                    <Field name="matricula" type="text" className="form-control" />
                    <ErrorMessage
                      name="matricula"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cpf"> CPF </label>
                    <Field name="cpf" type="text" className="form-control" />
                    <ErrorMessage
                      name="cpf"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email"> Email </label>
                    <Field name="email" type="email" className="form-control" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password"> Senha </label>
                    <Field
                      name="password"
                      type="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword"> Confirmar Senha </label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-usuario btn-success">
                      Registrar
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="btn btn-usuario btn-warning float-right"
                    >
                      Limpar
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
      );
}

export default RegistroUsuario;
