const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const { loadData, saveData } = require('./storage');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, 'index.html'));
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

ipcMain.handle('get-passwords', () => {
  return loadData();
});

ipcMain.handle('add-password', (event, newEntry) => {
  saveData(newEntry);
});
