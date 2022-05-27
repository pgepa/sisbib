/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo, useRef } from "react";
import UsuarioService from "../services/usuario.service";
import { useTable } from "react-table";
import { useNavigate, Link } from "react-router-dom";
import { Container, Button, Form, Row, Col, Navbar, Nav, Table } from "react-bootstrap";
import colunasUsuarios from "./resources/ColunasUsuarios";
import { FaUserPlus } from "react-icons/fa";
import "./BO.css";

const Usuarios = (props) => {
  const limit = 20;
  const [page, setPage] = useState(1);
  const [usuarios, setUsuarios] = useState([]);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();
  const form = useRef();

  useEffect(async () => {
    const awaitUsuarios = await UsuarioService.getAll(limit, page);
    return setUsuarios(awaitUsuarios.data);
  }, [page]);

  const columns = useMemo(
    () =>
      colunasUsuarios.concat([
        {
          Header: "Cadastrado em",
          accessor: "createdAt",
          Cell: ({ row }) => (
            <span>
              {new Intl.DateTimeFormat("pt-BR", {}).format(
                new Date(row.original.createdAt)
              )}
            </span>
          ),
        },
      ]),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: usuarios,
    });

  const onChangeKeyword = (e) => {
    const keyword = e.target.value;
    setKeyword(keyword);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(keyword);
    navigate("/usuarios/search", { state: { termo: keyword } });
  };

  return (
    <Container fluid className="list row p-0">
      <Row>
        <Col md={3}>
          <Navbar className="pt-2" aria-label="Page navigation example">
            <Nav className="pagination pt-1">
              <Nav.Item className="page-item">
                <Button
                  className="page-link mx-1"
                  onClick={() => setPage(page - 1)}
                >
                  Anterior
                </Button>
              </Nav.Item>
              <Nav.Item className="page-item">
                <Button className="page-link" onClick={() => setPage(1)}>
                  1
                </Button>
              </Nav.Item>
              <Nav.Item className="page-item">
                <Button className="page-link" onClick={() => setPage(2)}>
                  2
                </Button>
              </Nav.Item>
              <Nav.Item className="page-item">
                <Button className="page-link" onClick={() => setPage(3)}>
                  3
                </Button>
              </Nav.Item>
              <Nav.Item className="page-item">
                <Button className="page-link" onClick={() => setPage(4)}>
                  4
                </Button>
              </Nav.Item>
              <Nav.Item className="page-item">
                <Button className="page-link" onClick={() => setPage(5)}>
                  5
                </Button>
              </Nav.Item>
              <Nav.Item className="page-item">
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
              <Button type="submit" className="btn-primary mt-1 mx-2">
                Buscar
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={3} className="btn32">
          <Form.Group className="col-12 pt-2">
            <Button variant="success" className="btn32" as={Link} to="/cadastrousuario">
              <FaUserPlus />
              Adicionar usuário
            </Button>
          </Form.Group>
        </Col>
      </Row>
      <Container fluid className="col-md-12 list my-3">
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
                      <td className="text-center" {...cell.getCellProps()}>
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
            <Nav.Item className="page-item">
              <Button
                className="page-link mx-1"
                onClick={() => setPage(page - 1)}
              >
                Anterior
              </Button>
            </Nav.Item>
            <Nav.Item className="page-item">
              <Button className="page-link" onClick={() => setPage(1)}>
                1
              </Button>
            </Nav.Item>
            <Nav.Item className="page-item">
              <Button className="page-link" onClick={() => setPage(2)}>
                2
              </Button>
            </Nav.Item>
            <Nav.Item className="page-item">
              <Button className="page-link" onClick={() => setPage(3)}>
                3
              </Button>
            </Nav.Item>
            <Nav.Item className="page-item">
              <Button className="page-link" onClick={() => setPage(4)}>
                4
              </Button>
            </Nav.Item>
            <Nav.Item className="page-item">
              <Button className="page-link" onClick={() => setPage(5)}>
                5
              </Button>
            </Nav.Item>
            <Nav.Item className="page-item">
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

export default Usuarios;
