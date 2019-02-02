import React from 'react';
import DisplayDetailData from '../../DisplayDetailData/DisplayDetailData';
import iexFactory from '../../../helpers/Api/iexFactory';
import fbMethods from '../../../helpers/firebase/fbMethods';
import './PortfolioDetail.scss';

class PortfolioDetail extends React.Component {
  state = {
    stockQuote: {},
    userQuote: {},
    isRemoved: false,
    logo: undefined,
  }

  // Gets symbol from URL
  symbol = this.props.match.params.fbKey;


  // API call to populate data
  quoteGetter = () => {
    iexFactory.quoteRequest(this.state.userQuote.ticker)
      .then((data) => {
        iexFactory.getLogo(data.symbol)
          .then((image) => {
            this.setState({
              stockQuote: data,
              logo: image.url,
            });
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
    // ============== remove functionality =================

    /* function to remove security from actively watching
       and adds detail for removed status */
    const removeStatus = () => {
      const savedKey = this.state.userQuote.id;
      const removeObj = this.state.userQuote;
      removeObj.isRemoved = true;
      removeObj.removeTimestamp = Date.now();
      removeObj.removePrice = this.state.stockQuote.latestPrice;
      fbMethods.removeSecurity(savedKey, removeObj)
        .then(() => {
          this.setState({
            isRemoved: true,
          });
        });
    };

    /* informs user a security was successfully removed
       and gives affordance to return to portfolio summary */
    if (this.state.isRemoved) {
      const goBack = () => {
        this.props.history.goBack();
      };
      return (
        <div>
          <h2>Successfully Removed</h2>
          <button
          className='btn btn-success'
          onClick={goBack}
          >Go Back</button>
        </div>
      );
    }

    // ============== end remove functionality ===============

    // ============== render section =========================

    // display if information is valid
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
          <button
          className='btn btn-danger'
          onClick={removeStatus}
          >Remove Security</button>
          <DisplayDetailData stockQuote={this.state.stockQuote} logo={this.state.logo}/>
        </div>
      );
    }

    // default info on bad request
    return (
      <div>
        Bad request. Please try again.
      </div>
    );
  }
}

export default PortfolioDetail;
