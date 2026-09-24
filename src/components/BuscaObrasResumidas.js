/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo, useRef } from 'react';
import ObrasService from '../services/obras.service';
import { useTable } from 'react-table';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Container, Button, Form, Row, Col, Navbar, Nav, Table } from 'react-bootstrap';
import colunasObrasResumidas from './resources/ColunasObrasResumidas';
import PaginationComponent from './resources/PaginationComponent';
import { FaEdit, FaSearch } from 'react-icons/fa';
import { BiBookAdd } from 'react-icons/bi';
import AuthService from '../services/auth.service';

const BuscaObrasResumidas = (props) => {
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
      return colunasObrasResumidas.concat([
        {
          Header: 'Ações',
          acessor: 'actions',
          Cell: (props) => {
            const rowIdx = Number(props.row.id);
            return (
              <div>
                <button
                  type="button"
                  className="btn-action-edit"
                  title="Editar obra"
                  onClick={() => editObra(rowIdx)}
                >
                  <FaEdit size="0.9rem" />
                </button>
              </div>
            );
          }
        }
      ]);
    }else{
      return colunasObrasResumidas;
    }

  }, [showAdmin, colunasObrasResumidas]);

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
    navigate('/obrasresumidas/search', { state: { termo: keyword, filtro: filtro } });
  };

  return (
    <Container fluid className="px-3 py-3">
      <div className="toolbar-container w-100">
        <Row className="align-items-center g-2">
          <Col md="auto" className="d-flex align-items-center">
            <PaginationComponent page={page} totalPages={totalPages} onPageChange={setPage} />
          </Col>
          <Col>
            <Form className="d-flex align-items-center gap-2" onSubmit={handleSearch} ref={form}>
              <Form.Select
                value={filtro}
                onChange={onChangeFiltro}
                style={{ width: 'auto', minWidth: '140px' }}
              >
                <option value="todos">Todos os campos</option>
                <option value="titulo">Título</option>
                <option value="autor">Autor</option>
                <option value="registro">Registro</option>
                <option value="classificacao">Classificação</option>
                <option value="descritores">Descritores</option>
                <option value="editor">Editora</option>
                <option value="ano">Ano</option>
              </Form.Select>
              <Form.Control
                type="text"
                className="flex-grow-1"
                name="termo"
                value={keyword}
                onChange={onChangeKeyword}
                placeholder="Digite o termo para buscar..."
              />
              <Button type="submit" variant="success">
                <FaSearch size="0.85rem" />
                <span>Buscar</span>
              </Button>
            </Form>
          </Col>
          {showAdmin && (
            <Col md="auto">
              <Button variant="success" as={Link} to="/obrasdetalhadas/register">
                <BiBookAdd size="1.1rem" />
                <span>Adicionar obra</span>
              </Button>
            </Col>
          )}
        </Row>
      </div>

      <div className="table-card w-100">
        <Table responsive hover {...getTableProps()}>
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
      </div>

      <div className="d-flex flex-wrap justify-content-between align-items-center w-100 mt-2 mb-4 gap-2">
        <PaginationComponent page={page} totalPages={totalPages} onPageChange={setPage} />
        <div className="stats-pill">
          <span>Obras encontradas: <strong>{totalObras}</strong></span>
        </div>
      </div>
    </Container>
  );
};

export default BuscaObrasResumidas;
