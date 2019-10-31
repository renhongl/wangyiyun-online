const { app, BrowserWindow } = require('electron');

app.commandLine.appendSwitch ("disable-http-cache");

let win;

app.on('closed', () => {
  win = null
});

app.on('ready', function() {
    win = new BrowserWindow({ width: 1000, height: 800, autoHideMenuBar: false, frame: false });
    win.loadURL('https://renhongl.github.io/wangyiyun-online/');
    win.setMenu(null);
});
