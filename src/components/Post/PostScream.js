import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
//REDUX
import { connect } from 'react-redux';
import { postScream, clearErrors } from '../../redux/actions/dataActions';
//MUI STUFF
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
//ICONS
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
  ...theme.spreadThis,
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10,
    marginBottom: 5,
  },
  progressSpinner: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    left: '92%',
    top: '6%',
  },
});

class PostScream extends Component {
  state = {
    open: false,
    text: '',
    errors: {},
    clientValidateError: false,
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, this.props);
    if (prevProps.UI.errors !== this.props.UI.errors) {
      //Perform some operation here
      if (this.props.UI.errors !== null) {
        this.setState({ errors: this.props.UI.errors });
      } else if (
        this.props.UI.errors === null ||
        this.props.UI.errors === undefined
      ) {
        this.setState({ errors: {} });
      }
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  handleSubmitPost = (event) => {
    event.preventDefault();
    this.props.postScream({ text: this.state.text });
    this.handleClose();
  };
  validateChange = (newValue, key) => {
    if (newValue.trim().length <= 10) {
      this.setState({
        errors: { text: { properties: { message: 'Post too short' } } },
        clientValidateError: true,
      });
    } else if (newValue.trim().length >= 156) {
      this.setState({
        errors: { text: { properties: { message: 'Post too long' } } },
        text: newValue.trim().slice(0, 156),
        clientValidateError: true,
      });
    } else {
      this.setState({
        errors: {},
        clientValidateError: false,
      });
    }
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    this.validateChange(event.target.value, event.target.name);
  };
  render() {
    const { errors, text } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    console.log(this.props);
    return (
      <Fragment>
        <MyButton tip="Post SomeThing" onClick={this.handleOpen}>
          <AddIcon />
        </MyButton>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            btnClassname={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post Something new...</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmitPost}>
              <TextField
                name="text"
                label="Post!!!"
                type="text"
                multiline
                rows="3"
                placeholder="What's on Your Mind"
                error={errors.text ? true : false}
                helperText={errors.text ? errors.text.properties.message : null}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <CircularProgress
                variant="static"
                color={text.trim().length < 156 ? 'primary' : 'secondary'}
                value={(text.trim().length / 156) * 100}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading || this.state.clientValidateError}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postScream, clearErrors })(
  withStyles(styles)(PostScream)
);
