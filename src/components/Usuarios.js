// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useState, useEffect, useMemo } from 'react';
import UsuarioService from '../services/usuario.service';
import { useTable } from 'react-table';

const Usuarios = (props) => {
  const limit = 20;
  const [page, setPage] = useState(1);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(async () => {
    const awaitUsuarios = await UsuarioService.getAll(limit, page);
    return setUsuarios(awaitUsuarios.data);
  }, [page]);

  const columns = useMemo(() => [
    {
      Header: 'Matrícula',
      accessor: 'inscription'
    },
    {
      Header: 'Nome',
      accessor: 'name'
    },
    {
      Header: 'Setor',
      accessor: 'department'
    },
    {
      Header: 'CPF',
      accessor: 'cpf'
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
      data: usuarios
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

export default Usuarios;
