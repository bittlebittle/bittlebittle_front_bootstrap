import { getJsonAxiosInstance } from './index'
import { useUserStore } from '@/stores/users'

const user = useUserStore()

const axios = getJsonAxiosInstance(user.getLoginUserInfo)

function getBoardList (url) {
  return axios.get(url)
}

function getReplyList (url) {
  return axios.get(url)
}

function getBoardDetail (url) {
  return axios.get(url)
}

function editBoard (url, boardData) {
  return axios.post(url, boardData)
}

function addBoard (url, boardData) {
  return axios.post(url, boardData)
}

function addReply (url,replyData) {
  return axios.post(url, replyData)
}

function deleteBoard (url) {
  return axios.get(url)
}

export { getBoardList, getReplyList, getBoardDetail, editBoard, addBoard, addReply, deleteBoard }
