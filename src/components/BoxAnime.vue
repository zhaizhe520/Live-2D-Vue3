<template>
  <div class="pet-placeholder">

    <!-- 这里就是动画本体 -->
     
    <div class="spinner"></div>
    <p class="loading-text">站娘加载中...</p>
  </div>
</template>

<style scoped>
/* 这个样式只在这个组件内生效，不会弄乱你的首页 */
.pet-placeholder {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 280px;
  height: 680px;
  background: rgba(255, 255, 255, 0.8); /* 半透明白底，更有质感 */
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b883; /* Vue 绿 */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  margin-top: 15px;
  color: #666;
  font-size: 14px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>