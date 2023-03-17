import { createAxiosInstance } from './index'

function addFood (url, FoodData) {
  return createAxiosInstance().post(url, FoodData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

function getFood (url) {
  return createAxiosInstance.get(url)
}

export { addFood, getFood }
