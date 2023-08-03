import { contextBridge, ipcRenderer } from 'electron'

export interface file {
  name: string
  path: string
  size: number
  duration: string
  poster: string
}

export interface Api {
  sendMsg: () => Promise<file[] | undefined>
  sendMinimize: () => void
  sendMaximize: () => void
}
contextBridge.exposeInMainWorld('myApi', {
  // 这里注意避免将ipcRenderer等致命api直接挂载在window上，可能会导致安全问题
  sendMsg: () => ipcRenderer.invoke('open'),
  sendMinimize: () => ipcRenderer.send('minimize'),
  sendMaximize: () => ipcRenderer.send('maximize'),
} as Api)
