import {
  Checkbox,
  Col,
  Divider,
  Dropdown,
  Grid,
  Icon,
  IconButton,
  Input,
  InputGroup,
  Popover,
  Row,
  SelectPicker,
  Table,
  Whisper,
} from 'rsuite';
import React, {useCallback, useState} from 'react';

import usersData from './usersData';

const Menu = ({onSelect}) => (
  <Dropdown.Menu onSelect={onSelect}>
    <Dropdown.Item eventKey={3}>Download As...</Dropdown.Item>
    <Dropdown.Item eventKey={4}>Export PDF</Dropdown.Item>
    <Dropdown.Item eventKey={5}>Export HTML</Dropdown.Item>
    <Dropdown.Item eventKey={6}>Settings</Dropdown.Item>
    <Dropdown.Item eventKey={7}>About</Dropdown.Item>
  </Dropdown.Menu>
);

const MenuPopover = ({onSelect, ...rest}) => (
  <Popover {...rest} full>
    <Menu onSelect={onSelect}></Menu>
  </Popover>
);

let tableBody;

const CustomWhisper = (props) => {
  let triggerRef;

  const handleSelectMenu = (eKey: any, e) => {
    console.log(eKey, 'eKey from CustomWhisper');
    triggerRef.hide();
  };

  return (
    <Whisper
      placement='autoVerticalStart'
      trigger='click'
      triggerRef={(ref) => {
        triggerRef = ref;
      }}
      container={() => {
        return tableBody;
      }}
      speaker={<MenuPopover onSelect={handleSelectMenu}></MenuPopover>}
    >
      {props.children}
    </Whisper>
  );
};

// should make an appropriate interface
const Sort: React.FunctionComponent<any> = () => {
  const {Column, HeaderCell, Cell} = Table;

  const [state, setState] = useState({
    checkedKeys: [],
  });

  const handleCheck = useCallback((value, checked) => {
    console.log(checked);
  }, []);

  const handleCheckAll = useCallback((value, checked) => {}, []);

  const ActionCell = ({rowData, dataKey, ...props}) => {
    function handleAction() {
      alert(`id:${rowData[dataKey]}`);
    }
    return (
      <Cell {...props} className='link-group'>
        <IconButton
          appearance='subtle'
          onClick={handleAction}
          icon={<Icon icon='edit2' />}
        />
        <Divider vertical />
        <CustomWhisper>
          <IconButton appearance='subtle' icon={<Icon icon='more' />} />
        </CustomWhisper>
      </Cell>
    );
  };

  return (
    <div style={{margin: '10vh 0'}}>
      <Table
        virtualized
        height={400}
        id='table'
        // onRowClick={(data: any) => console.log(data)}
        data={usersData}
        bodyRef={(ref) => {
          tableBody = ref;
        }}
      >
        <Column width={50} align='center'>
          <HeaderCell style={{padding: 0}}>
            <div style={{lineHeight: '40px'}}>
              <Checkbox></Checkbox>
            </div>
          </HeaderCell>
          <Cell>empty</Cell>
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
        <Column width={200} resizable treeCol={true}>
          <HeaderCell>address</HeaderCell>
          <Cell dataKey='address'>
            {(rowData, key) => {
              return <h2>data</h2>;
            }}
          </Cell>
        </Column>
      </Table>
    </div>
  );
};

export default Sort;
