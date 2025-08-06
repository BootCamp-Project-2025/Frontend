import { useCallback, useEffect, useState } from "react";
import { useToastContext } from "../contexts/ToastContext";
import { baseAPI } from "../api/axios/AxiosConnection";
import { useSearchParams } from "react-router-dom";

export function usePagination({ url }) {
  const { showToast } = useToastContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(12);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFiltersState] = useState({
    category: null,
    subcategory: null,
    language: null,
    rating: null,
    order: null,
    sort: null,
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await baseAPI.get(url, {
        params: {
          page,
          size,
          query,
          ...filters,
        },
      });

      if (res.status !== 200) {
        showToast(`${res.statusText}`, "error");
        return;
      }

      setData(res.data.data.data);
      setTotal(res.data.data.total);
    } catch (err) {
      showToast(`Failed to fetch data ${err.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  }, [url, page, size, filters, query, showToast]);

  const nextPage = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const previousPage = useCallback(() => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  }, []);

  const resetPagination = useCallback(() => {
    setPage(1);
    setData([]);
  }, []);

  const setFilters = useCallback(
    (newFilters) => {
      setFiltersState((prev) => ({
        ...prev,
        ...newFilters,
      }));
      resetPagination();
    },
    [resetPagination]
  );

  const removeFilter = useCallback(
    (filterKey) => {
      setFiltersState((prev) => ({
        ...prev,
        [filterKey]: null,
      }));
      resetPagination();
    },
    [resetPagination]
  );

  const clearFilters = useCallback(() => {
    setFiltersState({
      category: null,
      subcategory: null,
      language: null,
      rating: null,
      order: null,
      sort: null,
    });
    resetPagination();
  }, [resetPagination]);

  const setPageSize = useCallback(
    (newSize) => {
      setSize(newSize);
      resetPagination();
    },
    [resetPagination]
  );

  const setPageIndex = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const setSearchQuery = useCallback(
    (newQuery) => {
      setQuery(newQuery);
      resetPagination();
    },
    [resetPagination]
  );

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());

    const restoredFilters = Object.fromEntries(
      Object.entries(params).filter(([key]) =>
        [
          "category",
          "subcategory",
          "language",
          "rating",
          "order",
          "sort",
        ].includes(key)
      )
    );

    if (params.query) setQuery(params.query);
    if (Object.keys(restoredFilters).length > 0)
      setFiltersState((prev) => ({
        ...prev,
        ...restoredFilters,
      }));

    const pageNum = parseInt(params.page);
    if (!isNaN(pageNum)) setPage(pageNum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        newParams.set(key, value);
      }
    });

    if (query && query.trim() !== "") {
      newParams.set("query", query);
    }

    if (page > 1) {
      newParams.set("page", page.toString());
    }

    setSearchParams(newParams, { replace: true });
  }, [filters, query, page, setSearchParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    total,
    page,
    size,
    filters,
    query,
    isLoading,
    fetchData,
    nextPage,
    previousPage,
    resetPagination,
    setFilters,
    removeFilter,
    clearFilters,
    setPageSize,
    setPageIndex,
    setSearchQuery,
  };
}
