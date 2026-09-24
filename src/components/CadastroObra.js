import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel, Row, Col, Container, Card, Alert, Modal } from 'react-bootstrap';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import ObrasService from '../services/obras.service';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const CadastroObra = (props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

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
    setErrorMessage('');
    ObrasService.addObra(data)
      .then((response) => {
        alert(response.data.message || 'Obra cadastrada com sucesso.');
        navigate('/obrasdetalhadas');
        if (props.parent && props.parent.reload) {
          props.parent.reload();
        }
      })
      .catch((error) => {
        const msg = error.response?.data?.message || 'Erro ao cadastrar obra. Por favor, verifique os dados e tente novamente.';
        setErrorMessage(msg);
        setShowErrorModal(true);
        console.error('Erro ao adicionar obra:', error);
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
    tipo_documental: ''
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, submitCount }) => (
        <Container>
          <Card>
            <h1 className="text-center mt-3">Cadastro de Obra</h1>
            <hr />

            {errorMessage && (
              <Alert
                variant="danger"
                dismissible
                onClose={() => setErrorMessage('')}
                className="mx-4 mt-2"
              >
                <strong>Atenção: </strong>
                {errorMessage}
              </Alert>
            )}

            {submitCount > 0 && Object.keys(errors).length > 0 && (
              <Alert variant="warning" className="mx-4 mt-2">
                Existem campos obrigatórios com erros ou não preenchidos (destacados em vermelho). Corrija-os para prosseguir.
              </Alert>
            )}

            <Form className="container">
              <Row className="my-3">
                <Col md={3}>
                  <FormGroup>
                    <FormLabel className="mx-2">Registro *</FormLabel>
                    <Field
                      name="registro"
                      type="text"
                      className={`form-control mx-1 mb-2 ${
                        touched.registro && errors.registro ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      name="registro"
                      component="div"
                      className="invalid-feedback mx-1 d-block"
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <FormLabel className="mx-2">Classificação *</FormLabel>
                    <Field
                      name="classificacao"
                      type="text"
                      className={`form-control mx-1 mb-2 ${
                        touched.classificacao && errors.classificacao ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      name="classificacao"
                      component="div"
                      className="invalid-feedback mx-1 d-block"
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <FormLabel className="mx-2">Tipo Documental *</FormLabel>
                    <Field
                      name="tipo_documental"
                      type="text"
                      className={`form-control mx-1 mb-2 ${
                        touched.tipo_documental && errors.tipo_documental ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      name="tipo_documental"
                      component="div"
                      className="invalid-feedback mx-1 d-block"
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <FormLabel className="mx-2">Idioma *</FormLabel>
                    <Field
                      name="idioma"
                      type="text"
                      className={`form-control mx-1 mb-2 ${
                        touched.idioma && errors.idioma ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      name="idioma"
                      component="div"
                      className="invalid-feedback mx-1 d-block"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row className="my-3">
                <Col md={6}>
                  <FormGroup>
                    <FormLabel className="mx-2">Título *</FormLabel>
                    <Field
                      name="titulo"
                      type="text"
                      className={`form-control mx-1 mb-2 ${
                        touched.titulo && errors.titulo ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      name="titulo"
                      component="div"
                      className="invalid-feedback mx-1 d-block"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <FormLabel className="mx-2">Autor *</FormLabel>
                    <Field
                      name="autor"
                      type="text"
                      className={`form-control mx-1 mb-2 ${
                        touched.autor && errors.autor ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      name="autor"
                      component="div"
                      className="invalid-feedback mx-1 d-block"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row className="my-3">
                <Col md={3}>
                  <FormGroup>
                    <FormLabel className="mx-2">Editor *</FormLabel>
                    <Field
                      name="editor"
                      type="text"
                      className={`form-control mx-1 mb-2 ${
                        touched.editor && errors.editor ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      name="editor"
                      component="div"
                      className="invalid-feedback mx-1 d-block"
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <FormLabel className="mx-2">Edição *</FormLabel>
                    <Field
                      name="edicao"
                      type="number"
                      className={`form-control mx-1 mb-2 ${
                        touched.edicao && errors.edicao ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      name="edicao"
                      component="div"
                      className="invalid-feedback mx-1 d-block"
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <FormLabel className="mx-2">Páginas *</FormLabel>
                    <Field
                      name="paginas"
                      type="number"
                      className={`form-control mx-1 mb-2 ${
                        touched.paginas && errors.paginas ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      name="paginas"
                      component="div"
                      className="invalid-feedback mx-1 d-block"
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <FormLabel className="mx-2">Local de Publicação *</FormLabel>
                    <Field
                      name="local_publicacao"
                      type="text"
                      className={`form-control mx-1 mb-2 ${
                        touched.local_publicacao && errors.local_publicacao ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      name="local_publicacao"
                      component="div"
                      className="invalid-feedback mx-1 d-block"
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <FormLabel className="mx-2">Ano *</FormLabel>
                    <Field
                      name="ano"
                      type="number"
                      className={`form-control mx-1 mb-2 ${
                        touched.ano && errors.ano ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      name="ano"
                      component="div"
                      className="invalid-feedback mx-1 d-block"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row className="my-3">
                <Col>
                  <FormGroup>
                    <FormLabel className="mx-2">Descritores *</FormLabel>
                    <Field
                      name="descritores"
                      type="text"
                      className={`form-control mx-1 mb-2 ${
                        touched.descritores && errors.descritores ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      name="descritores"
                      component="div"
                      className="invalid-feedback mx-1 d-block"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row className="mt-4 mb-3">
                <Col></Col>
                <Col className="text-center">
                  <FormGroup>
                    <Button type="submit" className="btn-md btn-obra btn-success px-4 py-2">
                      <BsCheckLg />
                      <span className="mx-2">REGISTRAR</span>
                    </Button>
                  </FormGroup>
                </Col>
                <Col></Col>
                <Col className="text-center">
                  <FormGroup>
                    <Button
                      type="button"
                      onClick={() => navigate('/obrasdetalhadas')}
                      className="btn-md btn-obra btn-danger px-4 py-2"
                    >
                      <BsXLg />
                      <span className="mx-2">CANCELAR</span>
                    </Button>
                  </FormGroup>
                </Col>
                <Col></Col>
              </Row>
            </Form>
          </Card>

          <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)} centered>
            <Modal.Header closeButton className="bg-danger text-white">
              <Modal.Title>Não foi possível cadastrar a obra</Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-4">
              <p className="mb-0">{errorMessage}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
                Fechar
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )}
    </Formik>
  );
};

export default CadastroObra;
