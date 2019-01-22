import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import fbMethods from '../helpers/firebase/fbMethods';
import MyNav from '../components/MyNav/MyNav';
import './App.scss';

class App extends Component {
  state = {
    authed: false,
    pendingUser: true,
  }

  componentDidMount() {
    // this initiates the firebase application/methods
    fbMethods.initFirebase();
    // this checks the users login on page load and sets the state as such
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true, pendingUser: false });
      } else {
        this.setState({ authed: false, pendingUser: false });
      }
    });
  }

  componentWillUnmount() {
    // this removes the login checker when the component unmounts
    this.removeListener();
  }

  render() {
    if (this.state.pendingUser) {
      return null;
    }

    return (
      <div className="App">
        <MyNav authed={this.state.authed}/>
        <p>hello</p>
      </div>
    );
  }
}

export default App;
