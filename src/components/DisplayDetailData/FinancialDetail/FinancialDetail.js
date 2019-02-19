import React from 'react';
import PropTypes from 'prop-types';

class FinancialDetail extends React.Component {
  static propTypes = {
    financials: PropTypes.shape({
      cashChange: PropTypes.number,
      cashFlow: PropTypes.number,
      costOfRevenue: PropTypes.number,
      currentAssets: PropTypes.number,
      currentCash: PropTypes.number,
      currentDebt: PropTypes.number,
      grossProfit: PropTypes.number,
      netIncome: PropTypes.number,
      operatingExpense: PropTypes.number,
      operatingGainsLosses: PropTypes.number,
      operatingIncome: PropTypes.number,
      operatingRevenue: PropTypes.number,
      reportDate: PropTypes.string,
      researchAndDevelopment: PropTypes.number,
      shareholderEquity: PropTypes.number,
      totalAssets: PropTypes.number,
      totalCash: PropTypes.number,
      totalDebt: PropTypes.number,
      totalLiabilities: PropTypes.number,
      totalRevenue: PropTypes.number,
    }),
  }

  render() {
    const numToDollars = (USD) => {
      if (USD !== null) {
        return USD.toLocaleString('en-us', { style: 'currency', currency: 'USD' });
      }
      return 'Not Available';
    };

    if (this.props.financials) {
      return (
        <div>
          <h2>Financial Info</h2>
          <h4>Date of Report: {this.props.financials.reportDate}</h4>
          <div className='detail-info-container'>
            <p>
              <span className='detail-sub-title'>Net Income: </span>
              {numToDollars(this.props.financials.netIncome)}
            </p>
            <p>
              <span className='detail-sub-title'>Gross Profit: </span>
              {numToDollars(this.props.financials.grossProfit)}
            </p>
            <p>
              <span className='detail-sub-title'>Total Revenue: </span>
              {numToDollars(this.props.financials.totalRevenue)}
            </p>
            <p>
              <span className='detail-sub-title'>Operating Revenue: </span>
              {numToDollars(this.props.financials.operatingRevenue)}
            </p>
            <p>
              <span className='detail-sub-title'>Operating Income: </span>
              {numToDollars(this.props.financials.operatingIncome)}
            </p>
            <p>
              <span className='detail-sub-title'>Cost of Revenue: </span>
              {numToDollars(this.props.financials.costOfRevenue)}
            </p>
            <p>
              <span className='detail-sub-title'>Total Assets: </span>
              {numToDollars(this.props.financials.totalAssets)}
            </p>
            <p>
              <span className='detail-sub-title'>Current Assets: </span>
              {numToDollars(this.props.financials.currentAssets)}
            </p>
            <p>
              <span className='detail-sub-title'>Total Cash: </span>
              {numToDollars(this.props.financials.totalCash)}
            </p>
            <p>
              <span className='detail-sub-title'>Current Cash: </span>
              {numToDollars(this.props.financials.currentCash)}
            </p>
            <p>
              <span className='detail-sub-title'>Cashflow: </span>
              {numToDollars(this.props.financials.cashFlow)}
            </p>
            <p>
              <span className='detail-sub-title'>Change in Cashflow: </span>
              {numToDollars(this.props.financials.cashChange)}
            </p>
            <p>
              <span className='detail-sub-title'>Total Debt: </span>
              {numToDollars(this.props.financials.totalDebt)}
            </p>
            <p>
              <span className='detail-sub-title'>Current Debt: </span>
              {numToDollars(this.props.financials.currentDebt)}
            </p>
            <p>
              <span className='detail-sub-title'>Total Liabilities: </span>
              {numToDollars(this.props.financials.totalLiabilities)}
            </p>
            <p>
              <span className='detail-sub-title'>Operating Expense: </span>
              {numToDollars(this.props.financials.operatingExpense)}
            </p>
            <p>
              <span className='detail-sub-title'>Operating Gain/Loss: </span>
              {numToDollars(this.props.financials.operatingGainsLosses)}
            </p>
            <p>
              <span className='detail-sub-title'>{'R&D: '}</span>
              {numToDollars(this.props.financials.researchAndDevelopment)}
            </p>
            <p>
              <span className='detail-sub-title'>Shareholder Equity: </span>
              {numToDollars(this.props.financials.shareholderEquity)}
            </p>
          </div>
        </div>
      );
    }
    return (
      <div>
        Financial Detail
      </div>
    );
  }
}

export default FinancialDetail;
