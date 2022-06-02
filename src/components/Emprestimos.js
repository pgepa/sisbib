/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo, useRef } from 'react';
import EmprestimosService from '../services/emprestimos.service';
import { useTable } from 'react-table';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Button, Form, Row, Col, Navbar, Nav, Table } from 'react-bootstrap';
import colunasEmprestimos from './resources/ColunasEmprestimos';
import { FaExchangeAlt, FaEdit } from 'react-icons/fa';

const Emprestimos = (props) => {
  const limit = 20;
  const [page, setPage] = useState(1);
  const [emprestimos, setEmprestimos] = useState([]);
  const [keyword, setKeyword] = useState('');

  const navigate = useNavigate();
  const form = useRef();
  form.current = emprestimos;

  useEffect(async () => {
    const awaitEmprestimos = await EmprestimosService.getAll(limit, page);
    setEmprestimos(awaitEmprestimos.data);
  }, [page]);

  const editEmprestimo = (rowIndex) => {
    const id = form.current[rowIndex].id;
    navigate(`/emprestimos/edit/${id}`);
  }

  const columns = useMemo(() => colunasEmprestimos.concat([
    {
      Header: 'Data de empréstimo',
      accessor: 'data_emprestimo',
      Cell: ({ row }) => (
        <span>
          {new Intl.DateTimeFormat('pt-BR', {}).format(new Date(row.original.data_emprestimo))}
        </span>
      )
    },
    {
      Header: 'Data prevista',
      accessor: 'data_prevista',
      Cell: ({ row }) => (
        <span>
          {new Intl.DateTimeFormat('pt-BR', {}).format(new Date(row.original.data_prevista))}
        </span>
      )
    },
    {
      Header: 'Nº de registro 1',
      accessor: 'registro_obra1'
    },
    {
      Header: 'Devolução 1',
      accessor: 'data_devolucao1',
      Cell: ({ row }) => (
        <span>
          { ( row.original.data_devolucao1 ?
              new Intl.DateTimeFormat('pt-BR', {}).format(
                new Date(row.original.data_devolucao1)) :
              'dd/mm/yyyy' ) }
        </span>
      )
    },
    {
      Header: 'Nº de registro 2',
      accessor: 'registro_obra2'
    },
    {
      Header: 'Devolução 2',
      accessor: 'data_devolucao2',
      Cell: ({ row }) => (
        <span>
          { ( row.original.data_devolucao2 ?
              new Intl.DateTimeFormat('pt-BR', {}).format(
                new Date(row.original.data_devolucao2)) :
              'dd/mm/yyyy' ) }
        </span>
      )
    },
    {
      Header: 'Nº de registro 3',
      accessor: 'registro_obra3'
    },
    {
      Header: 'Devolução 3',
      accessor: 'data_devolucao3',
      Cell: ({ row }) => (
        <span>
          { ( row.original.data_devolucao3 ?
              new Intl.DateTimeFormat('pt-BR', {}).format(
                new Date(row.original.data_devolucao3)) :
              'dd/mm/yyyy' ) }
        </span>
      )
    },
    {
      Header: 'Ações',
      acessor: 'actions',
      Cell: (props) => {
        const rowIdx = Number(props.row.id);
        return (
          <div>
            <Button variant="info" title="Editar" onClick={() => editEmprestimo(rowIdx)}>
              <FaEdit size='1rem'/>
            </Button>
          </div>
        );
      }
    }
      ]),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: emprestimos,
    });

  const onChangeKeyword = (e) => {
    const keyword = e.target.value;
    setKeyword(keyword);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(keyword);
    navigate("/emprestimos/search", { state: { termo: keyword } });
  };

  return (
    <Container fluid className="list row p-0">
      <Row>
        <Col md={3}>
          <Navbar className="pt-2" aria-label="Page navigation example">
            <Nav className="pagination pt-1">
              <Nav.Item key="anterior'" className="page-item">
                <Button
                  className="page-link mx-1"
                  onClick={() => setPage(page - 1)}
                >
                  Anterior
                </Button>
              </Nav.Item>
              { [...Array(5)].map((object,i) =>
                <Nav.Item key={i} className="page-item">
                  <Button className="page-link" onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </Button>
                </Nav.Item>) }
              <Nav.Item key="seguinte" className="page-item">
                <Button
                  className="page-link mx-1"
                  onClick={() => setPage(page + 1)}
                >
                  Seguinte
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar>
        </Col>
        <Col md={1}></Col>
        <Col md={5}>
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
        <Col md={3} className="btn32">
          <Form.Group className="col-12 pt-2">
            <Button variant="success" className="btn32" as={Link} to="/emprestimos/register">
              <FaExchangeAlt size='1rem'/>
              <span> </span>
              Registrar empréstimo
            </Button>
          </Form.Group>
        </Col>
      </Row>
      <Container fluid className="col-md-12 list my-3 align-items-center">
        <Table size="sm" striped hover responsive {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className="text-center" {...column.getHeaderProps()}>
                    {column.render("Header")}
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
                      <td className="text-center" 
                       {...cell.getCellProps()}>
                        {cell.render("Cell")}
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
              <Button
                className="page-link mx-1"
                onClick={() => setPage(page - 1)}
              >
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
              <Button
                className="page-link mx-1"
                onClick={() => setPage(page + 1)}
              >
                Seguinte
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar>
      </Col>
    </Container>
  );
};

export default Emprestimos;
