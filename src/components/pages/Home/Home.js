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
import iexFactory from '../../../helpers/Api/iexFactory';
import './Home.scss';

class Home extends React.Component {
  searchTicker = (e) => {
    e.preventDefault();
    const ticker = document.getElementById('home-ticker').value;
    iexFactory.bookRequest(ticker);
  }

  render() {
    return (
      <Card body className="text-center mt-5">
      <CardTitle>
        <h1>Welcome to Renenutet</h1>
      </CardTitle>
      <CardText>Search for a stock</CardText>
      <InputGroup>
        <Input id='home-ticker'/>
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
