import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import { validateOnChange } from '../../util/passwordValidation';
//REDUX
import { changePassword } from '../../redux/actions/userActions';
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
    passwordCurrent: '',
    password: '',
    passwordConfirm: '',
    errors: {},
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const passDetails = {
      passwordCurrent: this.state.passwordCurrent,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
    };
    console.log('Something Catchy', this.props);
    this.props.changePassword(passDetails, this.props.history);
  };

  handleChange = (event) => {
    console.log('Something Catchy', this.props);
    this.setState({
      [event.target.name]: event.target.value,
    });
    if (
      event.target.name === 'password' ||
      event.target.name === 'confirmPassword'
    ) {
      this.setState(
        this.props.validateOnChange(
          event.target.value,
          event.target.name,
          this.state
        )
      );
    }
  };
  render() {
    const { classes } = this.props;
    const errors = this.state.errors;
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
            Change Your Password
            <DialogContent>
              <form>
                <TextField
                  name="passwordCurrent"
                  label="Current password"
                  type="password"
                  placeholder="Your current Password"
                  className={classes.textField}
                  value={this.state.passwordCurrent}
                  onChange={this.handleChange}
                  fullWidth
                />

                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter new password"
                  className={classes.textField}
                  value={this.state.password}
                  onChange={this.handleChange}
                  fullWidth
                />

                <TextField
                  name="passwordConfirm"
                  label="Confirm password"
                  type="password"
                  placeholder="Confirm New Password"
                  className={classes.textField}
                  value={this.state.passwordConfirm}
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
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
EditDetails.prpoTypes = {
  changePassword: PropTypes.func.isRequired,
  credentials: PropTypes.object.isRequired,
  validateOnChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { changePassword, validateOnChange })(
  withStyles(styles)(EditDetails)
);
