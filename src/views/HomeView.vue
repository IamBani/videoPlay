<template>
  <div id="artRef" @drop="handledrop" @dragenter.prevent @dragover.prevent></div>
  <n-button tertiary type="primary" @click="handleClick">文件</n-button>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Artplayer from 'artplayer'

let instance: Artplayer
const handleClick = () => {
  window.myApi.sendMsg().then((res) => {
    if (res) {
      const [url] = res
      instance.url = `file:///${url}`
    }
  })
}
const handledrop = (e: DragEvent) => {
  if (e.dataTransfer) {
    for (const f of e.dataTransfer.files) {
      if (f.type.startsWith('video')) {
        instance.url = `file:///${f.path}`
      }
    }
  }
}

onMounted(() => {
  instance = new Artplayer({
    url: '',
    container: '#artRef',
    autoplay: true,
    loop: true,
    fullscreen: true,
  })
})
</script>
<style scoped lang="scss">
#artRef {
  aspect-ratio: 16/9;
}
</style>
