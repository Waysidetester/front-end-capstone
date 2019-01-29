import React from 'react';
import PropTypes from 'prop-types';
import './DisplayDetailData.scss';

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
  }

  render() {
    // returns a string with a percentage # to the 2nd decimal
    const percentifyer = (percentNum) => {
      const percentage = percentNum * 100;
      return `${percentage.toFixed(2)}%`;
    };

    // converts raw numbers to currency
    const numToDollars = USD => USD.toLocaleString('en-us', { style: 'currency', currency: 'USD' });

    // primary render is set as undefined. Must wait for parent to pass props before render
    if (this.props.stockQuote.change !== undefined) {
      return (
        <div>
          <p>Company: {this.props.stockQuote.companyName}</p>
          <p>Price: ${this.props.stockQuote.latestPrice}</p>
          <p>% Daily Change: {percentifyer(this.props.stockQuote.changePercent)}</p>
          <p>$ Daily Change: {numToDollars(this.props.stockQuote.change)}</p>
          <p>Last Updated: {Date().toLocaleString(this.props.stockQuote.latestUpdate)}</p>
          <p>Market Cap: {numToDollars(this.props.stockQuote.marketCap)}</p>
          <p>PE Ratio: {this.props.stockQuote.peRatio}</p>
          <p>52 Week High: {numToDollars(this.props.stockQuote.week52High)}</p>
          <p>52 Week Low: {numToDollars(this.props.stockQuote.week52Low)}</p>
          <p>Calculation Price: {this.props.stockQuote.calculationPrice}</p>
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
