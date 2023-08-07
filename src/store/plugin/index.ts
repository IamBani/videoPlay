import { PiniaPluginContext, StateTree, SubscriptionCallback } from 'pinia'
import { debounce } from 'lodash-es'
import { toRaw } from 'vue'
import { IUserState } from '..'

// eslint-disable-next-line import/prefer-default-export
export function piniaStorePlugin(context: PiniaPluginContext) {
  const { store } = context
  window.myApi.sendGetState('store').then((res) => {
    store.$patch(res as StateTree)
  })
  const sendSetState = debounce(window.myApi.sendSetState, 1000)
  store.$subscribe((mutation, state) => {
    sendSetState('store', toRaw(state) as unknown as IUserState)
  })
}
