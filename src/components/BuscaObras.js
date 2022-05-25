/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo, useRef } from 'react';
import ObraService from '../services/obra.service';
import { Button, Form } from 'react-bootstrap';
import { useTable } from 'react-table';
import { useNavigate, useLocation } from 'react-router-dom';
import colunasObras from './resources/ColunasObras';

const BuscaObras = (props) => {
  const limit = 20;
  const [page, setPage] = useState(1);
  const [obras, setObras] = useState([]);
  const [keyword, setKeyword] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const form = useRef();
  
  useEffect(async () => {
    const awaitObras = await ObraService.getSome({ termo: location.state.termo }, limit, page);
    return setObras(awaitObras.data);
  }, [page]);

    const columns = useMemo(() => colunasObras.concat([
    {
      Header: 'Cadastrado em',
      accessor: 'createdAt',
      Cell: ({ row }) => (<span>{new Intl.DateTimeFormat("pt-BR", {}).format(
        new Date(row.original.createdAt))}</span>)
    }
  ]), []);

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
    console.log(`BuscaObras handleSearch keyword = ${keyword}`);
    navigate('/search', { state: { termo: keyword } } );
    window.location.reload();
  };

  return (
    <div className="list row">
      <div className="row">
        <nav className="col-3 pt-3" aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item"><button className="page-link" onClick={() => setPage(page - 1)}>Anterior</button></li>
            <li className="page-item"><button className="page-link" onClick={() => setPage(1)}>1</button></li>
            <li className="page-item"><button className="page-link" onClick={() => setPage(2)}>2</button></li>
            <li className="page-item"><button className="page-link" onClick={() => setPage(3)}>3</button></li>
            <li className="page-item"><button className="page-link" onClick={() => setPage(4)}>4</button></li>
            <li className="page-item"><button className="page-link" onClick={() => setPage(5)}>5</button></li>
            <li className="page-item"><button className="page-link" onClick={() => setPage(page + 1)}>Seguinte</button></li>
          </ul>
        </nav>
        <Form onSubmit={handleSearch} ref={form}>
          <Form.Group className="form-group col-3 pt-3">
            <Form.Control
              type="text"
              className="form-control mt-1"
              name="termo"
              value={keyword}
              onChange={onChangeKeyword}
              placeholder="termo de busca"
            />
          </Form.Group>
          <Form.Group className="form-group col-3 pt-3">
            <Button type="submit" className="btn btn-primary btn-block mt-1">
              Buscar
            </Button>
          </Form.Group>
        </Form>
      </div>
      
      <div className="col-md-12 list my-3">
        <table className="table table-striped table-bordered"
          {...getTableProps()} >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
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
                      <td {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item"><button className="page-link" onClick={() => setPage(page - 1)}>Anterior</button></li>
          <li className="page-item"><button className="page-link" onClick={() => setPage(1)}>1</button></li>
          <li className="page-item"><button className="page-link" onClick={() => setPage(2)}>2</button></li>
          <li className="page-item"><button className="page-link" onClick={() => setPage(3)}>3</button></li>
          <li className="page-item"><button className="page-link" onClick={() => setPage(4)}>4</button></li>
          <li className="page-item"><button className="page-link" onClick={() => setPage(5)}>5</button></li>
          <li className="page-item"><button className="page-link" onClick={() => setPage(page + 1)}>Seguinte</button></li>
        </ul>
      </nav>
    </div>
  );
};

export default BuscaObras;
