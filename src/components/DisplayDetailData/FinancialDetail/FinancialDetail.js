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
          <h2>Financial Detail</h2>
          <h4>{this.props.financials.reportDate}</h4>
          <p>Net Income: {numToDollars(this.props.financials.netIncome)}</p>
          <p>Gross Profit: {numToDollars(this.props.financials.grossProfit)}</p>
          <p>Total Revenue: {numToDollars(this.props.financials.totalRevenue)}</p>
          <p>Operating Revenue: {numToDollars(this.props.financials.operatingRevenue)}</p>
          <p>Operating Income: {numToDollars(this.props.financials.operatingIncome)}</p>
          <p>Cost of Revenue: {numToDollars(this.props.financials.costOfRevenue)}</p>
          <p>Total Assets: {numToDollars(this.props.financials.totalAssets)}</p>
          <p>Current Assets: {numToDollars(this.props.financials.currentAssets)}</p>
          <p>Total Cash: {numToDollars(this.props.financials.totalCash)}</p>
          <p>Current Cash: {numToDollars(this.props.financials.currentCash)}</p>
          <p>Cashflow: {numToDollars(this.props.financials.cashFlow)}</p>
          <p>Change in Cashflow: {numToDollars(this.props.financials.cashChange)}</p>
          <p>Total Debt: {numToDollars(this.props.financials.totalDebt)}</p>
          <p>Current Debt: {numToDollars(this.props.financials.currentDebt)}</p>
          <p>Total Liabilities: {numToDollars(this.props.financials.totalLiabilities)}</p>
          <p>Operating Expense: {numToDollars(this.props.financials.operatingExpense)}</p>
          <p>Operating Gain/Loss: {numToDollars(this.props.financials.operatingGainsLosses)}</p>
          <p>{'R&D: '}{numToDollars(this.props.financials.researchAndDevelopment)}</p>
          <p>Shareholder Equity: {numToDollars(this.props.financials.shareholderEquity)}</p>
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
