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
import WatchingNav from './WatchingNav/WatchingNav';
import './MyNav.scss';

class MyNav extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
  }

  state = {
    watchingSymbol: [],
  };

  componentDidMount() {
    fbMethods.readWatchingTicker()
      .then((data) => {
        this.setState({ watchingSymbol: data });
      })
      .catch((err) => {
        console.error('error getting watched tickers', err);
      });
  }

  render() {
    const populateWatching = this.state.watchingSymbol.map(
      symbol => <WatchingNav key={symbol} symbol={symbol} />,
    );

    if (this.props.authed) {
      return (
        <div>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">Renenutet</NavbarBrand>
              <Nav className="ml-auto" navbar>
              {/* Personal Portfolio Dropdown */}
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
                </DropdownMenu>
              </UncontrolledDropdown>
              {/* End Personal Portfolio Dropdown */}

              {/* Watching Nav Dropdown */}
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                Watching
                </DropdownToggle>
                <DropdownMenu right className="watching-nav">
                  {populateWatching}
                </DropdownMenu>
              </UncontrolledDropdown>
              {/* End Watching Nav Dropdown */}

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
