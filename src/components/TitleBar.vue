<template>
  <div class="h-[30px] flex px-[16px] bg-[#3d3d3d] drag">
    <n-icon size="30" color="#147cd7" class="no-drag">
      <OndemandVideoFilled />
    </n-icon>

    <div>
      <n-icon size="30" color="#fff" class="no-drag" @click="minimize"><MinimizeFilled /></n-icon>
      <n-icon size="30" color="#fff" class="no-drag" @click="sendMaximize">
        <FullscreenFilled />
      </n-icon>
      <n-icon size="30" color="#fff" class="no-drag"><CloseFilled /></n-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { OndemandVideoFilled, CloseFilled, MinimizeFilled, FullscreenFilled } from '@vicons/material'

const minimize = () => {
  window.myApi.sendMinimize()
}
const sendMaximize = () => {
  window.myApi.sendMaximize()
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
