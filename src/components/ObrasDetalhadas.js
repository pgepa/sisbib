/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo, useRef } from 'react';
import ObrasService from '../services/obras.service';
import { useTable } from 'react-table';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Button, Form, Row, Col, Navbar, Nav, Table } from 'react-bootstrap';
import colunasObrasDetalhadas from './resources/ColunasObrasDetalhadas';
import PaginationComponent from './resources/PaginationComponent';
import { FaEdit } from 'react-icons/fa';
import { BiBookAdd } from 'react-icons/bi';
import AuthService from '../services/auth.service';

const ObrasDetalhadas = (props) => {

  const limit = 20;
  const [page, setPage] = useState(1);
  const [obras, setObras] = useState([]);
  const [registers, setRegisters] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [showAdmin, setShowAdmin] = useState(false);

  const navigate = useNavigate();
  const form = useRef();
  form.current = obras;

  useEffect(async () => {
    const awaitObras = await ObrasService.getAll(limit, page);
    setObras(awaitObras.data);
    const awaitRegisters = await ObrasService.getCount();
    const countVal = awaitRegisters?.data?.data !== undefined ? awaitRegisters.data.data : awaitRegisters?.data;
    setRegisters(Number(countVal) || 0);
  }, [page]);

  const totalPages = Math.ceil(registers / limit) || 1;

  const editObra = (rowIndex) => {
    const id = form.current[rowIndex].id;
    navigate(`/obrasdetalhadas/edit/${id}`);
  }

  const columns = useMemo(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setShowAdmin(user.roles.includes('ROLE_ADMIN'));
    }
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
    }else{
      return colunasObrasDetalhadas
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

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(keyword);
    navigate('/obrasdetalhadas/search', { state: { termo: keyword } });
  };

  return (
    <Container fluid className="list row p-0 mx-auto">
      <Row>
        <Col md={5}>
          <PaginationComponent page={page} totalPages={totalPages} onPageChange={setPage} />
        </Col>
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
        {showAdmin && (
          <Col md={3} className="btn32">
            <Form.Group className="col-12 pt-2">
              <Button variant="success" className="btn32" as={Link} to="/obrasdetalhadas/register">
                <BiBookAdd size='1rem' />
                <span> </span>
                Adicionar obra
              </Button>
            </Form.Group>
          </Col>)}
      </Row>

      <Container className="col-md-12 list my-3">
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
          <i>Total de obras = {registers}</i>
        </Col>
      </Row>
    </Container>
  );
};

export default ObrasDetalhadas;
