<template>
    <router-view />
  <div>
    <input type="text" v-model="keyword" placeholder="검색어를 입력하세요">
    <button @click="search">검색</button>
    <br>
    <!-- 태그 목록 -->
    <table class="table table-striped">
      <tbody>
        <tr v-for="tag in tags" :key="tag.tagNo">
          <th scope="row">
            <div class="form-check">
              <label :for="`tag-${tag.tagNo}`">{{ tag.tagName }}</label>
            </div>
          </th>
          <td>
            <div class="form-check" v-for="value in tag.values" :key="value">
              <input class="form-check-input" type="checkbox" :value="value" :id="`tag-${tag.tagNo}-${value}`" v-model="selectedTags[tag.tagNo]">
              <label class="form-check-label" :for="`tag-${tag.tagNo}-${value}`">{{ value }}</label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- <router-view :bottles="filteredBottles" :favorites="favorites" /> -->

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
          <td> {{ bottle.bottleName }}
            <!-- <router-link :to="{ name:'BottleDetailView', params : { bottleNo : bottle.bottleNo} }">
              {{ bottle.bottleName }}
            </router-link> -->
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

export default {
  name: 'BottleView',

  setup () {

    const axios = getFormAxiosInstance();

    const bottles = ref([]);
    const favorites = ref([]);
    const keyword = ref(''); // 검색어 변수 선언
    const tags = ref([]);

    onMounted(()=>{

      axios.get('/api/bottles/all')
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

<style>
</style>