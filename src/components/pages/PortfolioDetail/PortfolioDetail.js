import React from 'react';
import DisplayDetailData from '../../DisplayDetailData/DisplayDetailData';
import iexFactory from '../../../helpers/Api/iexFactory';
import fbMethods from '../../../helpers/firebase/fbMethods';
import './PortfolioDetail.scss';

class PortfolioDetail extends React.Component {
  state = {
    stockQuote: {},
    userQuote: {},
  }

  // Gets symbol from URL
  symbol = this.props.match.params.fbKey;


  // API call to populate data
  quoteGetter = () => {
    iexFactory.quoteRequest(this.state.userQuote.ticker)
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
    fbMethods.readSingleSaved(this.symbol)
      .then((data) => {
        this.setState({
          userQuote: data[0],
        });
        return 0;
      })
      .then(() => {
        this.quoteGetter();
      })
      .catch((err) => {
        console.error('error in Portfolio Detail data retrieval', err);
      });
  }

  render() {
    if (this.state.stockQuote !== undefined) {
      return (
        <div>
          <div>
            <h1>My Position</h1>
            <p>Starting Price: ${this.state.userQuote.originPrice}</p>
            <p>
             ROI: ${(
              this.state.stockQuote.latestPrice - this.state.userQuote.originPrice
            ).toFixed(2)}
            {'  ' /* need to add space between $ and % */}
              ({(
              (
                (this.state.stockQuote.latestPrice - this.state.userQuote.originPrice)
                  / this.state.userQuote.originPrice)
                  * 100).toFixed(2)}%)
            </p>
          </div>
          <button className='btn btn-danger'>Remove Security</button>
          <DisplayDetailData stockQuote={this.state.stockQuote} />
        </div>
      );
    }

    return (
      <div>port detail
      </div>
    );
  }
}

export default PortfolioDetail;
