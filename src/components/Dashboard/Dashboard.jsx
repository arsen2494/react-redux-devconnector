import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getProfile, deleteAccount} from "../../store/actions/profile";
import Spinner from '../common/Spinner';
import {Link} from "react-router-dom";
import ProfileActions from "./ProfileActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getProfile();
  }

  onDeleteClick(ev) {
    this.props.deleteAccount();
  }

  render() {
    const {user} = this.props.auth;
    const {profile, loading} = this.props.profile;
    let dashboardContent = profile === null || loading ? (
        <Spinner>Loading</Spinner>) : Object.keys(profile).length > 0 ? (
        <div>
          <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
          <ProfileActions/>
          <div style={{marginBottom: '60px'}}>
            <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete My Account</button>
          </div>
        </div>
    ) : (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>You have not yet setup your profile, please add some info.</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
        </div>
    );

    return (
        <div className="dashboard">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4">Dashboard</h1>
                {dashboardContent}
              </div>
            </div>
          </div>
        </div>
    );
  }
}

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(getProfile()),
  deleteAccount: () => dispatch(deleteAccount())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
