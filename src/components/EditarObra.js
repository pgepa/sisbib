/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel, Row, Col, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { BsCheckLg } from 'react-icons/bs';
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
    tipoDocumental: '',
  };

  const [currentObra, setCurrentObra] = useState(initialValues);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    navigate(-1);
    props.parent.reload();
  }

  const handleShowModal = () => {
    setShowModal(true);
  }

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

  const [backMessage, setBackMessage] = useState('');

  const handleUpdate = (data) => {
    ObrasService.update(data)
      .then((response) => {
        setBackMessage(response.data.message);
        handleShowModal();
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <Formik enableReinitialize initialValues={currentObra}
      validationSchema={validationSchema} onSubmit={handleUpdate}>
      {() => (
        <Form className="container card card-obra">
          <Row className="my-3">
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Registro</FormLabel>
                <Field name="registro" type="text" size="lg" value={currentObra.registro} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="registro" component="div" className="text-danger" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Classificação</FormLabel>
                <Field name="classificacao" type="text" size="lg" value={currentObra.classificacao} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="classificacao" component="div" className="text-danger" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Tipo</FormLabel>
                <Field name="tipo_documental" type="text" size="lg" value={currentObra.tipo_documental} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="tipo_documental" component="div" className="text-danger" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Idioma</FormLabel>
                <Field name="idioma" type="text" size="lg" value={currentObra.idioma} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="idioma" component="div" className="text-danger" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Título</FormLabel>
                <Field name="titulo" type="text" size="lg" value={currentObra.titulo} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="titulo" component="div" className="text-danger" />
              </FormGroup>
            </Col>
            <Col>
            <FormGroup>
                <FormLabel className="h4 my-2">Autor</FormLabel>
                <Field name="autor" type="text" size="lg" value={currentObra.autor} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="autor" component="div" className="text-danger" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Editor</FormLabel>
                <Field name="editor" type="text" size="lg" value={currentObra.editor} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="editor" component="div" className="text-danger" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Edição</FormLabel>
                <Field name="edicao" type="number" size="lg" value={currentObra.edicao} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="edicao" component="div" className="text-danger" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Páginas</FormLabel>
                <Field name="paginas" type="number" size="lg" value={currentObra.paginas} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="paginas" component="div" className="text-danger" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Local</FormLabel>
                <Field name="local_publicacao" type="text" size="lg" value={currentObra.local_publicacao} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="local_publicacao" component="div" className="text-danger" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Ano</FormLabel>
                <Field name="ano" type="number" size="lg" value={currentObra.ano} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="ano" component="div" className="text-danger" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <FormLabel className="h4 my-2">Descritores</FormLabel>
                <Field name="descritores" type="text" size="lg" value={currentObra.descritores} onChange={handleInputChange} className="form-control shadow h4 mx-1 mb-2" />
                <ErrorMessage name="descritores" component="div" className="text-danger" />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup className="text-center">
            <Button type="submit" onClick={handleUpdate} className="btn-lg btn-success shadow-lg px-5 py-3 m-5">
              <BsCheckLg />
              <span className="mx-2">ATUALIZAR</span>
            </Button>
          </FormGroup>
          {
            showModal && (
              <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Mensagem</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {backMessage}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={handleCloseModal}>Fechar</Button>
                </Modal.Footer>
              </Modal>
            )
          }
        </Form>
      )}
    </Formik>
  );
};

export default EditarObra;
