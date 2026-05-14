<!-- App.vue -->
<script setup>
// 1. 【重要】删掉这一行：import Pet from './components/pet.vue'
import text1 from './components/text.vue'
import text2 from './components/text2.vue'
import { defineAsyncComponent } from 'vue'; // 不再需要 ref 和 onMounted 处理 ready
import { loadCubismCore } from './utils/loadLive2DCore';
import BoxAnime from './components/BoxAnime.vue';

// 定义异步组件
const AsyncPet = defineAsyncComponent({
  loader: async () => {
    // 仅仅等待脚本加载，脚本一旦完成 (Resolve)，立即进入下一步
    await loadCubismCore();
    
    // 脚本准备好了，加载组件
    return import('./components/Pet.vue');
  },
  
  // 核心：将 delay 设为 0，意味着只要 loader 还没完成，
  // 哪怕只过了 1 毫秒，也会立刻显示 BoxAnime
  loadingComponent: BoxAnime,
  delay: 0,
  
  // 可选：如果脚本加载由于意外超过了 10 秒还没好，可以报错
  timeout: 10000
});
</script>

<template>
  <text2 />
  <text1 />
  <div class="main-content">
    <!-- 2. 使用定义的异步组件 AsyncPet -->
    <!-- Vue 会自动判断：loader 没完时显示 BoxAnime，完了自动换成 Pet -->
    <AsyncPet />
  </div>
</template>

<style>
.main-content {
  font-family: sans-serif;
  padding: 50px;
  background-color: #e8e1e9;
  min-height: 100vh;
}
</style>