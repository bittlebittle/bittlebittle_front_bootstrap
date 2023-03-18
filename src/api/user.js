import { getJsonAxiosInstance } from './index'
import { useUserStore } from '@/stores/users'

// 회원 관련 기능에서는 이미지가 필요없기 때문에 json 으로 axios 생성

// 만약 별도의 api 모듈을 생성하지 않았다면 axios 를 호출하는 .vue 파일의 script 태그 내부에 해당 부분 복붙.
// import { useUserStore } from '@/stores/users'
// const user = useUserStore()
// const axios = getJsonAxiosInstance(user.getLoginUserInfo)

/*

예시코드

자유게시판 리스트를
*/

function $loginUser (userData) {
  const user = useUserStore()
  const axios = getJsonAxiosInstance(user.getLoginUserInfo)
  return axios.post('/api/users/login', userData)
}

function $getUser (userNo) {
  const user = useUserStore()
  const axios = getJsonAxiosInstance(user.getLoginUserInfo)
  return axios.get(`/api/users/${userNo}`)
}

function $editUser (userNo, boardData) {
  const user = useUserStore()
  const axios = getJsonAxiosInstance(user.getLoginUserInfo)
  return axios.post(`/api/users/${userNo}/set-data`, boardData)
}

function $addUser (url, boardData) {
  const user = useUserStore()
  const axios = getJsonAxiosInstance(user.getLoginUserInfo)
  return axios.post('api/users/addition', boardData)
}

function $removeUser (userNo) {
  const user = useUserStore()
  const axios = getJsonAxiosInstance(user.getLoginUserInfo)
  return axios.get(`api/users/${userNo}/deletion`)
}

export { $loginUser, $getUser, $editUser, $addUser, $removeUser }
