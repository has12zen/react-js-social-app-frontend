import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
//REDUX
import { editUserDetails } from '../../redux/actions/userActions';
import { connect } from 'react-redux';
//MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';

//Icons
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => ({
  ...theme.spreadThis,
  ...theme.spreadThis.profile,
  button: {
    float: 'right',
  },
});
class EditDetails extends Component {
  state = {
    bio: '',
    website: '',
    location: '',
    open: false,
  };
  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      location: credentials.location ? credentials.location : '',
      website: credentials.website ? credentials.website : '',
    });
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location,
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };
  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Edit Details"
          onClick={this.handleOpen}
          btnClassname={classes.button}
        >
          <EditIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Edit Your Details
            <DialogContent>
              <form>
                <TextField
                  name="bio"
                  label="Bio"
                  type="text"
                  multiline
                  row="3"
                  placeholder="A short Bio About YourSelf"
                  className={classes.textField}
                  value={this.state.bio}
                  onChange={this.handleChange}
                  fullWidth
                />

                <TextField
                  name="website"
                  label="Website"
                  type="text"
                  placeholder="Your personal/professional website"
                  className={classes.textField}
                  value={this.state.website}
                  onChange={this.handleChange}
                  fullWidth
                />

                <TextField
                  name="location"
                  label="Location"
                  type="text"
                  placeholder="Where You Live"
                  className={classes.textField}
                  value={this.state.location}
                  onChange={this.handleChange}
                  fullWidth
                />
              </form>
            </DialogContent>
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Close
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
EditDetails.prpoTypes = {
  editUserDetails: PropTypes.func.isRequired,
  credentials: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
);
