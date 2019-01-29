import React from 'react';
import { DropdownItem } from 'reactstrap';

class WatchingNav extends React.Component {
  render() {
    return (
      <DropdownItem href={`stock/${this.props.symbol}`}>
        {this.props.symbol}
      </DropdownItem>
    );
  }
};

export default WatchingNav;
