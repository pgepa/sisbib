import React from 'react';
import { Pagination } from 'react-bootstrap';
import {
  FaAngleDoubleLeft,
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleRight
} from 'react-icons/fa';

const PaginationComponent = ({ page, totalPages, onPageChange }) => {
  if (!totalPages || totalPages <= 1) return null;

  const maxButtons = 3;
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
    <Pagination className="pagination-modern mb-0 flex-wrap align-items-center">
      <Pagination.First
        onClick={() => onPageChange(1)}
        disabled={page <= 1}
        title="Primeira página"
      >
        <FaAngleDoubleLeft size="0.75rem" />
      </Pagination.First>
      <Pagination.Prev
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        title="Página anterior"
      >
        <FaChevronLeft size="0.75rem" />
      </Pagination.Prev>

      {pages.map((p) => (
        <Pagination.Item
          key={p}
          active={p === page}
          onClick={() => onPageChange(p)}
        >
          {p}
        </Pagination.Item>
      ))}

      <Pagination.Next
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        title="Próxima página"
      >
        <FaChevronRight size="0.75rem" />
      </Pagination.Next>
      <Pagination.Last
        onClick={() => onPageChange(totalPages)}
        disabled={page >= totalPages}
        title="Última página"
      >
        <FaAngleDoubleRight size="0.75rem" />
      </Pagination.Last>
    </Pagination>
  );
};

export default PaginationComponent;
