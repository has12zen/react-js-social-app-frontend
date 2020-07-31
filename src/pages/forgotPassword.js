import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import AppIcon from '../images/icon.png';
//MUI stuff
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
//Redux Stuff
import { connect } from 'react-redux';
import { forgotPassword } from '../redux/actions/userActions';
const styles = (theme) => ({ ...theme.spreadThis });

//MUI
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      errors: {},
      emailSent: false,
      loading: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, this.props);
    if (
      prevProps.UI.errors !== this.props.UI.errors &&
      !this.props.UI.loading
    ) {
      //Perform some operation here
      this.setState({ errors: this.props.UI.errors, emailSent: false });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
    };
    this.props.forgotPassword(userData, this.props.history);
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const {
      classes,
      UI: { loading, passwordReset },
    } = this.props;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt=" Icon" className={classes.image} />
          {passwordReset ? (
            <Typography variant="h5" className={classes.pageTitle}>
              Email was Sent with password reset key Please Check your Inbox
            </Typography>
          ) : (
            <Fragment>
              <Typography variant="h5" className={classes.pageTitle}>
                Confirm Your mail for verification
              </Typography>
              <form noValidate onSubmit={this.handleSubmit}>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  className={classes.textField}
                  value={this.state.email}
                  onChange={this.handleChange}
                  fullWidth
                />
                {this.state.errors.message && (
                  <Typography variant={'body2'} className={classes.customError}>
                    {this.state.errors.message}
                  </Typography>
                )}
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
              <small>
                dont have an account ? sign up <Link to="/signup">here</Link>
                <br />
                Know your password ? login <Link to="/login">here</Link>
              </small>
            </Fragment>
          )}
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

Login.protoTypes = {
  classes: PropTypes.object.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  forgotPassword,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Login));
