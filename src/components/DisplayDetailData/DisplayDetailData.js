import React from 'react';
import PropTypes from 'prop-types';
import './DisplayDetailData.scss';
import BasicDetail from './BasicDetail/BasicDetail';

class DisplayDetailData extends React.Component {
  static propTypes = {
    stockQuote: PropTypes.shape({
      avgTotalVolume: PropTypes.number,
      calculationPrice: PropTypes.string,
      change: PropTypes.number,
      changePercent: PropTypes.number,
      close: PropTypes.number,
      closeTime: PropTypes.number,
      companyName: PropTypes.string,
      delayedPrice: PropTypes.number,
      delayedPriceTime: PropTypes.number,
      extendedChange: PropTypes.number,
      extendedChangePercent: PropTypes.number,
      extendedPrice: PropTypes.number,
      extendedPriceTime: PropTypes.number,
      high: PropTypes.number,
      latestPrice: PropTypes.number,
      latestSource: PropTypes.string,
      latestTime: PropTypes.string,
      latestUpdate: PropTypes.number,
      latestVolume: PropTypes.number,
      low: PropTypes.number,
      marketCap: PropTypes.number,
      open: PropTypes.number,
      openTime: PropTypes.number,
      peRatio: PropTypes.number,
      previousClose: PropTypes.number,
      primaryExchange: PropTypes.string,
      sector: PropTypes.string,
      symbol: PropTypes.string,
      week52High: PropTypes.number,
      week52Low: PropTypes.number,
      ytdChange: PropTypes.number,
    }),
    logo: PropTypes.string,
  }

  render() {
    // primary render is set as undefined. Must wait for parent to pass props before render
    if (this.props.stockQuote.change !== undefined) {
      return (
        <div className='detail-container'>
          <p>
            <img
            src={this.props.logo}
            className='detail-logo'
            alt={`${this.props.stockQuote.companyName} logo`}
            />
             {'  '}Company: {this.props.stockQuote.companyName}
          </p>
          <BasicDetail stockQuote={this.props.stockQuote} />
        </div>
      );
    }
    return (
      <div>
        <h2>Internal Error. Please cry and wait for help!</h2>
        <a className="btn btn-danger" href="/portfolio">Return to Portfolio</a>
      </div>
    );
  }
}

export default DisplayDetailData;
