'use strict';

const { app, BrowserWindow, shell, protocol, net, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const { pathToFileURL } = require('url');

const DIST_DIR = path.join(__dirname, '../dist');

let mainWindow = null;

function broadcastUpdateStatus(status) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('updater:status', status);
  }
}

function setupAutoUpdater() {
  autoUpdater.autoDownload = false;

  autoUpdater.on('checking-for-update', () => broadcastUpdateStatus({ state: 'checking' }));
  autoUpdater.on('update-available', (info) =>
    broadcastUpdateStatus({ state: 'available', version: info.version })
  );
  autoUpdater.on('update-not-available', () => broadcastUpdateStatus({ state: 'not-available' }));
  autoUpdater.on('error', (err) =>
    broadcastUpdateStatus({ state: 'error', message: err?.message ?? String(err) })
  );
  autoUpdater.on('download-progress', (progress) =>
    broadcastUpdateStatus({ state: 'downloading', percent: progress.percent })
  );
  autoUpdater.on('update-downloaded', (info) =>
    broadcastUpdateStatus({ state: 'downloaded', version: info.version })
  );

  // Trigger download once an update is confirmed available
  autoUpdater.on('update-available', () => {
    autoUpdater.downloadUpdate().catch((err) =>
      broadcastUpdateStatus({ state: 'error', message: err?.message ?? String(err) })
    );
  });

  ipcMain.handle('updater:get-version', () => app.getVersion());
  ipcMain.handle('updater:check', async () => {
    try {
      await autoUpdater.checkForUpdates();
    } catch (err) {
      broadcastUpdateStatus({ state: 'error', message: err?.message ?? String(err) });
    }
  });
  ipcMain.handle('updater:install', () => {
    autoUpdater.quitAndInstall();
  });
}

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
      preload: path.join(__dirname, 'preload.cjs'),
    },
  });

  win.loadURL('app://dashboard/index.html');

  // Open external links in the system browser, not inside the app
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow = win;
  win.on('closed', () => {
    if (mainWindow === win) mainWindow = null;
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

  setupAutoUpdater();
  createWindow();

  // Check for updates shortly after launch, then periodically
  setTimeout(() => autoUpdater.checkForUpdates().catch(() => {}), 3000);
  setInterval(() => autoUpdater.checkForUpdates().catch(() => {}), 1000 * 60 * 60 * 4);

  // macOS: re-create window when dock icon is clicked and no windows are open
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// macOS: keep the app process alive when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
