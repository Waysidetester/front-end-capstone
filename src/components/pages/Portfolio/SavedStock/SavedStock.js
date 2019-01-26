import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Button,
  CardFooter,
} from 'reactstrap';
import iexFactory from '../../../../helpers/Api/iexFactory';
import fbMethods from '../../../../helpers/firebase/fbMethods';
import './SavedStock.scss';

class SavedStock extends React.Component {
  static propTypes = {
    fbDetail: PropTypes.shape({
      id: PropTypes.string,
      isRemoved: PropTypes.bool,
      originPrice: PropTypes.number,
      originTimestamp: PropTypes.number,
      quantity: PropTypes.number,
      ticker: PropTypes.string,
      uid: PropTypes.string,
    }),
  }

  state = {
    apiReturn: {},
    isRemoved: false,
  }

  componentDidMount() {
    iexFactory.savedStockInfo(this.props.fbDetail.ticker)
      .then((data) => {
        this.setState({
          apiReturn: data,
        });
      })
      .catch((err) => {
        console.error('error with SavedStock API return', err);
      });
  }

  removeStatus() {
    console.log(this.props);
    const savedKey = this.props.fbDetail.id;
    const removeObj = this.props.fbDetail;
    removeObj.isRemoved = true;
    removeObj.removeTimestamp = Date.now();
    removeObj.removePrice = this.state.apiReturn.latestPrice;
    fbMethods.removeSecurity(savedKey, removeObj);
  }

  render() {
    // must be in render to ensure props is defined
    const removeStatus = () => {
      const savedKey = this.props.fbDetail.id;
      const removeObj = this.props.fbDetail;
      removeObj.isRemoved = true;
      removeObj.removeTimestamp = Date.now();
      removeObj.removePrice = this.state.apiReturn.latestPrice;
      fbMethods.removeSecurity(savedKey, removeObj)
        .then(() => {
          this.setState({
            isRemoved: true,
          });
        });
    };

    const totalROI = () => this.state.apiReturn.latestPrice - this.props.fbDetail.originPrice;
    const percentROI = () => (totalROI() / this.props.fbDetail.originPrice) * 100;
    const localeTimer = () => {
      const originDate = new Date(this.props.fbDetail.originTimestamp);
      const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      return originDate.toLocaleString('en-US', dateOptions);
    };

    if (this.state.isRemoved) {
      return (
        <div>
          <Card>
            <CardHeader tag="h3">{this.state.apiReturn.companyName}</CardHeader>
            <CardBody>
              <CardTitle>Successfully Removed</CardTitle>
            </CardBody>
          </Card>
        </div>
      );
    }

    if (this.state.apiReturn) {
      return (
        <div>
          <Card>
            <CardHeader tag="h3">{this.state.apiReturn.companyName}</CardHeader>
            <CardBody>
              <CardTitle>{this.props.fbDetail.ticker}</CardTitle>
              <CardText>Current Position: {totalROI().toFixed(2)}</CardText>
              <CardText>Current Return: {percentROI().toFixed(2)}%</CardText>
              <a
              className='btn btn-secondary'
              href={`portfolio/${this.props.fbDetail.id}`}
              >Detail</a>
              <Button
              className='btn-danger'
              onClick={removeStatus}
              >Remove</Button>
            </CardBody>
            <CardFooter className="text-muted">Aquired {localeTimer()}</CardFooter>
          </Card>
        </div>
      );
    }
    return (
      <div>error retrieving stock data</div>
    );
  }
}

export default SavedStock;
