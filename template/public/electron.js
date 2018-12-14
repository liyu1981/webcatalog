// eslint-disable-next-line import/no-extraneous-dependencies
const { app, protocol } = require('electron');
const path = require('path');

const loadListeners = require('./listeners');

const mainWindow = require('./windows/main');
const openEmailLinkWithWindow = require('./windows/open-email-link-with');

const createMenu = require('./libs/create-menu');
const { getWorkspaces } = require('./libs/workspaces');
const { addView } = require('./libs/views');
const { getPreference } = require('./libs/preferences');

const appJson = require('./app.json');

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  protocol.registerStandardSchemes(['mailto']);

  loadListeners();

  const WIDEVINE_PATH = path.join(__dirname, 'plugins', 'WidevineCdm', '_platform_specific', 'mac_x64');
  const WIDEVINE_VERSION = '4.10.1192.0';
  app.commandLine.appendSwitch('widevine-cdm-path', WIDEVINE_PATH);
  app.commandLine.appendSwitch('widevine-cdm-version', WIDEVINE_VERSION);

  app.on('ready', () => {
    global.appJson = appJson;

    global.showSidebar = getPreference('sidebar');

    mainWindow.create();

    createMenu();

    const workspaceObjects = getWorkspaces();

    Object.keys(workspaceObjects).forEach((id) => {
      const workspace = workspaceObjects[id];
      addView(mainWindow.get(), workspace);
    });
  });

  app.on('activate', () => {
    mainWindow.show();
  });

  app.on('open-url', (e, url) => {
    e.preventDefault();

    app.whenReady()
      .then(() => openEmailLinkWithWindow.show(url));
  });
}
