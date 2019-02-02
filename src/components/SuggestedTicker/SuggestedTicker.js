import React from 'react';
import PropTypes from 'prop-types';
import {
  ListGroupItem,
} from 'reactstrap';
import './SuggestedTicker.scss';

class SuggestedTicker extends React.Component {
  static propTypes = {
    symbol: PropTypes.string,
    compName: PropTypes.string,
  }

  render() {
    return (
      <ListGroupItem tag="a" href={`/stock/${this.props.symbol}`}>
      <span className="suggested-symbol">{this.props.symbol}</span>
      {this.props.compName}
      </ListGroupItem>
    );
  }
}

export default SuggestedTicker;
