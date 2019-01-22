import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import fbMethods from '../../helpers/firebase/fbMethods';

class MyNav extends React.Component {
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
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
