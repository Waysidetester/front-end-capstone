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
          <div className='detail-info-container'>
            <p>
              <span className='detail-sub-title'>CEO: </span>
              {this.props.companyInfo.CEO}
            </p>
            <p>
              <span className='detail-sub-title'>Company Info: </span>
              {this.props.companyInfo.description}
            </p>
            <p>
              <span className='detail-sub-title'>Industry: </span>
              {this.props.companyInfo.industry}
            </p>
            <p>
              <span className='detail-sub-title'>Sector: </span>
              {this.props.companyInfo.sector}
            </p>
            <p><span className='detail-sub-title'>Website: </span>
              <a href={this.props.companyInfo.website}>
                {this.props.companyInfo.website}
              </a>
            </p>
          </div>
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
