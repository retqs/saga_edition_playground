import {useEffect, useState} from 'react';

export const useTableSearch = ({searchVal, data}) => {
  const [filteredData, setFilteredData] = useState([]);
  const [origData, setOrigData] = useState([]);
  const [searchIndex, setSearchIndex] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);

  return {filteredData, loading};
};
