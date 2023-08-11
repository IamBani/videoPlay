import path from 'path'
import os from 'os'
import fs from 'fs'
import { app, protocol, BrowserWindow, session, ipcMain, dialog, Menu } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import { FileTypeResult, fromFile } from 'file-type'

import Store from 'electron-store'
import { IUserState } from './store'
import http from './serve'

const isDevelopment = process.env.NODE_ENV !== 'production'

const store = new Store()

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
])
let win: BrowserWindow
async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // eslint-disable-next-line max-len
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION as unknown as boolean,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
    },
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
  http()
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      const reactDevToolsPath = path.join(
        os.homedir(),
        '/AppData/Local/google/Chrome/User Data/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/6.5.0_0',
      )
      await session.defaultSession.loadExtension(reactDevToolsPath)
    } catch (error) {
      console.error('Vue Devtools failed to install:', error)
    }
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e: any) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.handle('open', async () => {
  const res = dialog.showOpenDialogSync({
    title: '请选择文件',
    filters: [
      {
        name: 'Movies',
        extensions: ['MP4', 'RMVB', 'MKV', 'AVI'],
      },
    ],
    properties: ['multiSelections'],
  })
  const result = []
  if (res) {
    for await (const item of res) {
      const name = path.basename(item)
      const { size } = fs.statSync(item)
      const { mime } = (await fromFile(item)) as FileTypeResult
      result.push({
        path: item,
        name,
        size,
        type: mime,
        currentTime: 0,
      })
    }
  }
  return result
})

ipcMain.on('minimize', () => {
  win.minimize()
})

ipcMain.on('maximize', () => {
  const falg = win.isFullScreen()
  win.setFullScreen(!falg)
})

ipcMain.on('close', () => {
  app.quit()
})

ipcMain.handle('getState', (event, key: string) => store.get(key))

ipcMain.on('setState', (event, key: string, value: IUserState) => {
  store.set(key, value)
})

ipcMain.on('contextmenu', (event) => {
  const menu = Menu.buildFromTemplate([
    {
      label: '播放',
      click: () => {
        event.sender.send('context-menu-command', 1)
      },
    },
    {
      label: '删除',
      click: () => {
        event.sender.send('context-menu-command', 2)
      },
    },
    {
      label: '删除全部列表',
      click: () => {
        event.sender.send('context-menu-command', 3)
      },
    },
  ])
  menu.popup()
})
