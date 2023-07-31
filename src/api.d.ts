import type { Api } from './preload'

declare global {
  interface Window {
    myApi: Api
  }
}
