/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container, Alert, Modal, FormGroup, FormLabel, Row, Col } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import ObrasService from '../services/obras.service';
import * as Yup from 'yup';

const EditarObra = (props) => {
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
      .required('Título da obra obrigatório'),
  });

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
    tipo_documental: '',
  };

  const [currentObra, setCurrentObra] = useState(initialValues);
  const [showModal, setShowModal] = useState(false);
  const [backMessage, setBackMessage] = useState('');

  const handleCloseModal = () => {
    setShowModal(false);
    navigate(-1);
    if (props.parent && props.parent.reload) {
      props.parent.reload();
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(async () => {
    const awaitObra = await ObrasService.getOne(id);
    setCurrentObra(awaitObra.data);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentObra({ ...currentObra, [name]: value });
  };

  const handleUpdate = () => {
    ObrasService.update(currentObra)
      .then((response) => {
        setBackMessage(response.data.message || 'Obra atualizada com sucesso.');
        handleShowModal();
      })
      .catch((error) => {
        const msg = error.response?.data?.message || 'Erro ao atualizar obra.';
        setBackMessage(msg);
        handleShowModal();
        console.error('Erro ao atualizar obra:', error);
      });
  };

  return (
    <Formik
      enableReinitialize
      initialValues={currentObra}
      validationSchema={validationSchema}
      onSubmit={handleUpdate}
    >
      {({ errors, touched, submitCount }) => (
        <Container>
          <Card>
            <h1 className="text-center mt-3">Edição de Obra</h1>
            <hr />

            {submitCount > 0 && Object.keys(errors).length > 0 && (
              <Alert variant="warning" className="mx-4 mt-2">
                Existem campos obrigatórios com erros ou não preenchidos (destacados em vermelho).
              </Alert>
            )}

            <Form className="card-obra container">
              <Row className="my-3">
                <Col md={3}>
                  <FormGroup>
                    <FormLabel>Registro *</FormLabel>
                    <Field
                      name="registro"
                      type="text"
                      value={currentObra.registro || ''}
                      onChange={handleInputChange}
                      className={`form-control ${
                        touched.registro && errors.registro ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      name="registro"
                      component="div"
                      className="invalid-feedback d-block"
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <FormLabel>Classificação *</FormLabel>
                    <Field
                      name="classificacao"
                      type="text"
                      value={currentObra.classificacao || ''}
                      onChange={handleInputChange}
                      className={`form-control ${
                        touched.classificacao && errors.classificacao ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      name="classificacao"
                      component="div"
                      className="invalid-feedback d-block"
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <FormLabel>Tipo *</FormLabel>
                    <Field
                      name="tipo_documental"
                      type="text"
                      value={currentObra.tipo_documental || ''}
                      onChange={handleInputChange}
                      className={`form-control ${
                        touched.tipo_documental && errors.tipo_documental ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      name="tipo_documental"
                      component="div"
                      className="invalid-feedback d-block"
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <FormLabel>Idioma *</FormLabel>
                    <Field
                      name="idioma"
                      type="text"
                      value={currentObra.idioma || ''}
                      onChange={handleInputChange}
                      className={`form-control ${
                        touched.idioma && errors.idioma ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      name="idioma"
                      component="div"
                      className="invalid-feedback d-block"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row className="my-3">
                <Col md={6}>
                  <FormGroup>
                    <FormLabel>Título *</FormLabel>
                    <Field
                      name="titulo"
                      type="text"
                      value={currentObra.titulo || ''}
                      onChange={handleInputChange}
                      className={`form-control ${
                        touched.titulo && errors.titulo ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      name="titulo"
                      component="div"
                      className="invalid-feedback d-block"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <FormLabel>Autor *</FormLabel>
                    <Field
                      name="autor"
                      type="text"
                      value={currentObra.autor || ''}
                      onChange={handleInputChange}
                      className={`form-control ${
                        touched.autor && errors.autor ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      name="autor"
                      component="div"
                      className="invalid-feedback d-block"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row className="my-3">
                <Col md={3}>
                  <FormGroup>
                    <FormLabel>Editor *</FormLabel>
                    <Field
                      name="editor"
                      type="text"
                      value={currentObra.editor || ''}
                      onChange={handleInputChange}
                      className={`form-control ${
                        touched.editor && errors.editor ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      name="editor"
                      component="div"
                      className="invalid-feedback d-block"
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <FormLabel>Edição *</FormLabel>
                    <Field
                      name="edicao"
                      type="number"
                      value={currentObra.edicao || ''}
                      onChange={handleInputChange}
                      className={`form-control ${
                        touched.edicao && errors.edicao ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      name="edicao"
                      component="div"
                      className="invalid-feedback d-block"
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <FormLabel>Páginas *</FormLabel>
                    <Field
                      name="paginas"
                      type="number"
                      value={currentObra.paginas || ''}
                      onChange={handleInputChange}
                      className={`form-control ${
                        touched.paginas && errors.paginas ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      name="paginas"
                      component="div"
                      className="invalid-feedback d-block"
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <FormLabel>Local *</FormLabel>
                    <Field
                      name="local_publicacao"
                      type="text"
                      value={currentObra.local_publicacao || ''}
                      onChange={handleInputChange}
                      className={`form-control ${
                        touched.local_publicacao && errors.local_publicacao ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      name="local_publicacao"
                      component="div"
                      className="invalid-feedback d-block"
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <FormLabel>Ano *</FormLabel>
                    <Field
                      name="ano"
                      type="number"
                      value={currentObra.ano || ''}
                      onChange={handleInputChange}
                      className={`form-control ${
                        touched.ano && errors.ano ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      name="ano"
                      component="div"
                      className="invalid-feedback d-block"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row className="my-3">
                <Col>
                  <FormGroup>
                    <FormLabel>Descritores *</FormLabel>
                    <Field
                      as="textarea"
                      name="descritores"
                      value={currentObra.descritores || ''}
                      onChange={handleInputChange}
                      className={`form-control pb-5 ${
                        touched.descritores && errors.descritores ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      name="descritores"
                      component="div"
                      className="invalid-feedback d-block"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Container className="mt-5 mb-3 text-center">
                <Button type="button" onClick={handleUpdate} className="btn btn-success">
                  <BsCheckLg />
                  <span className="mx-2">Atualizar Obra</span>
                </Button>

                <Button type="button" onClick={() => navigate(-1)} className="btn btn-danger mx-5">
                  <BsXLg />
                  <span className="mx-2">Cancelar</span>
                </Button>
              </Container>

              {showModal && (
                <Modal show={showModal} onHide={handleCloseModal} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Mensagem</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p className="mb-0">{backMessage}</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                      Fechar
                    </Button>
                  </Modal.Footer>
                </Modal>
              )}
            </Form>
          </Card>
        </Container>
      )}
    </Formik>
  );
};

export default EditarObra;
