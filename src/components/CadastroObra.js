import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel, Row, Col, Container, Card } from 'react-bootstrap';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import ObrasService from '../services/obras.service';
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
    ObrasService.addObra(data)
      .then((response) => {
        alert(response.data.message);
        navigate('/obrasdetalhadas');
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
        <Container>
          <Card>
            <h1 className='text-center mt-3'>Cadastro de Obra</h1>
            <hr />
            <Form className="container">
              <Row className="my-3">
                <Col>
                  <FormGroup>
                    <FormLabel className="mx-2">Registro</FormLabel>
                    <Field name="registro" type="text" className="form-control mx-1 mb-2" />
                    <ErrorMessage name="registro" component="div" className="text-danger" />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <FormLabel className="mx-2">Classificação</FormLabel>
                    <Field name="classificacao" type="text" className="form-control mx-1 mb-2" />
                    <ErrorMessage name="classificacao" component="div" className="text-danger" />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <FormLabel className="mx-2">Tipo Documental</FormLabel>
                    <Field name="tipo_documental" type="text" className="form-control mx-1 mb-2" />
                    <ErrorMessage name="tipo_documental" component="div" className="text-danger" />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <FormLabel className="mx-2">Idioma</FormLabel>
                    <Field name="idioma" type="text" className="form-control mx-1 mb-2" />
                    <ErrorMessage name="idioma" component="div" className="text-danger" />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="my-3">
                <Col>
                  <FormGroup>
                    <FormLabel className="mx-2">Título</FormLabel>
                    <Field name="titulo" type="text" className="form-control mx-1 mb-2" />
                    <ErrorMessage name="titulo" component="div" className="text-danger" />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <FormLabel className="mx-2">Autor</FormLabel>
                    <Field name="autor" type="text" className="form-control mx-1 mb-2" />
                    <ErrorMessage name="autor" component="div" className="text-danger" />
                  </FormGroup>
                </Col>
              </Row >
              <Row className="my-3">
                <Col>
                  <FormGroup>
                    <FormLabel className="mx-2">Editor</FormLabel>
                    <Field name="editor" type="text" className="form-control mx-1 mb-2" />
                    <ErrorMessage name="editor" component="div" className="text-danger" />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <FormLabel className="mx-2">Edição</FormLabel>
                    <Field name="edicao" type="number" className="form-control mx-1 mb-2" />
                    <ErrorMessage name="edicao" component="div" className="text-danger" />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <FormLabel className="mx-2">Páginas</FormLabel>
                    <Field name="paginas" type="number" className="form-control mx-1 mb-2" />
                    <ErrorMessage name="paginas" component="div" className="text-danger" />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <FormLabel className="mx-2">Local de Publicação</FormLabel>
                    <Field name="local_publicacao" type="text" className="form-control mx-1 mb-2" />
                    <ErrorMessage name="local_publicacao" component="div" className="text-danger" />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <FormLabel className="mx-2">Ano</FormLabel>
                    <Field name="ano" type="number" className="form-control mx-1 mb-2" />
                    <ErrorMessage name="ano" component="div" className="text-danger" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <FormLabel className="mx-2">Descritores</FormLabel>
                    <Field name="descritores" type="text" className="form-control mx-1 mb-2" />
                    <ErrorMessage name="descritores" component="div" className="text-danger" />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col></Col>
                <Col>
                  <FormGroup className="text-center">
                    <Button type="submit" className="btn-md btn-obra btn-success px-4 py-2">
                      <BsCheckLg /><span className="mx-2">REGISTRAR</span>
                    </Button>
                  </FormGroup>
                </Col>
                <Col></Col>
                <Col>
                  <FormGroup className="text-center">
                    <Button type="button" onClick={() => navigate('/obrasdetalhadas')} className="btn-md btn-obra btn-danger px-4 py-2">
                      <BsXLg /><span className="mx-2">CANCELAR</span>
                    </Button>
                  </FormGroup>
                </Col>
                <Col></Col>
              </Row>
            </Form>
          </Card>

        </Container>
      )}
    </Formik>
  );
}

export default CadastroObra;
