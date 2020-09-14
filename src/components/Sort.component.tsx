import {Col, Grid, Icon, Input, InputGroup, Row, SelectPicker, Table} from 'rsuite';
import React, {useCallback, useEffect} from 'react';
import {RootReducerProps, SortStateProps} from '../schemas/storeTypes';
import {cancelAction, getSortData, handleChange, setSortKey} from '../store/actions/sortActions';

import Complicated from './Complicated.component';
import TableWithHook from './TableWithHook.component';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {useDispatch} from 'react-redux';

const keysArr = [
  {
    label: 'name',
    value: 'name',
  },
  {
    label: 'email',
    value: 'email',
  },
  {
    label: 'username',
    value: 'username',
  },
];

const sortFirs = [{value: 'email', label: 'Sort by email'}];

const sortSec = [{value: 'name', label: 'Sort by name'}];

const flexCenter = {display: 'flex', alignItems: 'center'};

const querySelector = (state: SortStateProps): string => state.searchQuery;
const dataSelector = (state: SortStateProps): any[] => state.data;
const keySelector = (state: SortStateProps): string => state.sortKey;

const filteredData = createSelector(
  [dataSelector, querySelector, keySelector],
  (data: any[], query: string, key: string) => {
    const withRegex = new RegExp(query, 'gi');

    return query ? data.filter((d) => d[key ?? 'name'].match(withRegex)) : data;
  }
);

const mapStateToProps = (state: RootReducerProps) => {
  return {
    data: filteredData(state.sortReducer),
    searchQuery: state.sortReducer.searchQuery,
  };
};

const mapDispatchToProps = {
  handleChange,
  setSortKey,
  cancelAction,
  getSortData,
};

// should make an appropriate interface
const Sort: React.FunctionComponent<any> = ({
  handleChange,
  data,
  searchQuery,
  setSortKey,
  cancelAction,
  getSortData,
}) => {
  const {Column, HeaderCell, Cell} = Table;

  useEffect(() => {
    getSortData();
  }, []);

  return (
    <>
      <button style={{outline: 'none'}} onClick={() => cancelAction()}>
        {' '}
        CANCEL SORT FETCH DATA HIHI XD
      </button>
      <button style={{outline: 'none', marginTop: '20px'}} onClick={() => getSortData()}>
        {' '}
        Resume fetching
      </button>
      <div>
        <Grid fluid>
          <Row>
            <Col xs={12} style={flexCenter}>
              <InputGroup style={{margin: '10px', width: '290px'}}>
                <Input value={searchQuery} onChange={handleChange}></Input>
                <InputGroup.Addon>
                  <Icon icon='search'></Icon>
                </InputGroup.Addon>
              </InputGroup>
              <SelectPicker
                placeholder='Default'
                onChange={(value) => setSortKey(value)}
                data={keysArr}
              ></SelectPicker>
            </Col>
            <Col xs={12} style={flexCenter}>
              <SelectPicker
                onChange={handleChange}
                data={sortFirs}
                style={{margin: '10px', width: '100%'}}
              ></SelectPicker>
              <SelectPicker
                onChange={handleChange}
                data={sortSec}
                style={{margin: '10px', width: '100%'}}
              ></SelectPicker>
            </Col>
          </Row>
        </Grid>

        <Table
          virtualized
          height={400}
          onRowClick={(data: any) => console.log(data)}
          data={data}
          style={{margin: '10vh 0'}}
        >
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
      {/* <Complicated></Complicated>
      <TableWithHook></TableWithHook> */}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
