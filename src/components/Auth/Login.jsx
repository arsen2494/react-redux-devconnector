import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { login } from "../../store/actions/auth";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.value
        });
    }

    onSubmit(ev) {
        ev.preventDefault();
        const { email, password } = this.state;
        const newUser = { email, password };

        this.props.login(newUser);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your DevConnector account</p>
                            <form onSubmit={this.onSubmit.bind(this)}>
                                <TextFieldGroup name="email" value={this.state.email} type="email"
                                                onChange={this.onChange} placeholder="Email Address"
                                                error={errors.email}/>
                                <TextFieldGroup name="password" value={this.state.password} type="password" onChange={this.onChange} placeholder="Password" error={errors.password}/>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

const mapDispatchToProps = dispatch => ({
    login: userData => dispatch(login(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);