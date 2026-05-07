// src/composables/useTypewriter.js
//實現打字效果單獨js
import { ref } from 'vue'

export function useTypewriter() {
  const displayText = ref('')
  let timer = null

  const startTyping = (text, speed = 50) => {
    displayText.value = ''
    clearInterval(timer)
    let i = 0
    timer = setInterval(() => {
      if (i < text.length) {
        displayText.value += text.charAt(i)
        i++
      } else {
        clearInterval(timer)
      }
    }, speed)
  }

  return { displayText, startTyping }
}