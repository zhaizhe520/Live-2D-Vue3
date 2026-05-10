// src/directives/petTip.js
import { usePetStore } from '../store/petStore'

export const vPetTip = {
  mounted(el, binding) {
    const petStore = usePetStore()
    const instanceId = Math.random().toString(36).substring(2, 9)
    el._handleEnter = () => petStore.showPet(binding.value, instanceId)
    el._handleLeave = () => petStore.hidePet(instanceId)
    el.addEventListener('mouseenter', el._handleEnter)
    el.addEventListener('mouseleave', el._handleLeave)
  },
  unmounted(el) {
    el.removeEventListener('mouseenter', el._handleEnter)
    el.removeEventListener('mouseleave', el._handleLeave)
  }
}