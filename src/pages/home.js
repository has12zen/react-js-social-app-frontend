import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Profile from '../components/Profile/Profile';
import Scream from '../components/Post/Post';
import ScreamSkeleton from '../util/ScreamSkeleton';

//Redux
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';
import Grid from '@material-ui/core/Grid';
class home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const { screams, loading } = this.props.data;
    const recentScreamMarkup = loading ? (
      <ScreamSkeleton />
    ) : screams === null ? (
      <p>Please Try Refreshing</p>
    ) : (
      screams.map((post) => <Scream key={post._id} post={post} />)
    );
    return (
      <div>
        <h1>HOME</h1>
        <Grid container spacing={8}>
          <Grid item sm={8} xs={12}>
            {recentScreamMarkup}
          </Grid>
          <Grid item sm={4} xs={12}>
            <Profile />
          </Grid>
        </Grid>
      </div>
    );
  }
}

home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getScreams })(home);
