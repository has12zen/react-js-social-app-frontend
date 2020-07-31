import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import AppIcon from '../images/icon.png';
import { validateOnChange } from '../util/passwordValidation';
//MUI stuff
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
//Redux Stuff
import { connect } from 'react-redux';
import { resetPassword } from '../redux/actions/userActions';
const styles = (theme) => ({ ...theme.spreadThis });

//MUI
class Login extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      passwordConfirm: '',
      errors: {},
      loading: false,
      clientValidateError: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, this.props);
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
    const userData = {
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
    };

    this.props.resetPassword(
      userData,
      this.props.match.params.token,
      this.props.history
    );
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    if (
      event.target.name === 'password' ||
      event.target.name === 'passwordConfirm'
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
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt=" Icon" className={classes.image} />
          {
            <Fragment>
              <Typography variant="h5" className={classes.pageTitle}>
                Enter the new password
              </Typography>
              <form noValidate onSubmit={this.handleSubmit}>
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
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  label="Confirm Password"
                  helperText={
                    errors.passwordConfirm
                      ? errors.passwordConfirm.properties.message
                      : null
                  }
                  error={errors.passwordConfirm ? true : false}
                  className={classes.textField}
                  value={this.state.passwordConfirm}
                  onChange={this.handleChange}
                  fullWidth
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  disabled={loading}
                >
                  {loading && (
                    <CircularProgress size={30} className={classes.progress} />
                  )}
                  Submit
                </Button>
              </form>
              <br />
            </Fragment>
          }
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

Login.protoTypes = {
  classes: PropTypes.object.isRequired,
  resetPassword: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  validateOnChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  resetPassword,
  validateOnChange,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Login));
