import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../store/actions/auth";

class Navbar extends Component {
    onLogout(ev) {
        ev.preventDefault();
        this.props.logout();
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a style={{ cursor: 'pointer' }} className="nav-link" onClick={this.onLogout.bind(this)}>
                        <img className="rounded-circle" style={{ width: '25px', marginRight: '5px' }} src={user.avatar} alt={user.name} title="You must have a gravatar connected to your email to display an image" />
                        {' '}
                        Logout
                    </a>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/register">Sign Up</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">DevConnector</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/profiles"> Developers</NavLink>
                            </li>
                        </ul>
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);