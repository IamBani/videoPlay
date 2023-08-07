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
  },
})

export default useVideoListStore
