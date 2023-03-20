<template>
    <router-view />
  <div>
    <input type="text" v-model="keyword" placeholder="검색어를 입력하세요">
    <button @click="search">검색</button>

<!-- 보틀목록 -->
    <table>
      <thead>
        <tr>
          <th>번호</th>
          <th>이름</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bottle in bottles" :key="bottle.bottleNo">
          <td>{{ bottle.bottleNo }}</td>
          <td>
            <router-link :to="{ name:'BottleDetailView', params : { bottleNo : bottle.bottleNo} }">
              {{ bottle.bottleName }}
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getFormAxiosInstance } from '@/api/index'
import { onMounted } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'
import { useUserStore } from '@/stores/users'

export default {
  name: 'BottleView',

  setup () {
    const user = useUserStore()
    const axios = getFormAxiosInstance(user.getLoginUserInfo);

    const bottles = ref([]);
    const favorites = ref([]);
    const tags = ref([]);

    onMounted(()=>{

      // axios.get('/api/bottles/all')
      //   .then(res => {
      //     console.log(res.data)
      //     bottles.value = res.data.bottle
      //     favorites.value = res.data.favorites
      //     })
      //   .catch(err=>{
      //     console.log(err)  
      //   }),

        axios.get('/api/bottles')
          .then(res => {
            console.log(res.data)
            bottles.value = res.data.bottle
            favorites.value = res.data.favorites
            })
          .catch(err=>{
            console.log(err)  
          }),

        axios.get('/api/tags')
        .then(res => {
          console.log(res.data)
          tags.value = res.data.tags
          })
        .catch(err=>{
          console.log(err)  
        })        
    })

   return {
    bottles,
    favorites,
    keyword,
    tags
   }

  },

  methods: {

    search(){

      const axios = getFormAxiosInstance();

      axios.get('/api/bottles/all', {
        params: {
          keyword: this.keyword.value
        }
      })
      .then(res => {
        this.bottles = res.data.bottle
        console.log(res.data)
      }
      )
    }
  
  }
}
</script>

<style scoped>
* {
  color: var(--white-color);
}
</style>