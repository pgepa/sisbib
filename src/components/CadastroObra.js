import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel, Row, Col } from 'react-bootstrap';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import ObraService from '../services/obra.service';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const CadastroObra = (props) => {

  const validationSchema = Yup.object().shape({
    ano: Yup.string()
      .required('Ano obrigatório')
      .length(4, 'Ano deve conter 4 dígitos'),
    autor: Yup.string()
      .required('Autor obrigatório'),
    classificacao: Yup.string()
      .required('Classificação obrigatória'),
    descritores: Yup.string()
      .required('Descritores obrigatórios'),
    edicao: Yup.string()
      .required('Número da edição obrigatório'),
    editor: Yup.string()
      .required('Editor obrigatório'),
    idioma: Yup.string()
      .required('Idioma obrigatório'),
    local_publicacao: Yup.string()
      .required('Local de publicação obrigatório'),
    paginas: Yup.string()
      .required('Quantidade de páginas obrigatória'),
    registro: Yup.string()
      .required('Número de registro obrigatório'),
    tipo_documental: Yup.string()
      .required('Tipo documental obrigatório'),
    titulo: Yup.string()
      .required('Título da obra obrigatório')
  });

  const navigate = useNavigate();

  const handleSubmit = (data) => {
    ObraService.addObra(data)
      .then((response) => {
        alert(response.data.message);
        navigate('/obras');
        props.parent.reload();
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const initialValues = {
    ano: '',
    autor: '',
    classificacao: '',
    descritores: '',
    edicao: '',
    editor: '',
    idioma: '',
    local_publicacao: '',
    paginas: '',
    registro: '',
    titulo: '',
    tipoDocumental: ''
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ resetForm }) => (
        <Form className="container card card-obra my-3">
          <Row className="my-3">
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Registro</FormLabel>
                <Field name="registro" type="text" size="lg" className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="registro" component="div" className="text-danger" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Classificação</FormLabel>
                <Field name="classificacao" type="text" size="lg" className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="classificacao" component="div" className="text-danger" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Tipo Documental</FormLabel>
                <Field name="tipo_documental" type="text" size="lg" className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="tipo_documental" component="div" className="text-danger" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Idioma</FormLabel>
                <Field name="idioma" type="text" size="lg" className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="idioma" component="div" className="text-danger" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Título</FormLabel>
                <Field name="titulo" type="text" size="lg" className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="titulo" component="div" className="text-danger" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Autor</FormLabel>
                <Field name="autor" type="text" size="lg" className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="autor" component="div" className="text-danger" />
              </FormGroup>
            </Col>
          </Row >
          <Row className="my-3">
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Editor</FormLabel>
                <Field name="editor" type="text" size="lg" className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="editor" component="div" className="text-danger" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Edição</FormLabel>
                <Field name="edicao" type="number" size="lg" className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="edicao" component="div" className="text-danger" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Páginas</FormLabel>
                <Field name="paginas" type="number" size="lg" className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="paginas" component="div" className="text-danger" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Local de Publicação</FormLabel>
                <Field name="local_publicacao" type="text" size="lg" className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="local_publicacao" component="div" className="text-danger" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Ano</FormLabel>
                <Field name="ano" type="number" size="lg" className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="ano" component="div" className="text-danger" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Descritores</FormLabel>
                <Field name="descritores" type="text" size="lg" className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="descritores" component="div" className="text-danger" />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Button type="submit" className="btn-lg btn-obra btn-success rounded-pill shadow-lg px-5 py-3">
              <BsCheckLg /><span className="mx-2">REGISTRAR</span>
            </Button>
            <Button type="button" onClick={resetForm} className="btn-lg btn-obra btn-danger rounded-pill shadow-lg px-5 py-3">
              <BsXLg /><span className="mx-2">CANCELAR</span>
            </Button>
          </FormGroup>
        </Form>
      )}
    </Formik>
  );
}

export default CadastroObra;
