<template>
  <router-view />
</template>

<script>
export default {
  name: 'BoardView',
  setup () {
    const posts = [
      { title: '첫 번째 게시물' },
      { title: '두 번째 게시물' },
      { title: '세 번째 게시물' }
    ]
    return { posts }
  }
}
</script>

<style>

</style>
