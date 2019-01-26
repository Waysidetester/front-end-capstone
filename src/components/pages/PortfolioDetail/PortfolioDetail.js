import React from 'react';
import DisplayDetailData from '../../DisplayDetailData/DisplayDetailData';
import iexFactory from '../../../helpers/Api/iexFactory';
import './PortfolioDetail.scss';

class PortfolioDetail extends React.Component {
  state = {
    stockQuote: {},
  }

  // Gets symbol from URL
  symbol = this.props.match.params.fbKey;


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

  render() {
    if (this.state.stockQuote !== undefined) {
      return (
        <DisplayDetailData stockQuote={this.state.stockQuote} />
      );
    }

    return (
      <div>port detail
      </div>
    );
  }
}

export default PortfolioDetail;
