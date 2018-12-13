import PropTypes from 'prop-types';
import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import connectComponent from '../../helpers/connect-component';
import isUrl from '../../helpers/is-url';

import extractHostname from '../../helpers/extract-hostname';

import {
  INSTALLED,
  INSTALLING,
  UNINSTALLING,
} from '../../constants/app-statuses';

import {
  requestOpenApp,
  requestInstallApp,
  requestUninstallApp,
} from '../../senders';

import { isOutdatedApp } from '../../state/app-management/utils';

const styles = theme => ({
  card: {
    width: 220,
    boxSizing: 'border-box',
    borderRadius: 4,
    padding: theme.spacing.unit * 1.5,
    textAlign: 'center',
  },
  appName: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    lineHeight: 1,
    marginTop: theme.spacing.unit,
    fontWeight: 500,
  },
  paperIcon: {
    width: 64,
    height: 64,
  },
  actionContainer: {
    marginTop: theme.spacing.unit * 2.5,
  },
  actionButton: {
    minWidth: 'auto',
    boxShadow: 'none',
  },
});

const AppCard = (props) => {
  const {
    classes,
    icon,
    id,
    isOutdated,
    mailtoHandler,
    name,
    status,
    url,
  } = props;

  const renderActionsElement = () => {
    if (status === INSTALLED) {
      return (
        <div>
          {isOutdated ? (
            <Button
              className={classes.actionButton}
              color="primary"
              size="medium"
              onClick={() => requestInstallApp(id, name, url, icon, mailtoHandler)}
            >
              Update
            </Button>
          ) : (
            <Button
              className={classes.actionButton}
              size="medium"
              onClick={() => requestOpenApp(id, name)}
            >
              Open
            </Button>
          )}
          <Button
            className={classes.actionButton}
            color="secondary"
            size="medium"
            onClick={() => requestUninstallApp(id, name)}
          >
            Uninstall
          </Button>
        </div>
      );
    }

    let label = 'Install';
    if (status === INSTALLING) label = 'Installing...';
    else if (status === UNINSTALLING) label = 'Uninstalling...';

    return (
      <Button
        className={classes.actionButton}
        color="primary"
        size="medium"
        disabled={status !== null}
        onClick={() => requestInstallApp(id, name, url, icon, mailtoHandler)}
      >
        <span>{label}</span>
      </Button>
    );
  };

  return (
    <Grid item>
      <Paper elevation={1} className={classes.card}>
        <img
          alt={name}
          className={classes.paperIcon}
          src={isUrl(icon) ? icon : `file://${icon}`}
        />
        <Typography variant="subheading" className={classes.appName}>
          {name}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {extractHostname(url)}
        </Typography>

        <div className={classes.actionContainer}>
          {renderActionsElement()}
        </div>
      </Paper>
    </Grid>
  );
};

AppCard.defaultProps = {
  mailtoHandler: null,
  status: null,
};

AppCard.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isOutdated: PropTypes.bool.isRequired,
  mailtoHandler: PropTypes.string,
  name: PropTypes.string.isRequired,
  status: PropTypes.string,
  url: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  isOutdated: isOutdatedApp(ownProps.id, state),
});

export default connectComponent(
  AppCard,
  mapStateToProps,
  null,
  styles,
);
