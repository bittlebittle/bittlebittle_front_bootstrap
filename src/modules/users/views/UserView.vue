<template>
<div></div>
</template>

<script>
import reactive from 'pinia'
import { createAxiosInstance } from '@/api/index'

export default {
  name: 'UserView',
  setup () {
    const status = reactve({user : {}});

    const axios = createAxiosInstance();

    const loginForm= {
      userId: 'admin1234',
      userPw: 'admin1234'
    }

    const getUser = function() {
      axios.post('/api/users/login', loginForm)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err)
        })
    }

    return { getUser }
  }
}
</script>

<style>

</style>
