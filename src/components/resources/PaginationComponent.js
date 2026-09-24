import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ page, totalPages, onPageChange }) => {
  if (!totalPages || totalPages <= 1) return null;

  const maxButtons = 5;
  let startPage = Math.max(1, page - Math.floor(maxButtons / 2));
  let endPage = startPage + maxButtons - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <Pagination className="pt-1 mb-0 flex-wrap">
      <Pagination.First
        onClick={() => onPageChange(1)}
        disabled={page <= 1}
        title="Primeira página"
      />
      <Pagination.Prev
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        title="Página anterior"
      />

      {startPage > 1 && (
        <>
          <Pagination.Item onClick={() => onPageChange(1)}>1</Pagination.Item>
          {startPage > 2 && <Pagination.Ellipsis disabled />}
        </>
      )}

      {pages.map((p) => (
        <Pagination.Item
          key={p}
          active={p === page}
          onClick={() => onPageChange(p)}
        >
          {p}
        </Pagination.Item>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <Pagination.Ellipsis disabled />}
          <Pagination.Item onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </Pagination.Item>
        </>
      )}

      <Pagination.Next
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        title="Próxima página"
      />
      <Pagination.Last
        onClick={() => onPageChange(totalPages)}
        disabled={page >= totalPages}
        title="Última página"
      />
    </Pagination>
  );
};

export default PaginationComponent;
