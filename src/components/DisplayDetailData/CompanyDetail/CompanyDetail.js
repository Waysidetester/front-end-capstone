import React from 'react';
import PropTypes from 'prop-types';

class CompanyDetail extends React.Component {
  static propTypes = {
    companyInfo: PropTypes.shape({
      CEO: PropTypes.string,
      description: PropTypes.string,
      industry: PropTypes.string,
      sector: PropTypes.string,
      website: PropTypes.string,
    }),
  }

  render() {
    if (this.props.companyInfo) {
      return (
        <div>
          <h1>Company Detail</h1>
          <p>CEO: {this.props.companyInfo.CEO}</p>
          <p>Company Info: {this.props.companyInfo.description}</p>
          <p>Industry: {this.props.companyInfo.industry}</p>
          <p>Sector: {this.props.companyInfo.sector}</p>
          <p>Website:{' '}
            <a href={this.props.companyInfo.website}>
              {this.props.companyInfo.website}
            </a>
          </p>
        </div>
      );
    }
    return (
      <div>
        <h1>Company Detail</h1>
      </div>
    );
  }
}

export default CompanyDetail;
