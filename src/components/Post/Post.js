import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteScream from './DeleteScream.js';
import EditPost from './EditPost.js';

import VoteButton from '../VoteButton';
//REDUX STUFF
import { connect } from 'react-redux';
//MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//Icons
import ChatIcon from '@material-ui/icons/Chat';

const styles = (theme) => ({
  ...theme.spreadThis,
  card: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
    position: 'relative',
  },
  image: {
    minWidth: 95,
    maxWidth: 150,
    minwidth: '21%',
  },
  footerIcons: {
    marginTop: '5',
    marginBottom: 20,

    top: '69%',
    left: '21%',
    position: 'absolute',
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
});
class Scream extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      post: { text, createdAt, userImage, _id, voteCount, commentCount },
      user: { authenticated, credentials, NoImg },
    } = this.props;

    console.log('post', this.props);
    const userHandle = this.props.post.user
      ? this.props.post.user._id
        ? this.props.post.user._id
        : this.props.post.user
      : 'Anonymous';
    const deleteButton =
      authenticated &&
      (userHandle === credentials._id || credentials.role === 'admin' ? (
        <DeleteScream screamId={_id} />
      ) : null);
    const editButton =
      authenticated &&
      (userHandle === credentials._id || credentials.role === 'admin' ? (
        <EditPost screamId={_id} postContent={text} />
      ) : null);
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          component="img"
          alt="UserImg"
          src={userImage ? userImage : NoImg}
          title="User Image"
        />

        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color={'primary'}
          >
            @{userHandle}
          </Typography>
          {editButton}
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{text}</Typography>
          <hr className={classes.invisibleSeparator} />
          <div className={classes.footerIcons}>
            <VoteButton screamId={_id} />
            <span>{voteCount} Likes</span>
            <MyButton tip="comments">
              <ChatIcon color="primary" />
            </MyButton>
            <span>{commentCount} Comments</span>
          </div>
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Scream));
