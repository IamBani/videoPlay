import { defineStore } from 'pinia'

import type { file } from '../preload'

export interface IUserState {
  list: file[]
}

const useVideoListStore = defineStore('palyList', {
  state: (): IUserState => ({
    list: [],
  }),
  actions: {
    add(f: file) {
      if (this.list.find((item) => item.name === f.name)) {
        return
      }
      this.list.push(f)
    },
    isHas(name: string) {
      return this.list.find((item) => item.name === name)
    },
    changeCurrentTime(name: string, currentTime: number) {
      const fileitem = this.list.find((item) => item.name === name) as file
      fileitem.currentTime = currentTime
    },
    delete(name?: string) {
      if (name) {
        const id = this.list.findIndex((item) => item.name === name)
        this.list.splice(id, 1)
      } else {
        this.list = []
      }
    },
  },
})

export default useVideoListStore
