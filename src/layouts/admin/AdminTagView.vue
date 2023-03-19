<template>
      
  <div>AdminTagView</div>
<div>
    <div class="related-list">
      <div class="section-title">태그 타입 리스트:</div>
      <div class="tag-box" v-for="tagType in tagTypeList" :key="tagType.tagTypeNo">
        <span>{{ tagType.tagTypeName }}</span>
        <button @click="deleteTagType(tagType.tagTypeNo)">X</button>
      </div>
      <div>
        <input v-model="newTagType" placeholder="새 태그 타입 추가">
        <button class="add-button" @click="addTagType">추가</button>
      </div>
    </div>

    <div class="related-list">
      <div class="section-title">태그 리스트:</div>
      <div v-for="tagType in tagTypeList" :key="tagType.tagTypeNo">
        <div class="section-title">{{tagType.tagTypeName}}</div>
      <div class="tag-box" v-for="tag in tagList.filter(tag => tag.keyTypeNo === tagType.tagTypeNo)" :key="tag.tagNo">
        <span>{{ tag.tagName }}</span>
        <button @click="deleteTag(tag.tagNo)">X</button>
      </div>
      </div>
      <div>
        <input v-model="newTag" placeholder="새 태그 추가">
        <select v-model="selectedTagType">
          <option v-for="tagType in tagTypeList" :value="tagType.tagTypeNo">{{ tagType.tagTypeName }}</option>
        </select>
        <button class="add-button" @click="addTag">추가</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getJsonAxiosInstance } from '@/api/index'
import { onMounted } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'

export default {
  name: 'AdminTagView',
  
  setup () {

    const axios = getJsonAxiosInstance();

    const tagTypeList = ref([])
    const tagList = ref([])
    
    onMounted(()=>{

        axios.get('api/admin/tagtypes')
        .then(res => {
            tagTypeList.value=res.data
        })
        .catch(err => {
            console.log(err)
        })
        
        axios.get('/api/admin/tags')
        .then(res => {
            tagList.value = res.data
		    })
        .catch(err=>{
          console.log(err)  
        })
    })

    const newTagType = ref('')

    const addTagType = function(){
        let data = {
            tagTypeName : newTagType.value
        }
        axios.post('/api/admin/tagtypes', data)
        .then(res =>{
           tagTypeList.value=res.data
           newTagType.value=''
        })
    }

    const selectedTagType = ref(0)
    const newTag = ref('')

    const addTag = function(){
        let data = {
            keyTypeNo : selectedTagType.value,
            tagName : newTag.value
        }
        axios.post('api/admin/tags', data)
        .then(res => {
            tagList.value = res.data
            newTag.value=''
        })
    }

    const deleteTagType = function(tagTypeNo){
        axios.get(`/api/admin/tagtypes/${tagTypeNo}/deletion`)
        .then(res => {
            tagTypeList.value = res.data
        })
        .catch(err => {
            console.log(err)
        })
    }

    const deleteTag = function(tagNo){
        axios.get(`/api/admin/tags/${tagNo}/deletion`)
        .then(res => {
            tagList.value = res.data
        })
        .catch(err => {
            console.log(err)
        })
    }


    

   return {
        tagTypeList,
        tagList,
        newTagType,
        addTagType,
        selectedTagType,
        newTag,
        addTag,
        deleteTagType,
        deleteTag
   }

  }

}
</script>

<style>

.section-title {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: orange;
}

.related-list {
    border: 1px solid orange;
    border-radius: 5px;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
}

.add-button {
    background-color: black;
    color: white;
    border: 2px solid orange;
  }

.tag-box {
  display: inline-block;
  background-color: #555;
  color: white;
  padding: 5px;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 4px;
}

</style>