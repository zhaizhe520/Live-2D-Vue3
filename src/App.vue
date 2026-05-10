<!-- App.vue -->
<script setup>
import Pet from './components/pet.vue'
import text1 from './components/text.vue'
import text2 from './components/text2.vue'
</script>

<template>
  <text2 />
  <text1 />
  <div class="main-content">
    <Pet />
  </div>
</template>

<style>
/* 让背景稍微好看点 */
.main-content {
  font-family: sans-serif;
  padding: 50px;
  background-color: #e8e1e9;
  min-height: 100vh;
}
</style>