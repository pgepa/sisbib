import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginUsuario = () => {
    const validationSchema = Yup.object().shape({
        fullname: Yup.string().required('Campo não preenchido'),
        password: Yup.string().required('Campo não preenchido')

      });
    
      const handleSubmit = (data) => {
        console.log(JSON.stringify(data, null, 2));
      };
    
      const initialValues = {
        fullname: '',
        password: ''
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
                    <button type="submit" className="btn btn-usuario btn-success">
                      Entrar
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

export default LoginUsuario;