<template>
  <div
    class="h-[30px] grid px-[16px] bg-[#3d3d3d] drag grid-cols-[10%_auto_10%] content-center grid-rows-[30px] justify-between"
  >
    <div>
      <n-icon size="30" color="#147cd7" class="no-drag">
        <OndemandVideoFilled />
      </n-icon>
    </div>
    <div class="flex items-center text-white">{{ name }}</div>
    <div class="flex items-center justify-end space-x-3">
      <n-icon size="20" color="#fff" class="no-drag" @click="openSide">
        <DehazeFilled></DehazeFilled>
      </n-icon>
      <n-icon size="18" color="#fff" class="no-drag h-[100%]" @click="minimize">
        <MinimizeOutlined />
      </n-icon>
      <n-icon size="20" color="#fff" class="no-drag" @click="sendMaximize">
        <FullscreenFilled />
      </n-icon>
      <n-icon size="20" color="#fff" class="no-drag">
        <CloseFilled />
      </n-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  OndemandVideoFilled,
  CloseFilled,
  MinimizeOutlined,
  FullscreenFilled,
  DehazeFilled,
} from '@vicons/material'

import { defineProps, defineEmits } from 'vue'

defineProps({
  name: {
    type: String,
    default: '',
  },
})
const emit = defineEmits<{ (event: 'openSide'): void }>()
const minimize = () => {
  window.myApi.sendMinimize()
}
const sendMaximize = () => {
  window.myApi.sendMaximize()
}
const openSide = () => {
  emit('openSide')
}
</script>

<style lang="scss" scoped>
.drag {
  -webkit-app-region: drag;
  cursor: pointer;

  .no-drag {
    -webkit-app-region: no-drag;
  }
}
</style>
