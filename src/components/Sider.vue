<template>
  <div class="scrollbar">
    <n-scrollbar class="h-[calc(100vh-30px)] bg-slate-700 w-full max-h-[calc(100vh-30px)]">
      <n-list class="bg-transparent">
        <n-list-item
          v-for="item in videoListStore.list"
          :key="item.name"
          @click="handleClick(item)"
          @contextmenu.prevent="handleContextmenu(item)"
          class="px-[8px]"
        >
          <n-thing :class="name === item.name ? 'border-2 border-rose-600' : ''">
            <n-image
              preview-disabled
              class="w-full cursor-pointer flex justify-center"
              :src="item.poster"
              :title="item.name"
            />
          </n-thing>
        </n-list-item>
      </n-list>
    </n-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, PropType, toRaw } from 'vue'
import Artplayer from 'artplayer'
import { useDialog } from 'naive-ui'
import { file } from '@/preload'
import useVideoListStore from '@/store/index'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  instance: {
    type: Object as PropType<Artplayer | undefined>,
  },
})
const videoListStore = useVideoListStore()
const dialog = useDialog()
const emits = defineEmits(['changerUrl'])

let F: file

const handleClick = (item: file) => {
  if (props.instance) {
    videoListStore.changeCurrentTime(props.name, props.instance?.currentTime || 0).then(() => {
      emits('changerUrl', item)
    })
  } else {
    emits('changerUrl', item)
  }
}

const handleContextmenu = (item: file) => {
  F = toRaw(item)
  window.myApi.handleContextmenu()
}

window.myApi.handleMenu((_event, v) => {
  console.log(v)
  switch (v) {
    case 1:
      handleClick(F)
      break
    case 2:
      videoListStore.delete(F.name)
      break
    case 3:
      dialog.warning({
        title: '提示',
        content: '你确定要删除所有的历史记录吗?',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
          videoListStore.delete()
        },
      })
      break
    default:
  }
})
</script>

<style lang="scss" scoped>
.scrollbar {
  :deep(.n-scrollbar-rail__scrollbar) {
    background-color: rgb(148 163 184);
  }
}
</style>
