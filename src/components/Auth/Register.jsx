import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from "react-redux";
import { register } from "../../store/actions/auth";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class Register extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };
    }

    onChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.value
        });
    }

    onSubmit(ev) {
        ev.preventDefault();
        const { name, email, password, password2 } = this.state;
        const newUser = { name, email, password, password2 };

        this.props.register(newUser, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const { errors } = this.state;
        const { user } = this.props.auth;

        return (
            <div className="register">
                {user ? user.name : null}
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form onSubmit={this.onSubmit.bind(this)}>
                                <div className="form-group">
                                    <input type="text" className={classnames('form-control form-control-lg', { 'is-invalid': errors.name })} placeholder="Name" name="name" value={this.state.name} onChange={this.onChange} />
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </div>
                                <div className="form-group">
                                    <input type="email" className={classnames('form-control form-control-lg', { 'is-invalid': errors.email })} placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange} />
                                    <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>
                                <div className="form-group">
                                    <input type="password" className={classnames('form-control form-control-lg', { 'is-invalid': errors.password })} placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>
                                <div className="form-group">
                                    <input type="password" className={classnames('form-control form-control-lg', { 'is-invalid': errors.password2 })} placeholder="Confirm Password" name="password2" value={this.state.password2} onChange={this.onChange} />
                                    {errors.password2 && <div className="invalid-feedback">{errors.password2}</div>}
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

const mapDispatchToProps = dispatch => ({
    register: (userData, history) => dispatch(register(userData, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));