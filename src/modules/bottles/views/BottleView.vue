<template>
  <div>
  <div>
    <input type="text" v-model="keyword" placeholder="검색어를 입력하세요">
    <button @click="search">검색</button>
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
  </div>
</template>

<script>
import { getFormAxiosInstance } from '@/api/index'
import { onMounted } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'

export default {
  name: 'BottleView',

  setup () {

    const axios = getFormAxiosInstance();

    const bottles = ref([]);
    const favorites = ref([]);
    const keyword = ref(''); // 검색어 변수 선언

    onMounted(()=>{

      axios.get('/api/bottles/all')
        .then(res => {
          bottles.value = res.data.bottle
          favorites.value = res.data.favorites
		    })
        .catch(err=>{
          console.log(err)
        })
    })

   return {
    bottles,
    favorites,
    keyword
   }

  },

  methods: {

    search(){

      const axios = createAxiosInstance();

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

<style>
</style>

