<template>
  <title-bar :name="name"></title-bar>
  <div id="artRef" @drop="handledrop" @dragenter.prevent @dragover.prevent></div>
  <n-button tertiary type="primary" @click="handleClick">文件</n-button>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Artplayer from 'artplayer'

import useVideoListStore from '@/store/index'

const videoListStore = useVideoListStore()
let instance: Artplayer

const name = ref('')

const handleClick = () => {
  window.myApi.sendMsg().then((res) => {
    if (res) {
      res.forEach((item) => videoListStore.list.push(item))
      const file = res[0]
      instance.url = `file:///${file.path}`
      name.value = file.name
    }
  })
}
const handledrop = (e: DragEvent) => {
  if (e.dataTransfer) {
    for (const f of e.dataTransfer.files) {
      console.log(f)
      if (f.type.startsWith('video')) {
        name.value = f.name
        instance.url = `file:///${f.path}`
        videoListStore.list.push(f)
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
