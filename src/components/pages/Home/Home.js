import React from 'react';
import {
  Card,
  CardText,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  Button,
} from 'reactstrap';
import fbMethods from '../../../helpers/firebase/fbMethods';
import iexFactory from '../../../helpers/Api/iexFactory';
import './Home.scss';

class Home extends React.Component {
  state = {
    validStockObj: {},
    validStockKeys: [],
  }

  searchTicker = (e) => {
    e.preventDefault();
    const ticker = document.getElementById('home-ticker').value;
    iexFactory.symbolRequest(ticker)
      .then((symbol) => {
        this.props.history.push(`/stock/${symbol}`);
      })
      .catch((err) => {
        console.error('not a symbol', err);
      });
  }

  render() {
    const checkStateKeys = (e) => {
      console.log(this.state.validStockKeys.filter((x) => {
        if (x.includes(e.target.value.toUpperCase())) {
          return x;
        }
        return null;
      }));
    };

    fbMethods.validTicker()
      .then((data) => {
        this.setState({
          validStockObj: data,
          validStockKeys: Object.keys(data),
        });
      });
    return (
      <Card body className="text-center mt-5">
      <CardTitle>
        <h1>Welcome to Renenutet</h1>
      </CardTitle>
      <CardText>Search for a stock</CardText>
      <InputGroup>
        <Input id='home-ticker' autoComplete='off' onKeyUp={checkStateKeys} />
        <InputGroupAddon addonType="append">
          <InputGroupText>Enter Ticker</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <Button
      className='mt-1'
      id='search-submit'
      onClick={this.searchTicker}
      >Search</Button>
    </Card>
    );
  }
}

export default Home;
