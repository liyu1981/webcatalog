const { BrowserView, session } = require('electron');
const path = require('path');

const appJson = require('../app.json');

const views = {};

const addView = (browserWindow, workspace) => {
  const view = new BrowserView({
    webPreferences: {
      nodeIntegration: false,
      partition: `persist:${workspace.id}`,
      preload: path.join(__dirname, '..', 'preload', 'view.js'),
    },
  });

  if (workspace.active) {
    browserWindow.setBrowserView(view);

    const contentSize = browserWindow.getContentSize();
    view.setBounds({
      x: 68,
      y: 0,
      width: contentSize[0] - 68,
      height: contentSize[1],
    });
    view.setAutoResize({
      width: true,
      height: true,
    });
  }

  view.webContents.loadURL(workspace.home || appJson.url);

  views[workspace.id] = view;
};

const setActiveView = (browserWindow, id) => {
  const view = views[id];
  browserWindow.setBrowserView(view);

  const contentSize = browserWindow.getContentSize();
  view.setBounds({
    x: 68,
    y: 0,
    width: contentSize[0] - 68,
    height: contentSize[1],
  });
  view.setAutoResize({
    width: true,
    height: true,
  });
};

const removeView = (id) => {
  const view = views[id];
  session.fromPartition(`persist:${id}`).clearStorageData();
  view.destroy();
};

module.exports = {
  addView,
  setActiveView,
  removeView,
};
