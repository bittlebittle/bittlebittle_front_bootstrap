<template>
<nav class="navbar navbar-expand-lg bg-gray-900 shadow-lg">
  <div class="container">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <router-link class="navbar-brand" to="/">Home</router-link>

    <div class="d-lg-none">
      <button type="button" class="custom-btn btn btn-danger" data-bs-toggle="modal" data-bs-target="#BookingModal">SignUp</button>
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
      <button type="button" class="custom-btn btn btn-danger" data-bs-toggle="modal" data-bs-target="#BookingModal">Reservation</button>
    </div>

  </div>
</nav>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>

<style>
</style>
