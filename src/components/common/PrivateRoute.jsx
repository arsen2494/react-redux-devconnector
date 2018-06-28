import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

const PrivateRoute = ({path, isAuthenticated, component: Component}) => (
    <Route path={path} render={props => isAuthenticated ? <Component {...props}/> : <Redirect to="/login"/>}/>
);

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);
