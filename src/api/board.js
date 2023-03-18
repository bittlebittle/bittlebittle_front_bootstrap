import { getJsonAxiosInstance } from './index'
import { useUserStore } from '@/stores/users'
// import { useUserStore } from '@/stores/users'
// const user = useUserStore()
// const axios = getJsonAxiosInstance(user.getLoginUserInfo)

function getBoardList (url) {
  const user = useUserStore()
  const axios = getJsonAxiosInstance(user.getLoginUserInfo)
  return axios.get(url)
}

function getReplyList (url) {
  const user = useUserStore()
  const axios = getJsonAxiosInstance(user.getLoginUserInfo)
  return axios.get(url)
}

function getBoardDetail (url) {
  const user = useUserStore()
  const axios = getJsonAxiosInstance(user.getLoginUserInfo)
  return axios.get(url)
}

function editBoard (url, boardData) {
  const user = useUserStore()
  const axios = getJsonAxiosInstance(user.getLoginUserInfo)
  return axios.post(url, boardData)
}

function addBoard (url, boardData) {
  const user = useUserStore()
  const axios = getJsonAxiosInstance(user.getLoginUserInfo)
  return axios.post(url, boardData)
}

function addReply (url, replyData) {
  const user = useUserStore()
  const axios = getJsonAxiosInstance(user.getLoginUserInfo)
  return axios.post(url, replyData)
}

function deleteBoard (url) {
  return axios.get(url)
}

export { getBoardList, getReplyList, getBoardDetail, editBoard, addBoard, addReply, deleteBoard }
