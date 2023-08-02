import { defineStore } from 'pinia'

import type { file } from '../preload'

interface IUserState {
    list: file[]
}

const useVideoListStore = defineStore('palyList', {
    state: (): IUserState => ({
        list: [],
    }),
})

export default useVideoListStore
