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

    if (this.props.stockQuote) {
      const updated = Date().toLocaleString(this.props.stockQuote.latestUpdate);
      return (
        <div>
          <h1>Stock Info</h1>
          <div className='detail-info-container'>
            <p>
              <span className='detail-sub-title'>Price: </span>
              {numToDollars(this.props.stockQuote.latestPrice)}
            </p>
            <p>
              <span className='detail-sub-title'>% Daily Change: </span>
              {percentifyer(this.props.stockQuote.changePercent)}
            </p>
            <p>
              <span className='detail-sub-title'>$ Daily Change: </span>
              {numToDollars(this.props.stockQuote.change)}
            </p>
            <p>
              <span className='detail-sub-title'>Last Updated: </span>
              {updated.replace(' GMT-0600', '')}
            </p>
            <p>
              <span className='detail-sub-title'>Market Cap: </span>
              {numToDollars(this.props.stockQuote.marketCap)}
            </p>
            <p>
              <span className='detail-sub-title'>PE Ratio: </span>
              {this.props.stockQuote.peRatio}
            </p>
            <p>
              <span className='detail-sub-title'>52 Week High: </span>
              {numToDollars(this.props.stockQuote.week52High)}
            </p>
            <p>
              <span className='detail-sub-title'>52 Week Low: </span>
              {numToDollars(this.props.stockQuote.week52Low)}
            </p>
            <p>
              <span className='detail-sub-title'>Calculation Price: </span>
              {this.props.stockQuote.calculationPrice}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div>
        Internal error. No stock detail to display.
      </div>
    );
  }
}

export default BasicDetail;
