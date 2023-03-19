<template>
 <router-view />

 <!-- 태그 목록 -->
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-6">
        <input type="text" class="form-control" v-model="keyword" placeholder="검색어를 입력하세요">
      </div>
      <div class="col-md-2">
        <button class="btn btn-primary" @click="search">검색</button>
      </div>
      <div v-for="tagType in tagTypeList" :key="tagType.tagTypeNo">
        <div>{{ tagType.tagTypeName }}</div>
        <div>
          <label v-for="tag in tagList.filter(tag => tag.keyTypeNo === tagType.tagTypeNo)" :key="tag.tagNo" class="tag-box">
            <input type="radio" :name="`tag-${tagType.tagTypeNo}`" :value="tag.tagNo" v-model="selectedTags[tagType.tagTypeNo-1]">
            {{ tag.tagName }}
          </label>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <router-view :bottles="filteredBottles" :favorites="favorites" />
    </div>
  </div>


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
          <!-- <td> {{ bottle.bottleName }} -->
            <td>
            <router-link :to="{ name:'BottleDetailView', params : { bottleNo : bottle.bottleNo} }">
              {{ bottle.bottleName }}
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script>
import { getFormAxiosInstance } from '@/api/index'
import { onMounted } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'


export default {
  name: 'BottleAll',

  setup () {

    const axios = getFormAxiosInstance();

    const bottles = ref([]);
    const favorites = ref([]);
    const keyword = ref(''); // 검색어 변수 선언
    const tags = ref([]);
    const tagList = ref([]);
    const tagTypeList = ref([]);
    const selectedTags = ref([]);
    const filteredBottles = ref([]);

    onMounted(()=>{

      axios.get('/api/bottles/all')
        .then(res => {
          console.log('bottles data', res.data)
          bottles.value = res.data.bottle
          favorites.value = res.data.favorites

          })
        .catch(err=>{
          console.log('error', err)
        }),

        axios.get('/api/tags')
        .then(res => {
          console.log('tags data', res.data)
          tags.value = res.data.tags
          tagList.value = res.data.tagList
          tagTypeList.value = res.data.tagTypeList
          selectedTags.value = Array(tagTypeList.value.length).fill('')
          console.log('tagTypeList', res.data.tagTypeList)

          if (selectedTags.value) {
            for (let i = 0; i < selectedTags.value.length; i++) {
              // your code here
              // console.log('bbb', selectedTags.value)
            }
          }
        })
        .catch(err=>{
          console.log('error', err)  
        })        
    })

    const filterBottles = () => {
      let filtered = bottles.value;
      for (let i = 0; i < selectedTags.value.length; i++) {
        if (selectedTags.value[i]) {
          filtered = filtered.filter(bottle => {
            return bottle.tags.find(tag => tag.tagNo === Number(selectedTags.value[i]))
          })
        }
      }
      filteredBottles.value = filtered;
    }

  const filteredTagList = (tagTypeNo) => {
      return tagList.value.filter(tag => tag.keyTypeNo === tagTypeNo);
    }

   return {
    bottles,
    favorites,
    keyword,
    tags,
    tagList,
    tagTypeList,
    selectedTags,
    filteredBottles,
    filteredTagList
   }

  },

  methods: {

    search(){

      const axios = getFormAxiosInstance();

      console.log('키워드 : ', this.keyword);
      console.log('selectedTags', this.selectedTags);
      axios.get('/api/bottles/all', {
        params: {
          keyword: this.keyword
          , tagNoList: this.selectedTags
        }
      })
      .then(res => {
        console.log('RESULT', res.data)
        this.bottles = res.data.bottle
      })
      .catch(err=>{
        console.log('error', err)
      })
    },

    filteredTagList(tagTypeNo) {
      console.log('zzz', this.tagList);
      return this.tagList.filter(tag => tag.keyTypeNo === tagTypeNo);
    }
  
  }
}
</script>

<style>

</style>
