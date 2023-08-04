import { defineStore } from 'pinia'

import type { file } from '../preload'

interface IUserState {
  list: file[]
  map: Map<string, file>
}

const useVideoListStore = defineStore('palyList', {
  state: (): IUserState => ({
    list: [],
    map: new Map(),
  }),
  actions: {
    add(f: file) {
      if (!this.map.has(f.name)) {
        this.list.push(f)
        this.map.set(f.name, f)
      }
    },
  },
})

export default useVideoListStore
