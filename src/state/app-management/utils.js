

import semver from 'semver';

import packageJson from '../../../package.json';

export const isOutdatedApp = (id, state) => {
  const { apps } = state.appManagement;

  const v = apps[id] ? apps[id].version : null;

  if (!v) return true;
  return semver.lt(v, packageJson.templateVersion);
};

export const getOutdatedAppsAsList = (state) => {
  const { apps } = state.appManagement;
  return Object.values(apps).filter(app => isOutdatedApp(app.id, state));
};
