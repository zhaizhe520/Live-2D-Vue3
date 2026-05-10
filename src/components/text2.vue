<!-- 例如：Navbar.vue -->
<script setup>
import { usePetStore } from '../store/petStore'

const petStore = usePetStore()

</script>

<template>
  <div 
    class="nav-item"
    @mouseenter="petStore.showPet('回到首頁查看最新消息！', componentId)"
    @mouseleave="petStore.hidePet(componentId)"
  >
    首頁
  </div>
  <button v-pet-tip="'nihao！'">nishiren</button>
</template>