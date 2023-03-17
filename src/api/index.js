import axios from 'axios'

// 기본 axios 초기화 함수
function createAxiosInstance () {
  return axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8080/bittlebittle'
  })
}


function getJsonAxiosInstance () {
  const instance = createAxiosInstance()
  instance.defaults.headers.common.Authorization = 'AUTH_TOKEN'
  instance.defaults.headers.post['Content-Type'] = 'application/json; charset-8'
  return instance
}

function getFormAxiosInstance () {
  const instance = createAxiosInstance()
  instance.defaults.headers.common.Authorization = 'AUTH_TOKEN'
  instance.defaults.headers.post['Content-Type'] = 'multipart/form-data'
  return instance
}

export { getJsonAxiosInstance, getFormAxiosInstance }
