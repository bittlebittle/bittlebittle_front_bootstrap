import { getJsonAxiosInstance } from './index'

const axios = getJsonAxiosInstance()

function getBoardList (url) {
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

function deleteBoard (url) {
  return axios.get(url)
}

export { getBoardList, getBoardDetail, editBoard, addBoard, deleteBoard }
