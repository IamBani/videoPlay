<template>
  <n-scrollbar style="max-height: 120px" class="h-[calc(100vh-30px)] bg-slate-900 w-full">
    <n-list class="bg-transparent">
      <n-list-item v-for="item in videoListStore.list" :key="item.name">
        <n-thing>
          <n-image preview-disabled class="w-full" :src="item.poster" />
        </n-thing>
      </n-list-item>
    </n-list>
  </n-scrollbar>
</template>

<script lang="ts" setup>
import useVideoListStore from '@/store/index'

const videoListStore = useVideoListStore()
</script>
