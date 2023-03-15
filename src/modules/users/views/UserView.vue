<template>
<div></div>
</template>

<script>
import { restApiGets } from '@/api/index'

export default {
  name: 'UserView',
  setup () {
    const getUser = () => {
      restApiGets('api/users')
        .then(res => {
          console.log(res.data)
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
