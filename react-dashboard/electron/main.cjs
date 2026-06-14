'use strict';

const { app, BrowserWindow, shell, protocol, net } = require('electron');
const path = require('path');
const { pathToFileURL } = require('url');

const DIST_DIR = path.join(__dirname, '../dist');

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true },
  },
]);

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 680,
    backgroundColor: '#030307',    // matches app background, prevents white flash on load
    titleBarStyle: 'hiddenInset',  // native macOS traffic-light buttons, no chrome bar
    trafficLightPosition: { x: 16, y: 20 }, // center within the 56px app header
    webPreferences: {
      nodeIntegration: false,      // keep renderer isolated from Node
      contextIsolation: true,
      sandbox: true,
    },
  });

  win.loadURL('app://dashboard/index.html');

  // Open external links in the system browser, not inside the app
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  // Serve dist/ over a custom scheme — file:// breaks ES module imports due to CORS
  protocol.handle('app', (request) => {
    const requestUrl = new URL(request.url);
    let filePath = decodeURIComponent(requestUrl.pathname);
    if (filePath === '' || filePath === '/') filePath = '/index.html';
    return net.fetch(pathToFileURL(path.join(DIST_DIR, filePath)).toString());
  });

  createWindow();

  // macOS: re-create window when dock icon is clicked and no windows are open
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// macOS: keep the app process alive when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
