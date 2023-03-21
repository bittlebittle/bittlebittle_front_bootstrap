import { getJsonAxiosInstance } from './index'
import { useUserStore } from '@/stores/users'

// 만약 별도의 api 모듈을 생성하지 않았다면 axios 를 호출하는 .vue 파일의 script 태그 내부에 해당 부분 복붙.
// import { useUserStore } from '@/stores/users'
// const user = useUserStore()
// const axios = getJsonAxiosInstance(user.getLoginUserInfo)

function $getBoardList () {
  const user = useUserStore()
  const axios = getJsonAxiosInstance(user.getLoginUserInfo)
  return axios.get('/api/boards')
}

function getReplyList (url) {
  const user = useUserStore()
  const axios = getJsonAxiosInstance(user.getLoginUserInfo)
  return axios.get(url)
}

function $getBoardDetail (boardNo) {
  const user = useUserStore()
  const axios = getJsonAxiosInstance(user.getLoginUserInfo)
  return axios.get(`/api/boards/${boardNo}`)
}

function $editBoard (boardNo, boardData) {
  const user = useUserStore()
  const axios = getJsonAxiosInstance(user.getLoginUserInfo)
  return axios.post(`/api/boards/${boardNo}/set-data`, boardData)
}

function $addBoard (boardData) {
  const user = useUserStore()
  const axios = getJsonAxiosInstance(user.getLoginUserInfo)
  return axios.post('/api/boards', boardData)
}

function addReply (url, replyData) {
  const user = useUserStore()
  const axios = getJsonAxiosInstance(user.getLoginUserInfo)
  return axios.post(url, replyData)
}

function $removeBoard (boardNo) {
  const user = useUserStore()
  const axios = getJsonAxiosInstance(user.getLoginUserInfo)
  return axios.get(`/api/boards/${boardNo}/deletion`)
}



export { $getBoardList, getReplyList, $getBoardDetail, $editBoard, $addBoard, addReply, $removeBoard }
