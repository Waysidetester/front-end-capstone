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
  ListGroup,
} from 'reactstrap';
import SuggestedTicker from '../../SuggestedTicker/SuggestedTicker';
import fbMethods from '../../../helpers/firebase/fbMethods';
import iexFactory from '../../../helpers/Api/iexFactory';
import './Home.scss';

class Home extends React.Component {
  state = {
    validStockObj: {},
    validStockKeys: [],
    searchedStock: [],
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
    // on keyUp in search input execute this function
    const checkStateKeys = (e) => {
      const searchedTicker = [];
      this.state.validStockKeys.filter((x) => {
        if (x.includes(e.target.value.toUpperCase())) {
          searchedTicker.push(x);
        }
        return null;
      });
      this.setState({
        searchedStock: searchedTicker,
      });
      if (e.keyCode === 13) {
        this.searchTicker(e);
      }
    };

    // build auto-search suggestions
    const populateSuggestions = this.state.searchedStock.map(
      symbol => <SuggestedTicker
        key={symbol}
        symbol={symbol}
        compName={this.state.validStockObj[symbol].name}
        />,
    );

    /* get valid tickers from database for later retreival
       and create array of all tickers */
    fbMethods.validTicker()
      .then((data) => {
        this.setState({
          validStockObj: data,
          validStockKeys: Object.keys(data),
        });
      });

    return (
      <Card body className="text-center home-card">
      <CardTitle>
        <h1>Welcome to Renenutet</h1>
      </CardTitle>
      <CardText>Search for a stock</CardText>
      <InputGroup>
        <InputGroupAddon addonType="append">
          <InputGroupText>Enter Ticker</InputGroupText>
        </InputGroupAddon>
        <Input id='home-ticker' autoComplete='off' onKeyUp={checkStateKeys} />
        <InputGroupAddon addonType="append">
          <Button
          id='search-submit'
          onClick={this.searchTicker}
          >Search</Button>
        </InputGroupAddon>
      </InputGroup>
      <ListGroup className='suggested-list'>
        {populateSuggestions}
      </ListGroup>
    </Card>
    );
  }
}

export default Home;
