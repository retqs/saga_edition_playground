import {Input, InputGroup, Table} from 'rsuite';
import React, {useCallback, useMemo, useState} from 'react';

import {useTableSearch} from '../hooks/useTableSearch';

const TableWithHook:React.FunctionComponent<any> = () => {
  const {Column, HeaderCell, Cell} = Table;

  const [inputVal, setIntpuVal] = useState('');

  const {filteredData, loading} = useTableSearch({
    searchVal: inputVal,
    data: [],
  });

  return (
    <div>
      <InputGroup>
        <Input value={inputVal} onChange={(v) => setIntpuVal(v)}></Input>
      </InputGroup>
      <Table>
        <Column width={70} resizable>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey='id' />
        </Column>
        <Column width={120} resizable>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey='name' />
        </Column>
        <Column width={120} resizable>
          <HeaderCell>Username</HeaderCell>
          <Cell dataKey='username' />
        </Column>
        <Column width={150} resizable>
          <HeaderCell>Email</HeaderCell>
          <Cell dataKey='email' />
        </Column>
        <Column width={150} resizable>
          <HeaderCell>Phone</HeaderCell>
          <Cell dataKey='phone' />
        </Column>
      </Table>
    </div>
  );
};

export default TableWithHook;
