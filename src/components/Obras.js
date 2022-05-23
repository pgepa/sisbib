/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import ObraService from '../services/obra.service';
import { useTable } from 'react-table';

const Obras = (props) => {
  const limit = 20;
  const [page, setPage] = useState(1);
  const [obras, setObras] = useState([]);

  useEffect(async () => {
    const awaitObras = await ObraService.getAll(limit, page);
    return setObras(awaitObras.data);
  }, [page]);

  const columns = useMemo(() => [
    {
      Header: 'Classificação',
      accessor: 'classificacao'
    },
    {
      Header: 'Tipo Documental',
      accessor: 'tipo_documental'
    },
    {
      Header: 'Autor',
      accessor: 'autor'
    },
    {
      Header: 'Título',
      accessor: 'titulo'
    },
    {
      Header: 'Ano',
      accessor: 'ano'
    },
    {
      Header: 'Local de Publicação',
      accessor: 'local_publicacao'
    },
    {
      Header: 'Editor',
      accessor: 'editor'
    },
    {
      Header: 'Edição',
      accessor: 'edicao'
    },
    {
      Header: 'Idioma',
      accessor: 'idioma'
    },
    {
      Header: 'Páginas',
      accessor: 'paginas'
    },
    {
      Header: 'Descritores',
      accessor: 'descritores'
    },
    {
      Header: 'Registro',
      accessor: 'registro'
    },
    {
      Header: 'Cadastrado em',
      accessor: 'createdAt',
      Cell: ({ row }) => (<span>{new Intl.DateTimeFormat("pt-BR", {}).format(
        new Date(row.original.createdAt))}</span>)
    }
  ], []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: obras
    });

  return (
    <div className="list row">
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
    </div>
  );
};

export default Obras;
