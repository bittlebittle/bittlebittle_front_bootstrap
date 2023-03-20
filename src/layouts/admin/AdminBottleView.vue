<template>

  <button class="btn btn-primary" @click="showAddBottleModal()">보틀 추가</button>

  <router-link :to="{ name:'AdminTagView' }">
            <button class="btn btn-primary">태그 수정</button>
  </router-link>

  <!-- bottle 추가 modal -->
  <b-modal v-model="addBottleModal" title="보틀 추가" v-if="addBottleModal">
    <div class="modal-content" style="padding: 20px;">
      <div class="modal-header">
        <h5 class="modal-title">보틀 추가</h5>
        <button type="button" class="close" aria-label="Close" @click="closeAddBottleModal()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="imgUrl">보틀 이미지</label>
            <input type="file" class="form-control-file" id="imgUrl" accept="image/*" @change="handleImageUpload">
          </div>
          <div class="form-group">
            <label for="bottleName">보틀 이름</label>
            <input type="text" class="form-control" id="bottleName" v-model="addBottleName">
          </div>
          <div class="form-group">
            <label for="bottleContent">보틀 내용</label>
            <textarea class="form-control" id="bottleContent" rows="3" v-model="addBottleContent"></textarea>
          </div>
          <div class="form-group">
            <label for="bottleBrand">보틀 브랜드</label>
            <input type="text" class="form-control" id="bottleBrand" v-model="addBottleBrand">
          </div>
          <div class="form-group">
            <label for="bottleAbv">보틀 도수</label>
            <input type="number" class="form-control" id="bottleAbv" v-model="addBottleAbv">
          </div>
          <div>
            <div v-for="tagType in tagTypeList" :key="tagType.tagTypeNo">
              <div>{{ tagType.tagTypeName }}</div>
              <div>
                <label v-for="tag in tagList.filter(tag => tag.keyTypeNo === tagType.tagTypeNo)" :key="tag.tagNo" class="tag-box">
                  <input type="radio" :name="`new-tag-${tagType.tagTypeNo}`" :value="tag.tagNo" v-model="selectedAddTags[tagType.tagTypeNo-1]">
                  {{ tag.tagName }}
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="d-flex justify-content-end">
        <b-button class="btn btn-primary" @click="addBottle()">추가</b-button>
        <b-button class="btn btn-secondary" @click="closeAddBottleModal()">취소</b-button>
      </div>
    </div>
    </b-modal>

  <div>AdminBottleView</div>
  <div>
  <div>
    <input type="text" v-model="keyword" placeholder="검색어를 입력하세요">
    <button @click="search">검색</button>

    <table>
      <thead>
        <tr>
          <th>번호</th>
          <th>이름</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bottle in bottles" :key="bottle.bottleNo">
          <td>{{ bottle.bottleNo }}</td>
          <td>
            <router-link :to="{ name:'AdminBottleDetailView', params : { bottleNo : bottle.bottleNo} }">
              {{ bottle.bottleName }}
            </router-link>
          </td>
          <td>
            <button class="delete-button" @click="deleteBottle(bottle.bottleNo)">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script>
import { getFormAxiosInstance } from '@/api/index'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/users'

