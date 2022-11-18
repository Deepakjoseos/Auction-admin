import { useState, useEffect, useCallback } from 'react';

const useQueryFilters = (initParams) => {
  const [searchParams, setSearchParams] = useState(initParams);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const handleFilters = useCallback((key, value) => {
    if (value !== 'All') {
      setSearchParams((prevSearchParams) => ({
        ...prevSearchParams,
        [key]: value
      }));
    } else {
      setSearchParams((prevSearchParams) => {
        const newSearchParams = { ...prevSearchParams };
        delete newSearchParams[key];
        return newSearchParams;
      });
    }
  }, []);

  const onChangeCurrentPageNumber = useCallback((page, pageSize) => {
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      page: page,
      limit: pageSize
    }));
  }, []);

  return {
    setSearchParams,
    setIsLoading,
    handleFilters,
    onChangeCurrentPageNumber,
    isLoading,
    searchParams,
    totalPages,
    setTotalPages,
    totalCount,
    setTotalCount
  };
};

export default useQueryFilters;
