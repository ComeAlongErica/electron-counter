const electron = require('electron')
const countdown = require('./countdown.js')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain

let mainWindow

app.on('ready', _ => {
  mainWindow = new BrowserWindow({
    height: 400,
    width: 400
  })

  mainWindow.loadURL(`file://${__dirname}/countdown.html`)

  // null out on close for garbage collection
  mainWindow.on('closed', _ => {
    console.log('closed')
    mainWindow = null
  })
})

ipc.on('countdown-start', _ => {
  countdown(count => {
    console.log(count)
    mainWindow.webContents.send('countdown', count)
  })
})