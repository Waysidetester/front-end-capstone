import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import iexFactory from '../../../../helpers/Api/iexFactory';
import './RemovedStock.scss';

class RemovedStock extends React.Component {
  static propTypes = {
    fbDetail: PropTypes.shape({
      id: PropTypes.string,
      isRemoved: PropTypes.bool,
      originPrice: PropTypes.number,
      originTimestamp: PropTypes.number,
      quantity: PropTypes.number,
      ticker: PropTypes.string,
      uid: PropTypes.string,
      removePrice: PropTypes.number,
      removeTimestamp: PropTypes.number,
    }),
  }

  state = {
    apiReturn: {},
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

  render() {
    const totalROI = () => this.props.fbDetail.removePrice - this.props.fbDetail.originPrice;
    const percentROI = () => (totalROI() / this.props.fbDetail.originPrice) * 100;
    const localeTimer = () => {
      const originDate = new Date(this.props.fbDetail.removeTimestamp);
      const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      return originDate.toLocaleString('en-US', dateOptions);
    };

    if (this.state.apiReturn) {
      return (
        <div>
          <Card>
            <CardHeader tag="h3">{this.state.apiReturn.companyName}</CardHeader>
            <CardBody>
              <CardTitle>{this.props.fbDetail.ticker}</CardTitle>
              <CardText>Final Position: {totalROI().toFixed(2)}</CardText>
              <CardText>Final Return: {percentROI().toFixed(2)}%</CardText>
              <a
              className='btn btn-secondary'
              href={`portfolio/${this.props.fbDetail.id}`}
              >Detail</a>
            </CardBody>
            <CardFooter className="text-muted">Removed {localeTimer()}</CardFooter>
          </Card>
        </div>
      );
    }
    return (
      <div>error retrieving stock data</div>
    );
  }
}


export default RemovedStock;
