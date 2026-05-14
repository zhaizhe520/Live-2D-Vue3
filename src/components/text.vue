<!-- 例如：Navbar.vue -->
<script setup>
import { usePetStore } from '../stores/petStore'
const petStore = usePetStore()
const componentId = 'nav-home' // 每個組件給一個唯一的 ID
</script>

<template>
  <button v-pet-tip="'點擊這裡會下載我的簡歷哦！'">下載簡歷</button>
</template>