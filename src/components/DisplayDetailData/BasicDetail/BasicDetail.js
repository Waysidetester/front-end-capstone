import React from 'react';

class BasicDetail extends React.Component {
  render() {
    // returns a string with a percentage # to the 2nd decimal
    const percentifyer = (percentNum) => {
      const percentage = percentNum * 100;
      return `${percentage.toFixed(2)}%`;
    };

    // converts raw numbers to currency
    const numToDollars = USD => USD.toLocaleString('en-us', { style: 'currency', currency: 'USD' });

    return (
      <div>
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
}

export default BasicDetail;
