import React from 'react';
import PropTypes from 'prop-types';
import './DisplayDetailData.scss';
import BasicDetail from './BasicDetail/BasicDetail';
import CompanyDetail from './CompanyDetail/CompanyDetail';
import FinancialDetail from './FinancialDetail/FinancialDetail';
import NewsDetail from './NewsDetail/NewsDetail';
import iexFactory from '../../helpers/Api/iexFactory';

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

  state = {
    selectedDetail: <BasicDetail stockQuote={this.props.stockQuote} />,
    companyInfo: null,
    financials: null,
    newsDetail: null,
  }

  render() {
    // information selector. Defaults to basic info
    const chooseDetail = (e) => {
      const selectedDetail = e.target.innerHTML;
      let selected;
      switch (selectedDetail) {
        case 'Stock Info':
          this.setState({ selectedDetail: <BasicDetail stockQuote={this.props.stockQuote} /> });
          break;
        case 'Company Details':
          this.setState({ selectedDetail: <CompanyDetail companyInfo={this.state.companyInfo}/> });
          break;
        case 'Financial Info':
          this.setState({ selectedDetail: <FinancialDetail financials={this.state.financials}/> });
          break;
        case 'Related News':
          this.setState({ selectedDetail: <NewsDetail newsDetail={this.state.newsDetail}/> });
          break;
        default: selected = <BasicDetail stockQuote={this.props.stockQuote} />;
      }
      return selected;
    };


    // ============= API call if info is requested ==================
    const popCompDetails = (e) => {
      e.persist();
      if (this.state.companyInfo === null) {
        iexFactory.getCompanyDetails(this.props.stockQuote.symbol)
          .then((compDetails) => {
            this.setState({
              companyInfo: compDetails,
            });
            chooseDetail(e);
          })
          .catch((err) => {
            console.error('error getting company info', err);
          });
      }
    };

    const popFinDetails = (e) => {
      e.persist();
      if (this.state.financials === null) {
        iexFactory.getFinancialDetail(this.props.stockQuote.symbol)
          .then((finDetail) => {
            this.setState({
              financials: finDetail,
            });
            chooseDetail(e);
          })
          .catch((err) => {
            console.error('error getting financial info', err);
          });
      }
    };


    const popNewsDetails = (e) => {
      e.persist();
      if (this.state.newsDetail === null) {
        iexFactory.getNewsInfo(this.props.stockQuote.symbol)
          .then((news) => {
            this.setState({
              newsDetail: news,
            });
            chooseDetail(e);
          })
          .catch((err) => {
            console.error('error getting news info', err);
          });
      }
    };
    // ================= end conditional api call ========================

    // primary render is set as undefined. Must wait for parent to pass props before render
    if (this.props.stockQuote.change !== undefined) {
      return (
        <div className='detail-container'>
          <p className='comp-logo-name'>
            <img
            src={this.props.logo}
            className='detail-logo'
            alt={`${this.props.stockQuote.companyName} logo`}
            />
             {'  '}Company: {this.props.stockQuote.companyName}
          </p>
          <h4 onClick={chooseDetail} className='detail-titles'>
            <span className='detail-selector'>Stock Info</span>
            <span className='detail-selector' onClick={popCompDetails}>Company Details</span>
            <span className='detail-selector' onClick={popFinDetails}>Financial Info</span>
            <span className='detail-selector' onClick={popNewsDetails}>Related News</span>
          </h4>
          {this.state.selectedDetail}
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
