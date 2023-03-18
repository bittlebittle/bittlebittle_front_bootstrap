// import axios from 'axios'
// import { useUserStore } from '@/stores/users'

// // 기본 axios 초기화 함수
// function createAxiosInstance () {
//   const user = useUserStore()

//   const userInfo = user.getLoginUserInfo

//   console.log(userInfo)

//   return axios.create({
//     withCredentials: true,
//     baseURL: 'http://127.0.0.1:8080/bittlebittle',
//     headers: {
//       Authorization: userInfo.Authorization,
//       RefreshTokenIdx: userInfo.RefreshTokenIdx
//     }
//   })
// }

// function getJsonAxiosInstance () {
//   const instance = createAxiosInstance()
//   instance.defaults.headers.post['Content-Type'] = 'application/json; charset-8'
//   return instance
// }

// function getFormAxiosInstance () {
//   const instance = createAxiosInstance()
//   instance.defaults.headers.post['Content-Type'] = 'multipart/form-data'
//   return instance
// }

// export { getJsonAxiosInstance, getFormAxiosInstance }

import axios from 'axios'

function createAxiosInstance () {
  return axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8080/bittlebittle'
  })
}

function getJsonAxiosInstance (userInfo) {
  const instance = createAxiosInstance()
  instance.defaults.headers.post['Content-Type'] = 'application/json; charset-8'
  if (userInfo != null) {
    instance.defaults.headers.common['Authorization'] = userInfo.Authorization
    instance.defaults.headers.common['RefreshTokenIdx'] = userInfo.RefreshTokenIdx
  }
  return instance
}

function getFormAxiosInstance (userInfo) {
  const instance = createAxiosInstance()
  instance.defaults.headers.post['Content-Type'] = 'multipart/form-data'
  if (userInfo != null) {
    instance.defaults.headers.common['Authorization'] = userInfo.Authorization
    instance.defaults.headers.common['RefreshTokenIdx'] = userInfo.RefreshTokenIdx
  }
  return instance
}

export { getJsonAxiosInstance, getFormAxiosInstance }
