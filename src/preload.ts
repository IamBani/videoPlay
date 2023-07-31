import { contextBridge, ipcRenderer } from 'electron'

export interface Api {
  sendMsg: () => Promise<string[] | undefined>
}
contextBridge.exposeInMainWorld('myApi', {
  // 这里注意避免将ipcRenderer等致命api直接挂载在window上，可能会导致安全问题
  sendMsg: () => ipcRenderer.invoke('open'),
} as Api)
