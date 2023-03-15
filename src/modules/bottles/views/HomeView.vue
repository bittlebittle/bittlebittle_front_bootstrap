<template>
      <v-container>
      <h1>메인입니다.</h1>
        <h3>유저등록</h3>
        <form action="api/users" method="post">
          <table>
            <tr>
              <td>유저 아이디 : </td>
              <td><v-text-field type="text" name="userId"></v-text-field></td>
            </tr>
            <tr>
              <td colspan="2"><input type="submit" value="전송"></td>
            </tr>
          </table>
        </form>
        <a @click="getUser">ddd</a>
      </v-container>
</template>

<script>
import { restApiGets } from '@/api/index'

export default {
  name: 'HomeView',
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
