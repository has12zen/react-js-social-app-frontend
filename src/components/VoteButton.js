import React, { Component, Fragment } from 'react';
import MyButton from '../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//REDUX STUFF
import { connect } from 'react-redux';
import { upVote, downVote } from '../redux/actions/dataActions';
//ICONS
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

export class VoteButton extends Component {
  checkVotes = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.post === this.props.screamId)
    ) {
      console.log('h1i');
      return true;
    } else return false;
  };
  checkDirection = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.post === this.props.screamId && like.vote === 'up'
      )
    ) {
      console.log('hi');
      return 'up';
    } else {
      console.log('hi');
      return 'down';
    }
  };

  upVoteScream = () => {
    console.log('Upvote', this.props);
    this.props.upVote(this.props.screamId);
  };
  downVoteScream = () => {
    console.log('Downvote', this.props);
    this.props.downVote(this.props.screamId);
  };
  render() {
    const {
      user: { authenticated },
    } = this.props;
    console.log(
      'vote',
      this.props.user.likes &&
        this.props.user.likes.find(
          (like) => like.post === this.props.screamId && like.vote === 'up'
        )
    );
    const likebutton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Up">
          <ThumbUpAltOutlinedIcon color="primary" />
        </MyButton>
        <MyButton tip="Down">
          <ThumbDownAltOutlinedIcon color="primary" />
        </MyButton>
      </Link>
    ) : this.checkVotes() ? (
      this.checkDirection() === 'up' ? (
        <Fragment>
          <MyButton tip="UpVoted">
            <ThumbUpAltIcon color="primary" />
          </MyButton>
          <MyButton tip="DownVote" onClick={this.downVoteScream}>
            <ThumbDownAltOutlinedIcon color="primary" />
          </MyButton>
        </Fragment>
      ) : (
        <Fragment>
          <MyButton tip="UpVote" onClick={this.upVoteScream}>
            <ThumbUpAltOutlinedIcon color="primary" />
          </MyButton>
          <MyButton tip="DownVoted">
            <ThumbDownIcon color="primary" />
          </MyButton>
        </Fragment>
      )
    ) : (
      <Fragment>
        <MyButton tip="Up" onClick={this.upVoteScream}>
          <ThumbUpAltOutlinedIcon color="primary" />
        </MyButton>
        <MyButton tip="Down" onClick={this.downVoteScream}>
          <ThumbDownAltOutlinedIcon color="primary" />
        </MyButton>
      </Fragment>
    );
    return likebutton;
  }
}
VoteButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  upVote,
  downVote,
};

export default connect(mapStateToProps, mapActionsToProps)(VoteButton);
