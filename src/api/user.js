import { getJsonAxiosInstance } from './index'
import { useUserStore } from '@/stores/users'

// 회원 관련 기능에서는 이미지가 필요없기 때문에 json 으로 axios 생성
const user = useUserStore()
const axios = getJsonAxiosInstance(user.getLoginUserInfo)

function loginUser (url, userData) {
  return axios.post(url, userData)
}

function getUser (url) {
  return axios.get(url)
}

function editUser (url, boardData) {
  return axios.post(url, boardData)
}

function addUser (url, boardData) {
  return axios.post(url, boardData)
}

function removeUser (url) {
  return axios.get(url)
}

export { loginUser, getUser, editUser, addUser, removeUser }
