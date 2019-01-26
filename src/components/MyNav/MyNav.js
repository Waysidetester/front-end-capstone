import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';
import fbMethods from '../../helpers/firebase/fbMethods';

class MyNav extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
  }

  render() {
    if (this.props.authed) {
      return (
        <div>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">Renenutet</NavbarBrand>
              <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                Portfolio
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href='/portfolio'>
                    Tracking
                  </DropdownItem>
                  <DropdownItem href='/removed'>
                    Completed
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
                <NavItem onClick={fbMethods.logout}>
                  <NavLink >Sign Out</NavLink>
                </NavItem>
              </Nav>
          </Navbar>
        </div>
      );
    }

    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Renenutet</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem onClick={fbMethods.googleLogin}>
                <NavLink >Sign In</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    );
  }
}

export default MyNav;
