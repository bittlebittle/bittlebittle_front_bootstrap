<template>
<nav class="navbar navbar-expand-lg bg-gray-900 shadow-lg">
  <div class="container">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <router-link class="navbar-brand" to="/">BITTLE-BITTLE</router-link>

    <div class="d-lg-none">
        <router-link :to="{name:'UserLoginComp'}" v-if="loginUser == null">
            <button type="button" class="custom-btn btn btn-danger" data-bs-toggle="modal" data-bs-target="#BookingModal">
              로그인
            </button>
        </router-link>
        <router-link :to="{name:'UserMyPageComp', params: {userNo: loginUser.userNo }}" v-else>
            <button type="button" class="custom-btn btn btn-danger" data-bs-toggle="modal" data-bs-target="#BookingModal">
              {{ loginUser.nickname }}
            </button>
        </router-link>
    </div>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mx-auto">
        <li class="nav-item">
          <router-link class="nav-link active" to="/">Home</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/bottles">bottle</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/boards">자유게시판</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/notices">공지사항</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/faqs">FAQ</router-link>
        </li>
      </ul>
    </div>

    <div class="d-none d-lg-block">
      <!-- <button type="button" class="custom-btn btn btn-danger" data-bs-toggle="modal" data-bs-target="#BookingModal">
        <span v-if="loginUser.value != null">{{ loginUser.value }}</span>
        <span v-else>로그인</span>
      </button> -->
      <router-link :to="{name:'UserLoginComp'}" v-if="loginUser == null">
            <button type="button" class="custom-btn btn btn-danger" data-bs-toggle="modal" data-bs-target="#BookingModal">
              로그인
            </button>
      </router-link>
      <router-link :to="{name:'UserMyPageComp', params: {userNo: loginUser.userNo } }" v-else>
          <button type="button" class="custom-btn btn btn-danger" data-bs-toggle="modal" data-bs-target="#BookingModal">
            {{ loginUser.nickname }}
          </button>
      </router-link>

    </div>

  </div>
</nav>
</template>

<script>
import { useUserStore } from '@/stores/users'
import { getUser } from '@/api/user'
import { ref, onMounted } from 'vue'

export default {
  name: 'TheHeader',
  setup () {
    const loginUser = ref(null)

    const user = useUserStore()
    const userInfo = user.getLoginUserInfo

    const getLoginUser = () => {
      if (userInfo != null) {
        getUser(`/api/users/${userInfo.userNo}`
        ).then(res => {
          console.log(res.data)
          loginUser.value = res.data
        }).catch(err => console.log(err))
      }
    }

    onMounted(() => {
      getLoginUser()
    })

    return {
      getLoginUser,
      loginUser,
      userInfo
    }
  }
}

</script>

<style scope >
</style>
