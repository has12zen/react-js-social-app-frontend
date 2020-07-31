import React, { Component } from 'react';

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

//Redux Stuff
import { connect } from 'react-redux';
import { userActivation } from '../redux/actions/userActions';

//MUI
class UserActivation extends Component {
  componentDidMount() {
    this.props.userActivation(
      this.props.match.params.token,
      this.props.history
    );
  }

  render() {
    return (
      <Grid container>
        <Grid item sm />
        <Grid item sm />
      </Grid>
    );
  }
}

UserActivation.protoTypes = {
  classes: PropTypes.object.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  userActivation,
};

export default connect(mapStateToProps, mapActionsToProps)(UserActivation);
