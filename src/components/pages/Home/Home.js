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
import './Home.scss';

class Home extends React.Component {
  render() {
    return (
      <Card body className="text-center mt-5">
      <CardTitle>
        <h1>Welcome to Renenutet</h1>
      </CardTitle>
      <CardText>Search for a stock</CardText>
      <InputGroup>
        <Input />
        <InputGroupAddon addonType="append">
          <InputGroupText>Enter Ticker</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <Button className='mt-1' id='search-submit'>Search</Button>
    </Card>
    );
  }
}

export default Home;
