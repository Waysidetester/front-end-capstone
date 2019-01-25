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

    if (this.state.apiReturn) {
      return (
        <div>
          <Card>
            <CardHeader tag="h3">{this.state.apiReturn.companyName}</CardHeader>
            <CardBody>
              <CardTitle>{this.props.fbDetail.ticker}</CardTitle>
              <CardText>Current Position: {totalROI().toFixed(2)}</CardText>
              <CardText>Current Return: {percentROI().toFixed(2)}%</CardText>
              <Button>Detail</Button>
              <Button className='btn-danger'>Remove</Button>
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
