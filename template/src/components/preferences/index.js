import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import connectComponent from '../../helpers/connect-component';

import {
  requestResetPreferences,
  requestClearBrowsingData,
} from '../../senders';

const { remote } = window.require('electron');

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    background: theme.palette.background.default,
  },
  sectionTitle: {
    paddingLeft: theme.spacing.unit * 2,
  },
  paper: {
    marginTop: theme.spacing.unit * 0.5,
    marginBottom: theme.spacing.unit * 3,
  },
});

const appJson = remote.getGlobal('appJson');

const Preferences = ({ classes }) => (
  <div className={classes.root}>
    <Typography variant="subtitle2" className={classes.sectionTitle}>
      General
    </Typography>
    <Paper className={classes.paper}>
      <List dense>
        <ListItem button>
          <ListItemText primary="Appearance" secondary="Automatic" />
          <ChevronRightIcon color="action" />
        </ListItem>
      </List>
    </Paper>

    <Typography variant="subtitle2" className={classes.sectionTitle}>
      Privacy and Security
    </Typography>
    <Paper className={classes.paper}>
      <List dense>
        <ListItem button onClick={requestClearBrowsingData}>
          <ListItemText primary="Clear browsing data" secondary="Clear cookies, cache, and more" />
          <ChevronRightIcon color="action" />
        </ListItem>
      </List>
    </Paper>

    {appJson.mailtoHandler && appJson.mailtoHandler.length > 0 && (
      <React.Fragment>
        <Typography variant="subtitle2" className={classes.sectionTitle}>
          Default mail client
        </Typography>
        <Paper className={classes.paper}>
          <List dense>
            <ListItem>
              <ListItemText primary="Default mail client" secondary={`Make ${appJson.name} the default email client.`} />
              <Button variant="outlined" size="small" color="default" className={classes.button}>
                Make default
              </Button>
            </ListItem>
          </List>
        </Paper>
      </React.Fragment>
    )}

    <Typography variant="subtitle2" className={classes.sectionTitle}>
      Reset Settings
    </Typography>
    <Paper className={classes.paper}>
      <List dense>
        <ListItem button onClick={requestResetPreferences}>
          <ListItemText primary="Restore preferences to their original defaults" />
          <ChevronRightIcon color="action" />
        </ListItem>
      </List>
    </Paper>
  </div>
);

Preferences.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connectComponent(
  Preferences,
  null,
  null,
  styles,
);
