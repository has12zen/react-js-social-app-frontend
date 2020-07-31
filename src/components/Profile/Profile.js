import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import MyButton from '../../util/MyButton';
import ProfileSkeleton from '../../util/ProfileSkeleton';

//MUI STUFF
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
//MUI ICON
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
//REACT STUFF
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';
const styles = (theme) => ({
  ...theme.spreadThis,
  ...theme.spreadThis.profile,
});

class Profile extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
  };
  handleLogout = () => {
    this.props.logoutUser();
  };
  handleEditPicture = () => {
    // const fileInput = document.getElementById('imageInput');
    // fileInput.click();
  };
  render() {
    const {
      classes,
      user: { credentials, loading, authenticated, NoImg },
    } = this.props;
    const imageUrl = false;
    const bio = '';
    const website = '';
    const location = '';

    let profilMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img
                src={imageUrl ? imageUrl : NoImg}
                alt="Profile"
                className="profile-image"
              />
              <input
                type="file"
                hidden="hidden"
                id="imageInput"
                onChange={this.handleImageChange}
              />
              <MyButton
                tip="Edit Profile Picture"
                onClick={this.handleEditPicture}
                btnClassname="buttons"
                place="top"
              >
                <EditIcon color="primary" />
              </MyButton>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/users/${credentials._id}`}
                color="primary"
                variant="h5"
              >
                @{credentials._id}
              </MuiLink>
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr />
              {location && (
                <Fragment>
                  <LocationOn color="primary" />
                  <span>{location}</span>
                  <hr />
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <LinkIcon />
                  <a href={website} target="blank" rel="noopener noreferer">
                    {' '}
                    {website}
                  </a>
                  <hr />
                </Fragment>
              )}
              <CalendarToday color="primary" />{' '}
              <span>
                Joined {dayjs(credentials.createdAt).format('MMM YYYY')}
              </span>
            </div>
            <MyButton tip="Log Out" onClick={this.handleLogout}>
              <KeyboardReturn color="primary" />
            </MyButton>
            <EditDetails />
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No Profile Found, Please Login Or SignUp
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <ProfileSkeleton />
    );

    return profilMarkup;
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionsToProps = {
  logoutUser,
  uploadImage,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
