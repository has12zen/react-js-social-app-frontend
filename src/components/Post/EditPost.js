import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
//REDUX
import { connect } from 'react-redux';
import { updatePost } from '../../redux/actions/dataActions';
//MUI STUFF
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
//ICONS
import EditIcon from '@material-ui/icons/Edit';
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
    left: '90%',
    top: '10%',
  },
  editPost: {
    position: 'absolute',
    left: '85%',
    top: '9%',
  },
});
export class EditPost extends Component {
  state = {
    open: false,
    text: '',
    errors: {},
    clientValidateError: false,
  };
  mapPostDetailsToState = (text) => {
    this.setState({
      text: text ? text : '',
    });
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false, errors: {}, text: this.state.text });
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

  handleSubmit = (event) => {
    event.preventDefault();
    const post = {
      text: this.state.text,
    };
    this.props.updatePost(this.props.screamId, post);
    this.handleClose();
  };
  componentDidMount() {
    this.mapPostDetailsToState(this.props.postContent);
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.validateChange(event.target.value, event.target.name);
  };
  render() {
    const { errors, text } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Edit Post"
          onClick={this.handleOpen}
          btnClassname={classes.editPost}
        >
          <EditIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="text"
                label="Edit!!!"
                type="text"
                multiline
                rows="4"
                error={errors.text ? true : false}
                helperText={errors.text ? errors.text.properties.message : null}
                className={classes.textField}
                onChange={this.handleChange}
                value={text}
                fullWidth
              />
              <CircularProgress
                variant="static"
                color={text.trim().length < 156 ? 'primary' : 'secondary'}
                value={(text.trim().length / 156) * 100}
              />
              <MyButton
                tip="Close"
                onClick={this.handleClose}
                btnClassname={classes.closeButton}
              >
                <CloseIcon />
              </MyButton>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
              >
                Submit
                {text && (
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

EditPost.propTypes = {
  updatePost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  postContent: PropTypes.string.isRequired,
};
export default connect(null, { updatePost })(withStyles(styles)(EditPost));
