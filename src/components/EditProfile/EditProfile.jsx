import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import {createProfile, getProfile} from "../../store/actions/profile";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {},
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
    const {handle, company, website, location, status, skills, githubusername, bio, twitter, facebook, linkedin, youtube, instagram} = this.state;

    this.props.createProfile({
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram
    }, this.props.history);
  }

  componentDidMount() {
    this.props.getProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      const skillsCSV = profile.skills.join(',');

      profile.company = profile.company ? profile.company : '';
      profile.website = profile.website ? profile.website : '';
      profile.location = profile.location ? profile.location : '';
      profile.githubusername = profile.githubusername ? profile.githubusername : '';
      profile.bio = profile.bio ? profile.bio : '';
      profile.social = profile.social ? profile.social : {};
      profile.twitter = profile.social.twitter ? profile.social.twitter : '';
      profile.facebook = profile.social.facebook ? profile.social.facebook : '';
      profile.linkedin = profile.social.linkedin ? profile.social.linkedin : '';
      profile.youtube = profile.social.youtube ? profile.social.youtube : '';
      profile.instagram = profile.social.instagram ? profile.social.instagram : '';

      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
      });
    }
  }

  render() {
    const {errors, displaySocialInputs} = this.state;
    const options = [
      {label: 'Select Professional Status', value: '0'},
      {label: 'Developer', value: 'Developer'},
      {label: 'Junior Developer', value: 'Junior Developer'},
      {label: 'Senior Developer', value: 'Senior Developer'},
      {label: 'Manager', value: 'Manager'},
      {label: 'Student or Learning', value: 'Student or Learning'},
      {label: 'Instructor or Teacher', value: 'Instructor or Teacher'},
      {label: 'Intern', value: 'Intern'},
      {label: 'Other', value: 'Other'}
    ];
    const socialInputs = displaySocialInputs ? (
        <div>
          <InputGroup name="twitter" icon="fab fa-twitter" value={this.state.twitter} error={errors.twitter}
                      onChange={this.onChange} placeholder="Twitter Profile URL"/>
          <InputGroup name="facebook" icon="fab fa-facebook" value={this.state.facebook} error={errors.facebook}
                      onChange={this.onChange} placeholder="Facebook Profile URL"/>
          <InputGroup name="linkedin" icon="fab fa-linkedin" value={this.state.linkedin} error={errors.linkedin}
                      onChange={this.onChange} placeholder="Linkedin Profile URL"/>
          <InputGroup name="youtube" icon="fab fa-youtube" value={this.state.youtube} error={errors.youtube}
                      onChange={this.onChange} placeholder="Youtube Profile URL"/>
          <InputGroup name="instagram" icon="fab fa-instagram" value={this.state.instagram} error={errors.instagram}
                      onChange={this.onChange} placeholder="Instagram Profile URL"/>
        </div>
    ) : null;

    return (
        <div className="create-profile">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <a href="dashboard.html" className="btn btn-light">
                  Go Back
                </a>
                <h1 className="display-4 text-center">Edit Profile</h1>
                <small className="d-block pb-3">* = required field</small>
                <form onSubmit={this.onSubmit.bind(this)}>
                  <TextFieldGroup name="handle" value={this.state.handle}
                                  info="A unique handle for your profile URL. Your full name, company name nickname"
                                  onChange={this.onChange} placeholder="* Profile Handle"
                                  error={errors.handle}/>
                  <SelectListGroup name="status" value={this.state.status} onChange={this.onChange} options={options}
                                   error={errors.status} info="Give us an idea of where you are at in your career"/>
                  <TextFieldGroup name="company" value={this.state.company}
                                  info="Could be you own company or one you work for"
                                  onChange={this.onChange} placeholder="Company"
                                  error={errors.company}/>
                  <TextFieldGroup name="website" value={this.state.website}
                                  info="Could be you own website or one you work for"
                                  onChange={this.onChange} placeholder="Website"
                                  error={errors.website}/>
                  <TextFieldGroup name="location" value={this.state.location}
                                  info="City or city & state suggested (eg. Boston, MA)"
                                  onChange={this.onChange} placeholder="Location"
                                  error={errors.location}/>
                  <TextFieldGroup name="skills" value={this.state.skills}
                                  info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                                  onChange={this.onChange} placeholder="Skills"
                                  error={errors.skills}/>
                  <TextFieldGroup name="githubusername" value={this.state.githubusername}
                                  info="If you want latest repos and a Github link, include your username"
                                  onChange={this.onChange} placeholder="Github Username"
                                  error={errors.githubusername}/>
                  <TextAreaFieldGroup name="bio" value={this.state.bio} onChange={this.onChange} placeholder="Short Bio"
                                      error={errors.bio} info="Tell us a little about yourself"/>
                  <div className="mb-3">
                    <button className="btn btn-light" type="button"
                            onClick={() => this.setState(prevState => ({displaySocialInputs: !prevState.displaySocialInputs}))}>Add
                      Social network links
                    </button>
                    <span className="text-muted">Optional</span>
                  </div>
                  {socialInputs}
                  <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
                </form>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
});

const mapDispatchToProps = dispatch => ({
  createProfile: (profileData, history) => dispatch(createProfile(profileData, history)),
  getProfile: () => dispatch(getProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);
