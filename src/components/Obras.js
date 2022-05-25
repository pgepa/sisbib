/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo, useRef } from 'react';
import ObraService from '../services/obra.service';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { useTable } from 'react-table';
import { useNavigate } from 'react-router-dom';
import colunasObras from './resources/ColunasObras';

const Obras = (props) => {
  const limit = 20;
  const [page, setPage] = useState(1);
  const [obras, setObras] = useState([]);
  const [termo, setTermo] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();
  
  useEffect(async () => {
    const awaitObras = await ObraService.getAll(limit, page);
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
  
  const onChangeTermo = (e) => {
    const termo = e.target.value;
    setTermo(termo);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    if (checkBtn.current.context._errors.length === 0) {
      ObraService.getSome({ termo: termo },limit,page).then(
        () => {
          navigate('/search', { termo: termo } );
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
            setLoading(false);
            setMessage(resMessage);
        }
      );
    }
    else {
      setLoading(false);
    }
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
          <div className="form-group col-3 pt-3">
            <Input
              type="text"
              className="form-control mt-1"
              name="termo"
              value={termo}
              onChange={onChangeTermo}
              placeholder="termo de busca"
            />
          </div>
          <div className="form-group col-3 pt-3">
            <button
              type="submit"
              className="btn btn-primary btn-block mt-1"
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Buscar</span>
            </button>
          </div>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
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

export default Obras;
