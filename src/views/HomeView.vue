<template>
  <n-layout>
    <n-layout-header><title-bar :name="name" @openSide="openSide"></title-bar></n-layout-header>
    <n-layout has-sider :sider-placement="'right'">
      <n-layout-content>
        <div
          id="artRef"
          @drop="handledrop"
          @dragenter.prevent
          @dragover.prevent
          class="bg-slate-900 flex justify-center items-center"
        >
          <n-button v-if="!instance" type="primary" @click="handleClick">
            请选择文件或拖拽文件
          </n-button>
        </div>
      </n-layout-content>
      <n-layout-sider :collapsed="collapsed" collapse-mode="width" :collapsed-width="0">
        <Sider @changerUrl="changerUrl" :name="name"></Sider>
      </n-layout-sider>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Artplayer from 'artplayer'
import { NLayoutSider } from 'naive-ui'
import useVideoListStore from '@/store/index'
import captureFrame from '@/utils/videoToImag'
import { file as fileType } from '@/preload'

const videoListStore = useVideoListStore()
const instance = ref<Artplayer | undefined>()

const name = ref('')
const collapsed = ref(true)

const createArtplayer = () => {
  instance.value = new Artplayer({
    url: '',
    container: '#artRef',
    autoplay: true,
    loop: true,
    fullscreen: true,
  })
}
const handleClick = () => {
  window.myApi.sendMsg().then(async (res) => {
    if (res) {
      if (!instance.value) {
        createArtplayer()
      }
      for await (const item of res) {
        const { path, name: filename, size, type } = item
        const result = (await captureFrame(path)) as any
        videoListStore.add({ path, name: filename, size, type, ...result })
      }

      const file = res[0]
      if (instance.value) {
        instance.value.url = `file:///${file.path}`
        name.value = file.name
      }
    }
  })
}
const handledrop = async (e: DragEvent) => {
  if (e.dataTransfer) {
    if (e.dataTransfer.files[0].type.startsWith('video')) {
      if (!instance.value) {
        createArtplayer()
      }
      if (instance.value) {
        name.value = e.dataTransfer.files[0].name
        instance.value.url = `file:///${e.dataTransfer.files[0].path}`
      }
    }
    for await (const f of e.dataTransfer.files) {
      if (f.type.startsWith('video')) {
        const { path, name: filename, size, type } = f
        const result = (await captureFrame(path)) as any
        const list = { path, name: filename, size, type, ...result }
        videoListStore.add(list)
      }
    }
  }
}
const changerUrl = (item: fileType) => {
  if (!instance.value) {
    createArtplayer()
  }
  if (instance.value) {
    instance.value.url = `file:///${item.path}`
    name.value = item.name
  }
}
const openSide = () => {
  collapsed.value = !collapsed.value
}
</script>
<style scoped lang="scss">
#artRef {
  width: 100%;
  height: calc(100vh - 30px);
  position: relative;
}
</style>
