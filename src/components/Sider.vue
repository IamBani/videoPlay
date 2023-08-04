<template>
  <div class="scrollbar">
    <n-scrollbar class="h-[calc(100vh-30px)] bg-slate-900 w-full max-h-[calc(100vh-30px)]">
      <n-list class="bg-transparent">
        <n-list-item
          v-for="item in videoListStore.list"
          :key="item.name"
          @click="handleClick(item)"
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
import { defineEmits, defineProps } from 'vue'
import { file } from '@/preload'
import useVideoListStore from '@/store/index'

defineProps({
  name: {
    type: String,
    default: '',
  },
})

const videoListStore = useVideoListStore()
const emits = defineEmits(['changerUrl'])
const handleClick = (item: file) => {
  emits('changerUrl', item)
}
</script>

<style lang="scss" scoped>
.scrollbar {
  :deep(.n-scrollbar-rail__scrollbar) {
    background-color: rgb(148 163 184);
  }
}
</style>
