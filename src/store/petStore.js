// src/store/petStore.js
import { defineStore } from 'pinia'

export const usePetStore = defineStore('pet', {
  state: () => ({
    message: '',
    isVisible: false,
    lastTrigger: null // 紀錄最後一個觸發的組件 ID，防止閃爍
  }),
  
  actions: {
    // 進入組件時呼叫
    showPet(text, id) {
      this.lastTrigger = id;
      this.message = text;
      this.isVisible = true;
    },
    // 離開組件時呼叫
    hidePet(id) {
      // 只有當「離開的組件」就是「最後一個觸發的組件」時才隱藏
      // 這樣可以防止鼠標從 A 快速移動到 B 時，A 的 leave 事件把 B 的對話關掉
      if (this.lastTrigger === id) {
        this.isVisible = false;
        this.message = '';
      }
    }
  }
})