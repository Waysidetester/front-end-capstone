import React from 'react';
import { Toast, ToastHeader, ToastBody } from 'reactstrap';

class Warning extends React.Component {
  render() {
    return (
      <div className="p-3 bg-danger rounded container project-warning">
        <Toast className="warning-container">
          <ToastHeader>
            WARNING
          </ToastHeader>
          <ToastBody>
            The original project utilized a free API to get stock
            market data. The original endpoints were depreciated, and
            the new endpoints are limited by call. To ensure this example
            project still displays information in a similar manner as
            before, we are utilizing the test endpoints of the API. The
            test enpoints <span className="highlight">DO NOT RETURN TRUE MARKET DATA</span>
             . Due to this issue, do not rely on this website to
            manage your market decisions. This new API also gives less financial/company data.
          </ToastBody>
        </Toast>
      </div>
    );
  }
}

export default Warning;
