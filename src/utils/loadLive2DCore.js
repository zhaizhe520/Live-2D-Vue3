// src/utils/loadLive2DCore.js

// 这里的 corePromise 定义在函数外部，利用闭包实现单例
let corePromise = null;

export const loadCubismCore = () => {
  if (corePromise) return corePromise;

  corePromise = new Promise((resolve, reject) => {
    // 检查是否已经存在（防止重复注入）
    if (window.Live2DCubismCore) {
      resolve(window.Live2DCubismCore);
      return;
    }

    const script = document.createElement('script');
    script.src = '/live2dcubismcore.min.js'; // 确保该文件在 public 根目录
    
    script.onload = () => {
      console.log('Live2D Core SDK loaded');
      resolve(window.Live2DCubismCore);
    };

    script.onerror = () => {
      corePromise = null; // 失败时清空，允许下次重新尝试加载
      reject(new Error('Failed to load Live2D Core SDK'));
    };

    document.head.appendChild(script);
  });

  return corePromise;
};