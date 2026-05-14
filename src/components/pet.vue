<script setup>
// 從 vue 中引入生命週期鉤子和響應式 API
import { onMounted, onUnmounted, ref, shallowRef } from 'vue';
// 引入整個 PixiJS 繪圖引擎庫
import * as PIXI from 'pixi.js';
// 引入用於支持 Cubism 4 模型的 Live2D 顯示組件
import { Live2DModel } from 'pixi-live2d-display/cubism4';

//對話框
//解構會弄丟響應性
// 使用 storeToRefs 保持響應性
import { storeToRefs } from 'pinia'

import { usePetStore } from '../stores/petStore'
const petStore = usePetStore()


//打字機
// 1. 引入你的打字機 js
import { useTypewriter } from '../utils/useTypewriter'

const { message, isVisible } = storeToRefs(petStore)

// 2. 初始化打字機功能
const { displayText, startTyping } = useTypewriter()

import { watch } from 'vue'
// 3. 核心邏輯：監聽 Pinia 裡的文字變化
watch(message, (newText) => {
  if (newText) {
    // 當 Pinia 收到新文字時，啟動打字效果
    startTyping(newText, 60) // 60ms 是打字速度
  } else {
    // 如果文字被清空，也可以同步清空顯示內容
    // displayText.value = '' 
  }
})
//


// 將 PixiJS 的計時器（Ticker）註冊到 Live2D 模型類中，使其能自動播放動畫
Live2DModel.registerTicker(PIXI.Ticker);

// 創建一個引用，用於綁定模板中的 <canvas> 標籤
const canvasRef = ref(null);
// 使用 shallowRef 存儲 Pixi 實例，避免 Vue 對其進行深度響應式監聽以提升性能
const app = shallowRef(null);
// 使用 shallowRef 存儲加載後的模型實例
const model = shallowRef(null);

// 當組件掛載到 DOM 後執行異步初始化
onMounted(async () => {
  // 如果找不到畫布元素，直接返回不執行後續代碼
  if (!canvasRef.value) return;

  // 創建並初始化 Pixi 應用程序
  app.value = new PIXI.Application({
    view: canvasRef.value,          // 指定渲染使用的畫布元素
    backgroundAlpha: 0,             // 設置背景透明度為 0（完全透明）
    antialias: true,                // 開啟抗鋸齒，讓模型邊緣更平滑
    autoStart: true,                // 初始化後立即啟動渲染循環
    resizeTo: canvasRef.value.parentElement, // 讓畫布大小自動跟隨父容器變化
  });

  try {
    // 定義模型配置文件的路徑（需放在 public 目錄下）
    const modelUrl = '/live2d/murasame/murasame.model3.json';

    // 從指定路徑異步加載 Live2D 模型
    model.value = await Live2DModel.from(modelUrl, {
      autoInteract: true,           // 開啟模型與鼠標的自動交互（如眼神跟隨）
    });

    // 獲取模型實例以便設置屬性
    const m = model.value;
    
    // 設置模型的縮放比例，0.20 代表縮小為原始大小的 20%
    m.scale.set(0.20);
    // 設置模型的中心點（錨點）為模型自身的正中心 (x:50%, y:50%)
    m.anchor.set(0.5, 0.5);
    // 設置模型在畫布上的 X 坐標為畫布寬度的一半（水平居中）
    m.x = app.value.screen.width / 1.5;
    // 設置模型在畫布上的 Y 坐標為畫布高度的一半（垂直居中）
    m.y = app.value.screen.height / 2;

    // 將設置好的模型對象添加到 Pixi 的舞台中顯示出來
    app.value.stage.addChild(m);

    // 在控制台打印加載成功的訊息
    console.log('叢雨已加載完成');
  } catch (error) {
    // 如果加載過程中出現錯誤（如路徑錯誤），在控制台輸出錯誤訊息
    console.error('Live2D 加載失敗:', error);
  }
});

// 當組件被銷毀時執行清理工作
onUnmounted(() => {
  // 如果模型存在，調用其銷毀方法釋放內存
  if (model.value) {
    model.value.destroy();
  }
  // 如果 Pixi 應用存在，調用銷毀方法並清理畫布及相關紋理緩存
  if (app.value) {
    app.value.destroy(true, {
      children: true,               // 同時銷毀所有子對象（如模型）
      texture: true,                // 銷毀相關紋理
      baseTexture: true,            // 銷毀基礎紋理
    });
  }
});
</script>

<template>
  <canvas ref="canvasRef"></canvas>


  <div class="pet-container">
    <canvas id="live2d-canvas"></canvas>
    <!-- 對話氣泡 -->
    <transition name="fade">
      <div v-if="isVisible" class="pet-dialog">
        <!-- 4. 注意：這裡要綁定的是打字機輸出的 displayText -->
        <p>{{ displayText }}</p>
        
        <!-- 裝飾用的小尾巴 -->
        <div class="dialog-arrow"></div>
      </div>
    </transition>
  </div>
</template>

<style scoped>

.pet-container {
  position: fixed; /* 或者 relative，取決於你的佈局 */
  bottom: 0;
  right: 0;
  width: 300px;
  height: 400px;
}

#live2d-canvas {
  width: 100%;
  height: 100%;
}

.pet-dialog {
  position: absolute;
  bottom: 100%; /* 讓它出現在模型頭部附近 */
  left: 10%;
  transform: translateX(-50%);
  z-index: 999; /* 確保在 canvas 之上 */
  background: white;
  padding: 10px;
  border-radius: 8px;
  /* 暫時給個邊框確保能看見 */
  border: 2px solid #ffb7c5; 
  min-width: 50px;
}
</style>