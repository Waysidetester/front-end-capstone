import React, { Component } from 'react';
import MyNav from '../components/MyNav/MyNav';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyNav />
        <p>hello</p>
      </div>
    );
  }
}

export default App;
