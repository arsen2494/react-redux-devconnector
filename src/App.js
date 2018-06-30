import React, {Component} from 'react';
import './App.css';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Landing from './components/Layout/Landing';
import {Switch, Route} from "react-router-dom";
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import jwt_decode from "jwt-decode";
import {setAuthToken} from './utils/setAuthToken';
import {setCurrentUser, logout} from './store/actions/auth';
import store from './store';
import Dashboard from "./components/Dashboard/Dashboard";
import {clearCurrentProfile} from "./store/actions/profile";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/CreateProfile/CreateProfile";
import EditProfile from "./components/EditProfile/EditProfile";

const token = localStorage.getItem('jwtToken');
// Check for token
if (token) {
  // Set auth header
  setAuthToken(token);
  // Decode token and get user info
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expire token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logout());
    //  Clear current profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
        <div className="App">
          <Navbar/>
          <Switch>
            <PrivateRoute path="/edit-profile" component={EditProfile}/>
            <PrivateRoute path="/create-profile" component={CreateProfile}/>
            <PrivateRoute path="/dashboard" component={Dashboard}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route exact path="/" component={Landing}/>
          </Switch>
          <Footer/>
        </div>
    );
  }
}

export default App;
