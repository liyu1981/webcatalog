import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import ErrorIcon from '@material-ui/icons/Error';
import grey from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  icon: {
    height: 64,
    width: 64,
  },
  tryAgainButton: {
    marginTop: 16,
  },
};

const NoConnection = (props) => {
  const {
    classes,
    onTryAgainButtonClick,
  } = props;

  return (
    <div className={classes.root}>
      <ErrorIcon className={classes.icon} color={grey[400]} />
      <br />
      <Typography
        color="inherit"
        variant="title"
      >
        Failed to Connect to Server
      </Typography>
      <Typography
        align="center"
        color="inherit"
        variant="subheading"
      >
        Please check your Internet connection.
      </Typography>
      <Button
        className={classes.tryAgainButton}
        color="primary"
        onClick={onTryAgainButtonClick}
      >
        Try Again
      </Button>
    </div>
  );
};

NoConnection.propTypes = {
  classes: PropTypes.object.isRequired,
  onTryAgainButtonClick: PropTypes.func.isRequired,
};

export default withStyles(styles, { name: 'NoConnection' })(NoConnection);
