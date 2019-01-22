import React from 'react';
import {
  Card,
  CardText,
  CardTitle,
  Button,
} from 'reactstrap';
import fbMethods from '../../../helpers/firebase/fbMethods';
import './Auth.scss';

class Auth extends React.Component {
  render() {
    return (
        <Card body className="text-center">
          <CardTitle>
            <h1>Welcome to Renenutet</h1>
          </CardTitle>
          <CardText>Join the fun!</CardText>
          <Button onClick={fbMethods.googleLogin}>Log in with Google</Button>
        </Card>
    );
  }
}

export default Auth;
