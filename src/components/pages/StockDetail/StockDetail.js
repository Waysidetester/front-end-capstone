import React from 'react';
import iexFactory from '../../../helpers/Api/iexFactory';
import fbMethods from '../../../helpers/firebase/fbMethods';
import './StockDetail.scss';
import SaveModal from '../../Modal/SaveModal';

class StockDetail extends React.Component {
  state = {
    stockQuote: {},
  }

  // Gets symbol from URL
  symbol = this.props.match.params.ticker;

  // API call to populate data
  quoteGetter = () => {
    iexFactory.quoteRequest(this.symbol)
      .then((data) => {
        this.setState({
          stockQuote: data,
        });
      })
      .catch((err) => {
        console.error('error in StockDetail.js', err);
      });
  }

  componentDidMount() {
    this.quoteGetter();
  }

  homeRedirect = (e) => {
    e.preventDefault();
    this.props.history.push('/home');
  }

  render() {
    // converts raw numbers to currency
    const numToDollars = USD => USD.toLocaleString('en-us', { style: 'currency', currency: 'USD' });

    // returns a string with a percentage # to the 2nd decimal
    const percentifyer = (percentNum) => {
      const percentage = percentNum * 100;
      return `${percentage.toFixed(2)}%`;
    };

    // builds stock object for axios call
    const savedStockObj = () => {
      const stock = {
        isRemoved: false,
        ticker: this.state.stockQuote.symbol,
        originTimestamp: Date.now(),
        removeTimestamp: undefined,
        originPrice: this.state.stockQuote.latestPrice,
        removePrice: undefined,
        uid: fbMethods.currentUID(),
      };
      return stock;
    };

    const saveStock = () => {
      fbMethods.atvCollectionCreate(savedStockObj());
      console.log('saved stock to firebase');
    };

    // returns if a valid ticker is entered
    if (this.state.stockQuote.symbol) {
      return (
        <div>
          <h1>Stock Detail</h1>
          <p>Company: {this.state.stockQuote.companyName}</p>
          <p>Price: ${this.state.stockQuote.latestPrice}</p>
          <p>% Daily Change: {percentifyer(this.state.stockQuote.changePercent)}</p>
          <p>$ Daily Change: {numToDollars(this.state.stockQuote.change)}</p>
          <p>Last Updated: {Date().toLocaleString(this.state.stockQuote.latestUpdate)}</p>
          <p>Market Cap: {numToDollars(this.state.stockQuote.marketCap)}</p>
          <p>PE Ratio: {this.state.stockQuote.peRatio}</p>
          <p>52 Week High: {numToDollars(this.state.stockQuote.week52High)}</p>
          <p>52 Week Low: {numToDollars(this.state.stockQuote.week52Low)}</p>
          <p>Calculation Price: {this.state.stockQuote.calculationPrice}</p>
          <button className='btn btn-secondary' onClick={saveStock}>Save Stock</button>
          <SaveModal buttonLabel='button Label' saveStock={saveStock}/>
        </div>
      );
    }

    return (
      <div>
        <h1>Stock Detail</h1>
        <p>Invalid Stock</p>
        <button className='btn btn-dark' onClick={this.homeRedirect}>Return to Homepage</button>
      </div>
    );
  }
}

export default StockDetail;
