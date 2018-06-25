import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Landing from './components/Layout/Landing';
import { Switch, Route } from "react-router-dom";
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import jwt_decode from "jwt-decode";
import { setAuthToken } from './utils/setAuthToken';
import { setCurrentUser } from './store/actions/auth';
import store from './store';

const token = localStorage.getItem('jwtToken');
// Check for token
if (token) {
  // Set auth header
  setAuthToken(token);
  // Decode token and get user info
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route exact path="/" component={Landing} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
