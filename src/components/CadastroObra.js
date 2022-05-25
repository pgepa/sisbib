import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const RegistroObra = () => {
    
    const validationSchema = Yup.object().shape({
        autor: Yup.string().required('Campo obrigatório'),
        ano: Yup.string() 
            .required('Campo obrigatório')
            .min(4,'Ano incorreto')
            .max(4,'Ano incorreto'),
        classificacao: Yup.string().required('Campo obrigatório'),
        descritores: Yup.string().required('Campo obrigatório'),
        editor: Yup.string().required('Campo obrigatório'),
        edicao: Yup.string().required('Campo obrigatório'),
        idioma: Yup.string().required('Campo obrigtório'),
        localPublicacao: Yup.string().required('Campo obrigatório'),
        paginas: Yup.string().required('Campo obrigatório'),
        registro: Yup.string().required('Campo obrigatório'),
        titulo: Yup.string().required('Campo obrigatório'),
        tipoDocumental: Yup.string().required('Campo obrigatório'),
      });
    
      const handleSubmit = (data) => {
        console.log(JSON.stringify(data, null, 2));
      };
    
      const initialValues = {
        autor: '',
        ano: '',
        classificacao: '',
        descritores: '',
        editor: '',
        edicao: '',
        idioma: '',
        localPublicacao: '',
        paginas: '',
        registro: '',
        titulo: '',
        tipoDocumental: ''
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
                    <label>Título</label>
                    <Field name="titulo" type="text" className="form-control" />
                    <ErrorMessage
                      name="titulo"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label>Autor</label>
                    <Field name="autor" type="text" className="form-control" />
                    <ErrorMessage
                      name="autor"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="registro"> Registro </label>
                    <Field name="registro" type="text" className="form-control" />
                    <ErrorMessage
                      name="registro"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ano"> Ano </label>
                    <Field name="ano" type="number" className="form-control" />
                    <ErrorMessage
                      name="ano"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="paginas"> Páginas </label>
                    <Field name="paginas" type="number" className="form-control" />
                    <ErrorMessage
                      name="paginas"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="idioma"> Idioma </label>
                    <Field name="idioma" type="text" className="form-control" />
                    <ErrorMessage
                      name="idioma"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="classificacao"> Classificação </label>
                    <Field name="classificacao" type="text" className="form-control" />
                    <ErrorMessage
                      name="classificacao"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="tipoDocumental"> Tipo Documental </label>
                    <Field name="tipoDocumental" type="text" className="form-control" />
                    <ErrorMessage
                      name="tipoDocumental"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="edicao"> Edição </label>
                    <Field name="edicao" type="number" className="form-control" />
                    <ErrorMessage
                      name="edicao"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="localPublicacao"> Local de Publicação </label>
                    <Field name="localPublicacao" type="text" className="form-control" />
                    <ErrorMessage
                      name="localPublicacao"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="descritores">
                    <label htmlFor="descritores"> Descritores </label>
                    <Field name="descritores" type="text" className="area form-control" component="textarea"/>
                    <ErrorMessage
                      name="descritores"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group row='5'">
                    <button type="submit" className="btn btn-obra btn-success">
                      Registrar Obra
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="btn btn-obra btn-warning float-right"
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

export default RegistroObra;
