import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useBoardStore = defineStore('board', () => {
  // 로그인 시 header 에 전달된 jwt 와 refrechindex 정보를 전역에 저장
  const baordInfo = ref(null)

  const getBoardInfo = computed(() => baordInfo.value)

  function setBoardInfo (board) {
    baordInfo.value = board
  }

  return { getBoardInfo, setBoardInfo }
})