export default {
  name: 'AdminBottleView',

  setup () {
    const user = useUserStore()
    const axios = getFormAxiosInstance(user.getLoginUserInfo)

    const bottles = ref([])
    const favorites = ref([])
    const keyword = ref('') // 검색어 변수 선언

    onMounted(() => {
      axios.get('/api/bottles/all')
        .then(res => {
          console.log(res.data.bottle)
          bottles.value = res.data.bottle
          favorites.value = res.data.favorites
		    })
        .catch(err => {
          console.log(err)
        })
    })

    const addBottleModal = ref(false)
    const addBottleName = ref('')
    const addBottleContent = ref('')
    const addBottleBrand = ref('')
    const addBottleAbv = ref(0)
    const tagTypeList = ref([])
    const tagList = ref([])
    const selectedAddTags = ref([])

    const showAddBottleModal = function () {
      addBottleModal.value = true

      axios.get('/api/admin/tagtypes')
        .then(res => {
          tagTypeList.value = res.data
        })
        .catch(err => {
          console.log(err)
        })

      axios.get('/api/admin/tags')
        .then(res => {
          tagList.value = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }

    const addBottle = function () {
      const url = '/api/admin/bottles'

      const data = new FormData()
      data.append('bottleName', addBottleName.value)
      data.append('bottleContent', addBottleContent.value)
      data.append('bottleBrand', addBottleBrand.value)
      data.append('bottleAbv', addBottleAbv.value)
      data.append('tagNoList', selectedAddTags.value)
      data.append('imgUrlOrigin', addBottleImage.value)
      // imgUrl에 이미지 루트 넣어야됨!

      axios.post(url, data)
        .then(res => {
          bottles.value = res.data
          addBottleModal.value = false
          addBottleName.value = ''
          addBottleContent.value = ''
          addBottleBrand.value = ''
          addBottleAbv.value = 0
          selectedAddTags.value = []
        })
    }

    const closeAddBottleModal = function () {
      addBottleModal.value = false
    }

    const deleteBottle = function (bottleNo) {
      axios.get(`/api/admin/bottles/${bottleNo}/deletion`)
        .then(res => {
          bottles.value = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }

    // 이미지

    const addBottleImage = ref()
    const handleImageUpload = function (event) {
      addBottleImage.value = event.target.files[0]
    }

    //
    const imageUrl = 'http://localhost:8080/bittlebittle/image?path=bottle&name=스크린샷 2023-03-18 오후 6.12.49.png'


    return {
      bottles,
      favorites,
      keyword,
      addBottleModal,
      showAddBottleModal,
      addBottleName,
      addBottleContent,
      addBottleBrand,
      addBottleAbv,
      tagTypeList,
      tagList,
      selectedAddTags,
      addBottle,
      closeAddBottleModal,
      deleteBottle,
      addBottleImage,
      handleImageUpload,
      imageUrl
    }
  }
  // , methods: {

  //   search () {
  //     const axios = createAxiosInstance()

  //     axios.get('/api/bottles/all', {
  //       params: {
  //         keyword: this.keyword.value
  //       }
  //     })
  //       .then(res => {
  //         this.bottles = res.data.bottle
  //         console.log(res.data)
  //           }
  //           )
  //       }
  //   }
}

</script>

<style scoped>
  /* 각 섹션 제목 스타일 */
  .section-title {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: orange;
  }

  /* 관련 보틀/음식/태그/리뷰 리스트 스타일 */
  .related-list {
    border: 1px solid orange;
    border-radius: 5px;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .related-list ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .related-list li {
    text-decoration: underline;
    text-decoration-color: orange;
    margin-bottom: 5px;
    color: white;
  }
  .related-list li:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  .form-group {
      margin-bottom: 10px;
    }

  .review-form-control {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 2px solid black;
    border-radius: 5px;
  }

  .btn-primary {
  background-color: orange;
  border-color: orange;
  color: white;
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

  .modal-dialog {
    max-width: 80%;
    margin: 1.75rem auto;
  }

  .modal-content {
    background-color: #000;
    color: #ff9933;
    border: 3px solid #ff9933;
  }

  .modal-header {
    border-bottom: none;
  }

  .modal-title {
    color: #fff;
  }

  .modal-body {
    color: #fff;
  }

  .modal-body p {
    color: white;
  }

  .close {
    color: #ff9933;
  }

  .btn-primary.custom-button {
  background-color: orange;
  border-color: orange;
  color: white;
}
.btn-primary.custom-button:hover {
  background-color: white;
  border-color: orange;
  color: orange;
}

.form-control {
  height: 70px;
  width: 300px;
}

.delete-button {
  background-color: black; /* 검정 바탕 */
  color: white; /* 하얀색 글씨 */
  border: 2px solid orange; /* 주황색 테두리 */
  border-radius: 4px; /* 모서리를 둥글게 */
  font-size: 16px; /* 글자 크기 */
  }

button {
  margin-right: 10px;
}
</style>
