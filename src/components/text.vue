<!-- 例如：Navbar.vue -->
<script setup>
import { usePetStore } from '../store/petStore'

const petStore = usePetStore()
const componentId = 'nav-home' // 每個組件給一個唯一的 ID
</script>

<template>
  <div 
    class="nav-item"
    @mouseenter="petStore.showPet('回到首頁查看最新消息！', componentId)"
    @mouseleave="petStore.hidePet(componentId)"
  >
    首頁
  </div>
</template>