import { contextBridge, ipcRenderer } from 'electron'
import ffmpeg from 'fluent-ffmpeg'
import { IUserState } from './store'

export interface file {
  name: string
  path: string
  size: number
  duration: string
  poster: string
  type: string
  currentTime: number
}
type back = (event: Electron.IpcRendererEvent, ...args: any[]) => void

export interface Api {
  sendMsg: () => Promise<file[] | undefined>
  sendMinimize: () => void
  sendMaximize: () => void
  sendGetState: (key: string) => Promise<IUserState | undefined>
  sendSetState: (key: string, value: IUserState) => void
  handleContextmenu: () => void
  handleMenu: (callback: back) => Electron.IpcRenderer
  handleClose: () => void
  handleTransform: (key: string) => Promise<ffmpeg.FfmpegCommand | Buffer>
}
contextBridge.exposeInMainWorld('myApi', {
  // 这里注意避免将ipcRenderer等致命api直接挂载在window上，可能会导致安全问题
  sendMsg: () => ipcRenderer.invoke('open'),
  sendMinimize: () => ipcRenderer.send('minimize'),
  sendMaximize: () => ipcRenderer.send('maximize'),
  sendGetState: (key) => ipcRenderer.invoke('getState', key),
  sendSetState: (key, value) => ipcRenderer.send('setState', key, value),
  handleContextmenu: () => ipcRenderer.send('contextmenu'),
  handleMenu: (callback) => ipcRenderer.on('context-menu-command', callback),
  handleClose: () => ipcRenderer.send('close'),
  handleTransform: (key) => ipcRenderer.invoke('transform', key),
} as Api)
