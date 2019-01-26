import React from 'react';
import iexFactory from '../../../helpers/Api/iexFactory';
import fbMethods from '../../../helpers/firebase/fbMethods';
import DisplayDetailData from '../../DisplayDetailData/DisplayDetailData';
import './StockDetail.scss';
import SaveModal from '../../Modal/SaveModal';

class StockDetail extends React.Component {
  state = {
    stockQuote: {},
    watching: [],
  }

  // Gets symbol from URL
  symbol = this.props.match.params.ticker;

  watching = () => {
    fbMethods.readWatching()
      .then((data) => {
        console.log(data);
        this.setState({
          watching: data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

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
    // API call to set state to response
    this.quoteGetter();
    this.watching();
  }

  // redirect to homepage when invalid ticker entered in URL
  homeRedirect = (e) => {
    e.preventDefault();
    this.props.history.push('/home');
  }

  render() {
    // builds stock object for active collection call
    const savedStockObj = {
      isRemoved: false,
      ticker: this.state.stockQuote.symbol,
      originTimestamp: Date.now(),
      removeTimestamp: undefined,
      originPrice: this.state.stockQuote.latestPrice,
      removePrice: undefined,
      uid: fbMethods.currentUID(),
    };

    // saving stock to active collection
    const saveStock = () => fbMethods.atvCollectionCreate(savedStockObj);

    // builds stock object for watching call
    const watchingStockObj = {
      ticker: this.state.stockQuote.symbol,
      uid: fbMethods.currentUID(),
    };

    // saving stock to active collection
    const saveWatch = () => fbMethods.watchingCreate(watchingStockObj);


    // returns if a valid ticker is entered
    if (this.state.stockQuote.symbol) {
      return (
        <div>
          <h1>
            Stock Detail
            <img
            src='https://upload.wikimedia.org/wikipedia/commons/c/ce/Plus_font_awesome.svg'
            alt='Add/Remove from Watchlist'
            className='watchlist-select'
            onClick={saveWatch}
            />
          </h1>
          <DisplayDetailData stockQuote={this.state.stockQuote} />
          <SaveModal
          buttonLabel='Save Stock?'
          savedStockObj={savedStockObj}
          saveStock={saveStock}
          companyName={this.state.stockQuote.companyName}
          />
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
