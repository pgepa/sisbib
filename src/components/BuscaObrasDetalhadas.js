/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo, useRef } from 'react';
import ObrasService from '../services/obras.service';
import { useTable } from 'react-table';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Container, Button, Form, Row, Col, Navbar, Nav, Table } from 'react-bootstrap';
import colunasObrasDetalhadas from './resources/ColunasObrasDetalhadas';
import { FaEdit } from 'react-icons/fa';
import { BiBookAdd } from 'react-icons/bi';
import AuthService from '../services/auth.service';

const BuscaObrasDetalhadas = (props) => {
  const limit = 20;
  const [page, setPage] = useState(1);
  const [obras, setObras] = useState([]);
  const location = useLocation();
  const [keyword, setKeyword] = useState(location.state.termo);
  const [showAdmin, setShowAdmin] = useState(false);

  const navigate = useNavigate();
  const form = useRef();
  
  useEffect(async () => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setShowAdmin(user.roles.includes('ROLE_ADMIN'));
    }
    const awaitObras = await ObrasService.getSome({ termo: location.state.termo }, limit, page);
    setObras(awaitObras.data);
  }, [page]);

  const columns = useMemo(() => {
    return colunasObrasDetalhadas.concat([
      {
        Header: 'Ações',
        acessor: 'actions',
        Cell: (props) => {
          return (
            <div>
              <Button variant="info" title="Editar" as={Link} to="/obrasdetalhadas/register">
                <FaEdit size='1rem'/>
              </Button>
            </div>
          );
        }
      }
    ]);
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: obras
    });
  
  const onChangeKeyword = (e) => {
    const keyword = e.target.value;
    setKeyword(keyword);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(keyword);
    navigate('/obrasdetalhadas/search', { state: { termo: keyword } } );
    window.location.reload();
  };

  return (
    <Container fluid className="list row p-0">
      <Row>
        <Col md={3}>
          <Navbar className="pt-2" aria-label="Page navigation example">
            <Nav className="pagination pt-1">
              <Nav.Item key="anterior" className="page-item">
                <Button className="page-link mx-1" onClick={() => setPage(page - 1)}>
                  Anterior
                </Button>
              </Nav.Item>
              {
                [...Array(5)].map((object,i) =>
                <Nav.Item key={i} className="page-item">
                  <Button className="page-link" onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </Button>
                </Nav.Item>)
              }
              <Nav.Item key="seguinte" className="page-item">
                <Button className="page-link mx-1" onClick={() => setPage(page + 1)}>
                  Seguinte
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar>
        </Col>
        <Col md={1}></Col>
        <Col>
          <Form className="d-flex" onSubmit={handleSearch} ref={form}>
            <Form.Group className="col-5 pt-2">
              <Form.Control
                type="text"
                className="form-control mt-1"
                name="termo"
                value={keyword}
                onChange={onChangeKeyword}
                placeholder="termo de busca"
              />
            </Form.Group>
            <Form.Group className="col-2 pt-2">
              <Button type="submit" className="btn-success mt-1 mx-2">
                Buscar
              </Button>
            </Form.Group>
          </Form>
        </Col>
        { showAdmin && (
          <Col md={3} className="btn32">
            <Form.Group className="col-12 pt-2">
              <Button variant="success" className="btn32" as={Link} to="/obrasdetalhadas/register">
                <BiBookAdd size='1rem'/>
                <span> </span>
                Adicionar obra
              </Button>
            </Form.Group>
          </Col>)}
      </Row>
      
      <Container fluid className="col-md-12 list my-3">
        <Table size="sm" striped hover responsive {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className="text-center" {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td className="text-center" {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <Col md={3}>
        <Navbar className="pt-2" aria-label="Page navigation example">
          <Nav className="pagination pt-1">
            <Nav.Item key="anterior" className="page-item">
              <Button className="page-link mx-1" onClick={() => setPage(page - 1)}>
                Anterior
              </Button>
            </Nav.Item>
            {
              [...Array(5)].map((object,i) =>
                <Nav.Item key={i} className="page-item">
                  <Button className="page-link" onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </Button>
                </Nav.Item>)
            }
            <Nav.Item key="seguinte" className="page-item">
              <Button className="page-link mx-1" onClick={() => setPage(page + 1)}>
                Seguinte
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar>
      </Col>
    </Container>
  );
};

export default BuscaObrasDetalhadas;
