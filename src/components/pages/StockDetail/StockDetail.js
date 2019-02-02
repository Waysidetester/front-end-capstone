import React from 'react';
import iexFactory from '../../../helpers/Api/iexFactory';
import fbMethods from '../../../helpers/firebase/fbMethods';
import DisplayDetailData from '../../DisplayDetailData/DisplayDetailData';
import Watching from './Watching/Watching';
import Charts from '../../Charts/Charts';
import './StockDetail.scss';
import SaveModal from '../../Modal/SaveModal';

class StockDetail extends React.Component {
  state = {
    stockQuote: {},
    chartData: [],
    logo: undefined,
  }

  // Gets symbol from URL
  symbol = this.props.match.params.ticker;

  // chart data api call that sets data to state
  chartGenerator = (chartTimeFrame) => {
    iexFactory.chartValues(this.state.stockQuote.symbol, chartTimeFrame)
      .then((chartValues) => {
        this.setState({ chartData: chartValues });
      });
  }

  // changes timeframe that api returns for chart data points
  chartTimeFrameChanger = (e) => {
    this.setState({
      chartTimeFrame: e.currentTarget.innerHTML,
    });
    this.chartGenerator(e.currentTarget.innerHTML);
  }

  // API call to populate data
  quoteGetter = () => {
    iexFactory.quoteRequest(this.symbol)
      .then((data) => {
        iexFactory.getLogo(data.symbol)
          .then((image) => {
            this.setState({
              stockQuote: data,
              logo: image.url,
            });
            // creates initial chart from data returned
            this.chartGenerator('1d');
          });
      })
      .catch((err) => {
        console.error('error in StockDetail.js', err);
      });
  }

  componentDidMount() {
    // API call to set state to response
    this.quoteGetter();
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

    // returns if a valid ticker is entered
    if (this.state.stockQuote.symbol) {
      return (
        <div>
          {/* renders watching component and functionality */}
          <Watching
          stockSymbol={this.state.stockQuote.symbol}
          />

          {/* displays chart on api data */}
          <Charts
          chartData={this.state.chartData}
          chartTimeFrameChanger={this.chartTimeFrameChanger}
          />

          {/* returns generic data from api */}
          <DisplayDetailData stockQuote={this.state.stockQuote} logo={this.state.logo}/>

          {/* modal that appears on click */}
          <SaveModal
          buttonLabel='Save Stock?'
          savedStockObj={savedStockObj}
          saveStock={saveStock}
          companyName={this.state.stockQuote.companyName}
          />
        </div>
      );
    }

    // invalid route redirect page
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
