<template>
      
  <div>AdminTagView</div>
<div>
    <div class="related-list">
      <div class="section-title">태그 타입 리스트:</div>
      <div class="tag-box" v-for="tagType in tagTypeList" :key="tagType.tagTypeNo">
        <span @click="showEditTagTypeModal(tagType)">{{ tagType.tagTypeName }}</span>
        <button @click="deleteTagType(tagType.tagTypeNo)">X</button>
      </div>
      <div v-if="editTagTypeModal">
        <input v-model="editTagTypeName">
        <button class="save-button" @click="saveTagTypeName">저장</button>
      </div>
      <br>
      <div>
        <input v-model="newTagType" placeholder="새 태그 타입 추가">
        <button class="save-button" @click="addTagType">추가</button>
      </div>
    </div>

    <div class="related-list">
      <div class="section-title">태그 리스트:</div>
      <div v-for="tagType in tagTypeList" :key="tagType.tagTypeNo">
        <div class="section-title">{{tagType.tagTypeName}}</div>
      <div class="tag-box" v-for="tag in tagList.filter(tag => tag.keyTypeNo === tagType.tagTypeNo)" :key="tag.tagNo">
        <span @click="showEditTagModal(tag)">{{ tag.tagName }}</span>
        <button @click="deleteTag(tag.tagNo)">X</button>
      </div>
      </div>
      <div v-if="editTagModal">
        <input v-model="editTagName">
        <select v-model="editKeyTypeNo">
          <option v-for="tagType in tagTypeList" :value="tagType.tagTypeNo" :key="tagType.tagTypeNo">{{ tagType.tagTypeName }}</option>
        </select>
        <button class="save-button" @click="saveTagName">저장</button>
      </div>
      <br>
      <div>
        <input v-model="newTag" placeholder="새 태그 추가">
        <select v-model="selectedTagType">
          <option v-for="tagType in tagTypeList" :value="tagType.tagTypeNo" :key="tagType.tagTypeNo">{{ tagType.tagTypeName }}</option>
        </select>
        <button class="save-button" @click="addTag">추가</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getJsonAxiosInstance } from '@/api/index'
import { onMounted } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'
import { useUserStore } from '@/stores/users'

export default {
  name: 'AdminTagView',
  
  setup () {
    const user = useUserStore();
    const axios = getJsonAxiosInstance(user.getLoginUserInfo);

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

    // 태그 타입 수정

    const editTagTypeModal = ref(false)
    const editTagTypeNo = ref(0)
    const editTagTypeName = ref('')

    const showEditTagTypeModal = function(selectedTagType){
        editTagTypeModal.value = true
        editTagTypeNo.value = selectedTagType.tagTypeNo
        editTagTypeName.value = selectedTagType.tagTypeName

    }

    const saveTagTypeName = function(){
        
        let data = {
          tagTypeNo : editTagTypeNo.value,
          tagTypeName : editTagTypeName.value
        }
        
        axios.post('/api/admin/tagtypes/set-data', data)
        .then(res => {
            tagTypeList.value = res.data
            editTagTypeModal.value = false
        })
        .catch(err => {
          console.log(err)
        })
    }

    // 태그 수정


    const editTagModal = ref(false)
    const editTagNo = ref(0)
    const editTagName = ref('')
    const editKeyTypeNo = ref(0)

    const showEditTagModal = function(selectedTag){
        editTagModal.value = true
        editTagNo.value = selectedTag.tagNo
        editTagName.value = selectedTag.tagName
        editKeyTypeNo.value = selectedTag.keyTypeNo

    }

    const saveTagName = function(){
      
        let data = {
          tagNo : editTagNo.value,
          tagName : editTagName.value,
          keyTypeNo: editKeyTypeNo.value
        }
        
        axios.post('/api/admin/tags/set-data', data)
        .then(res => {
            tagList.value = res.data
            editTagModal.value = false
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
        deleteTag,
        editTagTypeModal,
        editTagTypeNo,
        editTagTypeName,
        showEditTagTypeModal,
        saveTagTypeName,
        editTagModal,
        editTagNo,
        editTagName,
        editKeyTypeNo,
        showEditTagModal,
        saveTagName
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

.save-button {
  background-color: black; /* 검정 바탕 */
  color: white; /* 하얀색 글씨 */
  border: 2px solid orange; /* 주황색 테두리 */
  border-radius: 4px; /* 모서리를 둥글게 */
  font-size: 16px; /* 글자 크기 */
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