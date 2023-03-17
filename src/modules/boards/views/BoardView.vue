<template>
  <div class="container">
    <h1>게시판</h1>
    <div class="row">
    <div class="grid">
      <div class="g-col-4">
        <div class="card" style="width: 18rem;">
            <img src="@/assets/images/dinner/farhad-ibrahimzade-isHUj3N0194-unsplash.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
      </div>
      <div class="g-col-4">
        <div class="card" style="width: 18rem;">
            <img src="@/assets/images/dinner/farhad-ibrahimzade-isHUj3N0194-unsplash.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
      </div>
      <div class="g-col-4">
        <div class="card" style="width: 18rem;">
            <img src="@/assets/images/dinner/farhad-ibrahimzade-isHUj3N0194-unsplash.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
      </div>
    </div>
    <button @click="getUser">테스트</button>
    <div class="text-white">{{posts[0].title}}</div>
  </div>
  </div>
</template>

<script>
import { createAxiosInstance } from '@/api/index'

export default {
  name: 'BoardView',
  setup () {
    const posts = [
      { title: '첫 번째 게시물' }
    ]
    const axios = createAxiosInstance()

    const loginForm = {
      userId: 'admin1234',
      userPw: 'admin1234'
    }

    const getUser = function () {
      axios.post('/api/users/login', loginForm)
        .then(res => {
          console.log(111)
        })
        .catch(err => {
          console.log(err)
        })
    }

    return { getUser, posts }
  }
}
</script>

<style>

</style>
