import React, { Fragment } from 'react';
import NoImge from '../images/no-image.png';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

//MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = (theme) => ({
  ...theme.spreadThis,

  card: {
    display: 'flex',
    marginBottom: 20,
  },
  cardContent: {
    width: '100%',
    flexDirection: 'column',
    padding: 25,
  },
  cover: {
    minWidth: 160,
    maxWidth: 170,
    minHeight: 150,
    objectFit: 'cover',
  },

  handle: {
    width: 60,
    marginTop: 2,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    marginBottom: 10,
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginBottom: 13,
  },
  fullLine: {
    height: 15,
    width: '90%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    marginBottom: 11,
  },
  halfLine: {
    height: 15,
    width: '50%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    marginBottom: 10,
  },
});

const ScreamSkeleton = (props) => {
  const { classes } = props;
  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia
        className={classes.cover}
        component="img"
        alt="Loading"
        src={NoImge}
        title="Loader"
      />

      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));
  return <Fragment>{content}</Fragment>;
};

ScreamSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScreamSkeleton);
