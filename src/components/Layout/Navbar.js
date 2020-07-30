import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import PostScream from '../Post/PostScream';
//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
//Icons
import HomeIcon from '@material-ui/icons/Home';

class Navbar extends Component {
  state = {
    path: this.props.path,
  };
  onPathChange = (currentPath) => {
    console.log('navbar', currentPath);
    this.setState({ path: currentPath });
  };
  render() {
    const { authenticated } = this.props;
    var { path } = this.state;
    console.log('Navbar', path);
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              <PostScream />
              <Link to="/">
                <MyButton tip="Home" onClick={() => this.onPathChange('/')}>
                  <HomeIcon color="primary" />
                </MyButton>
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <Button
                color={'inherit'}
                component={Link}
                to="/login"
                name="/login"
                onClick={() => this.onPathChange('/login')}
              >
                Login
              </Button>
              <Button
                color={'inherit'}
                component={Link}
                to="/"
                name="/"
                onClick={() => this.onPathChange('/')}
              >
                Home
              </Button>

              {path === '/' ? <PostScream /> : null}
              <Button
                color={'inherit'}
                component={Link}
                to="/signup"
                name="/signup"
                onClick={() => this.onPathChange('/signup')}
              >
                SignUp
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.protoTypes = {
  authenticated: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  path: state.data.path,
});

export default connect(mapStateToProps)(Navbar);
