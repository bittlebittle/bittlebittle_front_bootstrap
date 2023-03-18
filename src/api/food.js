import { getFormAxiosInstance } from './index'
import { useUserStore } from '@/stores/users'

const user = useUserStore()

const axios = getFormAxiosInstance(user.getLoginUserInfo)

function addFood (url, FoodData) {
  return axios.post(url, FormData)
}

function getFood (url) {
  return axios.get(url)
}

export { addFood, getFood }
