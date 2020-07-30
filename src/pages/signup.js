import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import AppIcon from '../images/icon.png';

//MUI STUFF
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
//REDUX STUFF
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';
const styles = (theme) => ({ ...theme.spreadThis });

//MUI
class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
      loading: false,
      errors: {},
      clientValidateError: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, prevState);
    if (
      prevProps.UI.errors !== this.props.UI.errors &&
      !this.props.UI.loading
    ) {
      //Perform some operation here
      this.setState({ errors: this.props.UI.errors });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.confirmPassword,
      userHandle: this.state.handle,
    };
    this.props.signupUser(newUserData, this.props.history);
  };
  validateOnChange = (newValue, key) => {
    if (key === 'password') {
      if (newValue.length < 8) {
        this.setState({
          errors: {
            ...this.state.errors,
            password: { properties: { message: 'Password too short' } },
          },
          clientValidateError: true,
        });
      } else if (this.state.errors.confirmPassword === undefined) {
        this.setState({
          errors: { ...this.state.errors, password: undefined },
          clientValidateError: false,
        });
      } else {
        this.setState({
          errors: { ...this.state.errors, password: undefined },
        });
      }
    } else if (key === 'confirmPassword') {
      if (newValue !== this.state.password) {
        this.setState({
          errors: {
            ...this.state.errors,
            passwordConfirm: {
              properties: { message: 'Passwords do not match' },
            },
          },
          clientValidateError: true,
        });
      } else if (this.state.errors.password === undefined) {
        this.setState({
          errors: { ...this.state.errors, passwordConfirm: undefined },
          clientValidateError: false,
        });
      } else {
        this.setState({
          errors: { ...this.state.errors, passwordConfirm: undefined },
        });
      }
    }
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    if (
      event.target.name === 'password' ||
      event.target.name === 'confirmPassword'
    ) {
      this.validateOnChange(event.target.value, event.target.name);
    }
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="Icon" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              helperText={errors.email ? errors.email.properties.email : null}
              error={errors.email ? true : false}
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              helperText={
                errors.password ? errors.password.properties.message : null
              }
              error={errors.password ? true : false}
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              helperText={
                errors.passwordConfirm
                  ? errors.passwordConfirm.properties.message
                  : null
              }
              error={errors.passwordConfirm ? true : false}
              className={classes.textField}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="handle"
              name="handle"
              type="text"
              label="Handle"
              helperText={errors.handle}
              error={errors.handle ? true : false}
              className={classes.textField}
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant={'body2'} className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading || this.state.clientValidateError}
            >
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
              Signup
            </Button>
            <br />
            <small>
              Already have an account ? login <Link to="/login">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

Signup.protoTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(Signup)
);
