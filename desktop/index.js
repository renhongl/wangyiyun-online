const { app, BrowserWindow, ipcMain } = require('electron');

app.commandLine.appendSwitch ("disable-http-cache");

let win;

ipcMain.on('close', (event, arg) => {
  app.quit();
});

app.on('closed', () => {
  win = null;
});

app.on('ready', function() {
    win = new BrowserWindow({ width: 1000, height: 800, autoHideMenuBar: false, frame: false, webPreferences: {
      nodeIntegration: true,
    } });
    win.loadURL('https://renhongl.github.io/wangyiyun-online/');
    // win.loadURL('http://localhost:4200');
    win.setMenu(null);
});
