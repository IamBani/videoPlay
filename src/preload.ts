import { contextBridge, ipcRenderer } from 'electron'
import { IUserState } from './store'

export interface file {
  name: string
  path: string
  size: number
  duration: string
  poster: string
  type: string
}

export interface Api {
  sendMsg: () => Promise<file[] | undefined>
  sendMinimize: () => void
  sendMaximize: () => void
  sendGetState: (key: string) => Promise<IUserState | undefined>
  sendSetState: (key: string, value: IUserState) => void
}
contextBridge.exposeInMainWorld('myApi', {
  // 这里注意避免将ipcRenderer等致命api直接挂载在window上，可能会导致安全问题
  sendMsg: () => ipcRenderer.invoke('open'),
  sendMinimize: () => ipcRenderer.send('minimize'),
  sendMaximize: () => ipcRenderer.send('maximize'),
  sendGetState: (key) => ipcRenderer.invoke('getState', key),
  sendSetState: (key, value) => ipcRenderer.send('setState', key, value),
} as Api)
