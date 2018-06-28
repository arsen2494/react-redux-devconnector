import React, {Component} from 'react';
import {connect} from "react-redux";
import {register} from "../../store/actions/auth";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";

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
        const {name, email, password, password2} = this.state;
        const newUser = {name, email, password, password2};

        this.props.register(newUser, this.props.history);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const {errors} = this.state;
        const {user} = this.props.auth;

        return (
            <div className="register">
                {user ? user.name : null}
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form onSubmit={this.onSubmit.bind(this)}>
                                <TextFieldGroup name="name" value={this.state.name} onChange={this.onChange}
                                                placeholder="Name" error={errors.name}/>
                                <TextFieldGroup name="email" type="email" value={this.state.email}
                                                onChange={this.onChange} placeholder="Email Address"
                                                error={errors.email}
                                                info='This site uses Gravatar so if you want a profile image, use a Gravatar email'/>
                                <TextFieldGroup name="password" type="password" value={this.state.password}
                                                onChange={this.onChange} placeholder="Password"
                                                error={errors.password}/>
                                <TextFieldGroup name="password2" type="password" value={this.state.password2}
                                                onChange={this.onChange} placeholder="Confirm Password"
                                                error={errors.password2}/>
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
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