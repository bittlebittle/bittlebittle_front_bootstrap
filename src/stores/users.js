import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 로그인 시 header 에 전달된 jwt 와 refrechindex 정보를 전역에 저장

  const userInfo = ref(null)

  const getLoginUserInfo = computed(() => userInfo.value)

  const logout = () => {
    state.loginUserInfo = {}
    router.push('/')
  }

  function setLoginUserInfo (jwt) {
    userInfo.value = jwt
    console.log(userInfo.value)
  }

  return { getLoginUserInfo, setLoginUserInfo, logout }
})
