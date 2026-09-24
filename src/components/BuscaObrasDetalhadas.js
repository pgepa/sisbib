/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo, useRef } from 'react';
import ObrasService from '../services/obras.service';
import { useTable } from 'react-table';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Container, Button, Form, Row, Col, Navbar, Nav, Table } from 'react-bootstrap';
import colunasObrasDetalhadas from './resources/ColunasObrasDetalhadas';
import PaginationComponent from './resources/PaginationComponent';
import { FaEdit } from 'react-icons/fa';
import { BiBookAdd } from 'react-icons/bi';
import AuthService from '../services/auth.service';

const BuscaObrasDetalhadas = (props) => {
  const limit = 20;
  const [page, setPage] = useState(1);
  const [obras, setObras] = useState([]);
  const [totalObras, setTotalObras] = useState(0);
  const location = useLocation();
  const [keyword, setKeyword] = useState(location.state?.termo || '');
  const [filtro, setFiltro] = useState(location.state?.filtro || 'todos');
  const [showAdmin, setShowAdmin] = useState(false);

  const navigate = useNavigate();
  const form = useRef();
  form.current = obras;

  useEffect(async () => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setShowAdmin(user.roles.includes('ROLE_ADMIN'));
    }
    const currentTermo = location.state?.termo || '';
    const currentFiltro = location.state?.filtro || 'todos';
    setKeyword(currentTermo);
    setFiltro(currentFiltro);
    const awaitObras = await ObrasService.getSome({ termo: currentTermo, filtro: currentFiltro }, limit, page);
    const responseData = awaitObras?.data;
    if (Array.isArray(responseData)) {
      setObras(responseData);
      setTotalObras(responseData.length);
    } else if (responseData?.data) {
      setObras(responseData.data);
      setTotalObras(responseData.totalItems || responseData.data.length);
    } else {
      setObras([]);
      setTotalObras(0);
    }
  }, [page, location.state?.termo, location.state?.filtro]);

  const totalPages = Math.ceil(totalObras / limit) || 1;

  const editObra = (rowIndex) => {
    const id = form.current[rowIndex].id;
    navigate(`/obrasdetalhadas/edit/${id}`);
  }

  const columns = useMemo(() => {
    if (showAdmin) {
      return colunasObrasDetalhadas.concat([
        {
          Header: 'Ações',
          acessor: 'actions',
          Cell: (props) => {
            const rowIdx = Number(props.row.id);
            return (
              <div>
                <Button variant="info" title="Editar" onClick={() => editObra(rowIdx)}>
                  <FaEdit size='1rem' />
                </Button>
              </div>
            );
          }
        }
      ]);
    } else {
      return colunasObrasDetalhadas;
    }
  }, [showAdmin, colunasObrasDetalhadas]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: obras
    });

  const onChangeKeyword = (e) => {
    const keyword = e.target.value;
    setKeyword(keyword);
  }

  const onChangeFiltro = (e) => {
    setFiltro(e.target.value);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    navigate('/obrasdetalhadas/search', { state: { termo: keyword, filtro: filtro } });
  };

  return (
    <Container fluid className="list row p-0 mx-auto">
      <Row className="align-items-center">
        <Col md="auto">
          <PaginationComponent page={page} totalPages={totalPages} onPageChange={setPage} />
        </Col>
        <Col>
          <Form className="d-flex align-items-center" onSubmit={handleSearch} ref={form}>
            <Form.Group className="pt-2 me-2">
              <Form.Select
                value={filtro}
                onChange={onChangeFiltro}
                className="mt-1"
                style={{ width: 'auto', minWidth: '135px' }}
              >
                <option value="todos">Todos</option>
                <option value="titulo">Título</option>
                <option value="autor">Autor</option>
                <option value="registro">Registro</option>
                <option value="classificacao">Classificação</option>
                <option value="descritores">Descritores</option>
                <option value="editor">Editora</option>
                <option value="ano">Ano</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="flex-grow-1 pt-2 me-2">
              <Form.Control
                type="text"
                className="form-control mt-1"
                name="termo"
                value={keyword}
                onChange={onChangeKeyword}
                placeholder="termo de busca"
              />
            </Form.Group>
            <Form.Group className="pt-2">
              <Button type="submit" className="btn-success mt-1">
                Buscar
              </Button>
            </Form.Group>
          </Form>
        </Col>
        {showAdmin && (
          <Col md="auto" className="btn32">
            <Form.Group className="col-12 pt-2">
              <Button variant="success" className="btn32" as={Link} to="/obrasdetalhadas/register">
                <BiBookAdd size='1rem' />
                <span> </span>
                Adicionar obra
              </Button>
            </Form.Group>
          </Col>)}
      </Row>

      <Container fluid className="col-md-12 list my-3">
        <Table size="sm" striped bordered hover responsive {...getTableProps()}>
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
      <Row>
        <Col md={5}>
          <PaginationComponent page={page} totalPages={totalPages} onPageChange={setPage} />
        </Col>
        <Col md={7} className="d-flex align-items-center">
          <i>Total de obras encontradas = {totalObras}</i>
        </Col>
      </Row>
    </Container>
  );
};

export default BuscaObrasDetalhadas;
