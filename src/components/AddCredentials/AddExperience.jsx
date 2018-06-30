import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import {addExperience} from "../../store/actions/profile";

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      title: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false
    };
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(ev) {
    ev.preventDefault();

    const {company, title, location, from, to, current, description} = this.state;
    const expData = {company, title, location, from, to, current, description};
    this.props.addExperience(expData, this.props.history);
  }

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  }

  onCheck() {
    this.setState(prevState => ({
      disabled: !prevState.disabled,
      current: !prevState.current
    }));
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

    return (
        <div className="add-experience">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <Link to="/dashboard" className="btn btn-light">Go Back</Link>
                <h1 className="display-4 text-center">Add Experience</h1>
                <p className="text-center lead">Add any job or position that you have had in the past or current.</p>
                <small className="display-block pb-3">* = required fields</small>
                <form onSubmit={this.onSubmit.bind(this)}>
                  <TextFieldGroup name="company" value={this.state.company} onChange={this.onChange}
                                  placeholder="* Company" error={errors.company}/>
                  <TextFieldGroup name="title" value={this.state.title} onChange={this.onChange}
                                  placeholder="* Job Title" error={errors.title}/>
                  <TextFieldGroup name="location" value={this.state.location} onChange={this.onChange}
                                  placeholder="Location" error={errors.location}/>
                  <h6>From Date</h6>
                  <TextFieldGroup name="from" type="date" value={this.state.from} onChange={this.onChange}
                                  error={errors.from}/>
                  <h6>To Date</h6>
                  <TextFieldGroup name="to" type="date" value={this.state.to} onChange={this.onChange} error={errors.to}
                                  disabled={this.state.disabled ? 'disabled' : ''}/>
                  <div className="form-check mb-4">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="current"
                        value={this.state.current}
                        checked={this.state.current}
                        onChange={this.onCheck.bind(this)}
                        id="current"
                    />
                    <label htmlFor="current" className="form-check-label">Current Job</label>
                  </div>
                  <TextAreaFieldGroup name="description" placeholder="Job Description" value={this.state.description}
                                      onChange={this.onChange} error={errors.description}
                                      info="Tell us about the position"/>
                  <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
                </form>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
const mapDispatchToProps = dispatch => ({
  addExperience: (expData, history) => dispatch(addExperience(expData, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddExperience);
