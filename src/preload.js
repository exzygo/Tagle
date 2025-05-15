// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getPasswords: () => ipcRenderer.invoke('get-passwords'),
  addPassword: (entry) => ipcRenderer.invoke('add-password', entry),
});

