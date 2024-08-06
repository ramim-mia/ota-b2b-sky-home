import { useState } from "react";

function usePagination(initialPage: number = 1, initialPageSize: number = 20) {
  const [pagination, setPagination] = useState({
    current: initialPage,
    pageSize: initialPageSize,
  });

  const handlePaginationChange = (current: number, pageSize: number) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      current,
      pageSize,
    }));
    window.scrollTo(0, 0);
  };

  const arg = `limit=${pagination.pageSize}&page=${pagination.current}`;

  return { pagination, handlePaginationChange, arg, setPagination };
}

export default usePagination;
