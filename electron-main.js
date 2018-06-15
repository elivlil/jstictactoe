const {app, BrowserWindow} = require('electron')

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 700, frame: false})
  mainWindow.loadFile('index.html')
  mainWindow.on('closed', function () {mainWindow = null})
}
app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {createWindow()}
})