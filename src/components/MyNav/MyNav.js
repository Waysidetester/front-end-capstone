import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
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
