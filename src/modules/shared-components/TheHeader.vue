<template>
<nav class="navbar navbar-expand-lg bg-gray-900 shadow-lg">
  <div class="container">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <router-link class="navbar-brand" to="/">BITTLE-BITTLE</router-link>

    <div class="d-lg-none">
      <template v-if="loginUser == null">
        <router-link :to="{name:'UserLoginComp'}">
            <button type="button" class="custom-btn btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#BookingModal">
              로그인
            </button>
        </router-link>
        <router-link :to="{name:'UserRegisterComp'}">
            <button type="button" class="custom-btn btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#BookingModal">
              회원가입
            </button>
        </router-link>
      </template>
      <template v-else>
        <router-link :to="{name:'UserMyPageComp', params: {userNo: loginUser.userNo }}">
            <button type="button" class="custom-btn btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#BookingModal">
              {{ loginUser.nickname }}
            </button>
        </router-link>
        <router-link to="/">
            <button type="button" class="custom-btn btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#BookingModal">
              로그아웃
            </button>
        </router-link>
      </template>
    </div>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mx-auto">
        <li class="nav-item">
          <template v-if="loginUser != null && userInfo.adminYN == 'Y'">
            <router-link class="nav-link active" to="/admin">Home</router-link>
          </template>
          <template v-else>
            <router-link class="nav-link active" to="/">Home</router-link>
          </template>
        </li>

        <li class="nav-item">
          <template v-if="loginUser != null && userInfo.adminYN == 'Y'">
            <router-link class="nav-link" to="/admin/bottles">bottle</router-link>
          </template>
          <template v-else>
            <router-link class="nav-link" to="/bottles">bottle</router-link>
          </template>
        </li>

        <li class="nav-item">
          <template v-if="loginUser != null && userInfo.adminYN == 'Y'">
          <router-link class="nav-link" to="/admin/boards">자유게시판</router-link>
          </template>
          <template v-else>
          <router-link class="nav-link" to="/boards">자유게시판</router-link>
        </template>
        </li>

        <li class="nav-item">
          <template v-if="loginUser != null && userInfo.adminYN == 'Y'">
            <router-link class="nav-link" to="/admin/notices">공지사항</router-link>
          </template>
          <template v-else>
          <router-link class="nav-link" to="/notices">공지사항</router-link>
          </template>
        </li>

        <li class="nav-item">
          <template v-if="loginUser != null && userInfo.adminYN == 'Y'">

          <router-link class="nav-link" to="/admin/faqs">FAQ</router-link>
          </template>
          <template v-else>
          <router-link class="nav-link" to="/faqs">FAQ</router-link>
        </template>
        </li>

        <li class="nav-item">
          <template v-if="loginUser != null && userInfo.adminYN == 'Y'">
            <router-link class="nav-link" to="/admin/bottles/all">전체 검색</router-link>
          </template>
          <template v-else>
          <router-link class="nav-link" to="/bottles/all">전체 검색</router-link>
        </template>
        </li>
      </ul>
    </div>

    <div class="d-none d-lg-block">
      <template v-if="loginUser == null">
        <router-link :to="{name:'UserLoginComp'}">
            <button type="button" class="custom-btn btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#BookingModal">
              로그인
            </button>
        </router-link>
        <router-link :to="{name:'UserRegisterComp'}">
            <button type="button" class="custom-btn btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#BookingModal">
              회원가입
            </button>
        </router-link>
      </template>
      <template v-else>
        <router-link :to="{name:'UserMyPageComp', params: {userNo: loginUser.userNo }}">
            <button type="button" class="custom-btn btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#BookingModal">
              {{ loginUser.nickname }}
            </button>
        </router-link>
        <router-link to="/">
            <button type="button" class="custom-btn btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#BookingModal">
              로그아웃
            </button>
        </router-link>
      </template>

    </div>

  </div>
</nav>
</template>

<script>
import { useUserStore } from '@/stores/users'
import { $getUser } from '@/api/user'
import { ref, onMounted } from 'vue'

export default {
  name: 'TheHeader',
  setup () {
    const loginUser = ref(null)

    const user = useUserStore()
    const userInfo = user.getLoginUserInfo

    const getLoginUser = () => {
      if (userInfo != null) {
        $getUser(userInfo.userNo
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
<style scoped>
.custom-btn {
  border: 0;
    color: var(--white-color);
    font-size: var(--menu-font-size);
    padding: 10px 20px;
    margin-left: 10px;
}
</style>
