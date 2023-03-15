<template>
<nav class="navbar navbar-expand-lg bg-gray-900 shadow-lg">
  <div class="container">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <a class="navbar-brand" Ïhref="index.html">
      Bittle-Bittle
    </a>

    <div class="d-lg-none">
      <button type="button" class="custom-btn btn btn-danger" data-bs-toggle="modal" data-bs-target="#BookingModal">SignUp</button>
    </div>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mx-auto">
        <li class="nav-item">
          <a class="nav-link active" href="index.html">Home</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="about.html">Story</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="menu.html">Menu</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="news.html">Our Updates</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="contact.html">Contact</a>
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
@import '../../assets/css/tooplate-crispy-kitchen.css';
</style>
