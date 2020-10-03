import {Dropdown, Icon, Nav, Sidebar, Sidenav} from 'rsuite';

import {Link} from 'react-router-dom';
import React from 'react';

const Navbar = () => {
  return (
    <Sidebar width={250} collapsible>
      <Sidenav style={{height: '100vh'}} defaultOpenKeys={['3', '4']} activeKey='1'>
        <Sidenav.Body>
          <Nav>
            <Nav.Item componentClass={Link} to='/' eventKey='1' icon={<Icon icon='dashboard' />}>
              Home
            </Nav.Item>
            <Dropdown eventKey='3' title='Advanced' icon={<Icon icon='signing' />}>
              <Dropdown.Item componentClass={Link} to='/saved' eventKey='3-1'>
                SAVED
              </Dropdown.Item>
              <Dropdown.Item componentClass={Link} to='/sort' eventKey='3-2'>
                Sort table
              </Dropdown.Item>
              <Dropdown.Item componentClass={Link} to='/auth' eventKey='3-3'>
                Auth flow
              </Dropdown.Item>
              <Dropdown.Item componentClass={Link} to='/all' eventKey='3-4'>
                Stats currency
              </Dropdown.Item>
            </Dropdown>
            <Dropdown eventKey='4' title='Settings' icon={<Icon icon='gear-circle' />}>
              <Dropdown.Item eventKey='4-1'>Applications</Dropdown.Item>
              <Dropdown.Menu eventKey='4-5' title='Inner dropdown'>
                <Dropdown.Item eventKey='4-5-1'>Action Name</Dropdown.Item>
                <Dropdown.Item eventKey='4-5-2'>Action Params</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </Sidebar>
  );
};

export default Navbar;
