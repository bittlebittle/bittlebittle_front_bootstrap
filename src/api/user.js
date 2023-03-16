import { createAxiosInstance } from './index'

const axios = createAxiosInstance()

function getLoginUser (url, userData) {
  return axios.post(url, userData,  {
    headers: {
      'Content-Type': 'application/json;'
    }
  })
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
