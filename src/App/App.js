import React from 'react';
import firebase from 'firebase/app';
import {
  Route,
  BrowserRouter,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from '../components/pages/Home/Home';
import Auth from '../components/pages/Auth/Auth';
import fbMethods from '../helpers/firebase/fbMethods';
import MyNav from '../components/MyNav/MyNav';
import 'firebase/auth';
import './App.scss';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (
    !authed ? (<Component { ...props }/>) : (<Redirect to={{ pathname: '/home', state: { from: props.location } }}/>)
  );
  return <Route {... rest} render={props => routeChecker(props)}/>;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (
    authed ? (<Component { ...props }/>) : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }}/>)
  );
  return <Route {... rest} render={props => routeChecker(props)}/>;
};

class App extends React.Component {
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
      <BrowserRouter>
          <React.Fragment>
            <MyNav authed={this.state.authed}/>
            <div className='container'>
              <div className='row'>
                <Switch>
                  <PublicRoute path='/auth' component={Auth} authed={this.state.authed}/>
                  <PrivateRoute path='/home' component={Home} authed={this.state.authed} />
{/* <PrivateRoute path='/:ticker' exact component={StockDetail} authed={this.state.authed} />
<PrivateRoute path='/saved' exact component={Saved} authed={this.state.authed} />
<PrivateRoute path='/saved/:fbKey' exact component={SavedDetail} authed={this.state.authed} />
<PrivateRoute path='/watching' exact component={Watching} authed={this.state.authed} />
<PrivateRoute path='/watching/:fbKey' exact component={WatchingDetail} authed={this.state.authed} />
<PrivateRoute path='/removed' exact component={Removed} authed={this.state.authed} />
<PrivateRoute path='/removed/:fbKey' exactcomponent={RemovedDetail}authed={this.state.authed} /> */}
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
