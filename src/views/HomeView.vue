<template>
  <n-layout>
    <n-layout-header><title-bar :name="name" @openSide="openSide"></title-bar></n-layout-header>
    <n-layout has-sider :sider-placement="'right'">
      <n-layout-content>
        <div id="artRef" @drop="handledrop" @dragenter.prevent @dragover.prevent></div>
        <!-- <n-button tertiary type="primary" @click="handleClick">文件</n-button> -->
      </n-layout-content>
      <n-layout-sider ref="siderRef" collapse-mode="width" :collapsed-width="0">
        <Sider></Sider>
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

type NLayoutSiderRef = InstanceType<typeof NLayoutSider>

const videoListStore = useVideoListStore()
let instance: Artplayer

const name = ref('')
const width = ref(0)

const siderRef = ref<NLayoutSiderRef>()
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
const handledrop = async (e: DragEvent) => {
  if (e.dataTransfer) {
    for await (const f of e.dataTransfer.files) {
      console.log(f)
      if (f.type.startsWith('video')) {
        name.value = f.name
        instance.url = `file:///${f.path}`
        const result = (await captureFrame(f.path)) as unknown as fileType
        videoListStore.list.push({ ...f, ...result })
      }
    }
  }
}

const openSide = () => {
  siderRef.value?.handleTriggerClick()
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
  width: 100%;
  height: calc(100vh - 30px);
}
</style>
