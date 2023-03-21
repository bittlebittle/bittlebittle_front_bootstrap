<template>
  <div class="bottle-detail-view" v-if="bottle">
    <div>
    <img :src="getImage(bottle.imgUrl, bottle.imgCusUrl)" alt="보틀 이미지">
    </div>
    <div>보틀 이름: {{ bottle.bottleName }}</div>
    <div>보틀 내용: {{ bottle.bottleContent }}</div>
    <div>보틀 브랜드: {{ bottle.bottleBrand }}</div>
    <div>보틀 도수: {{ bottle.bottleAbv }}</div>

    <a href="#reviewSection">리뷰 바로보기</a>

    <!-- 관련 보틀 리스트 -->
    <div class="related-list">
      <div class="section-title">관련 보틀 리스트:</div>
      <ul>
        <li v-for="relatedBottle in relatedBottleList" :key="relatedBottle.bottleNo" @click=pageUpdate(relatedBottle.bottleNo) style="display: inline-block; margin-right: 20px;">
          <div>
          <img :src="getImage(relatedBottle.imgUrl, relatedBottle.imgCusUrl)" alt="관련 보틀 이미지"  width="200" height="200">
          </div>
              {{ relatedBottle.bottleName }}
        </li>
      </ul>
    </div>

    <!-- 관련 음식 리스트 -->
    <div class="related-list">
      <div class="section-title">관련 음식 리스트:</div>
      <ul>
        <li v-for="food in foodList" :key="food.foodNo">
          {{ food.foodName }}
        </li>
      </ul>
    </div>

    <!-- 태그 리스트 -->
    <div id="reviewSection" class="related-list">
      <div class="section-title">태그 리스트:</div>
          <div class="tag-box" v-for="tag in tagListByBottle" :key="tag.tagNo">{{ tag.tagName }}</div>
    </div>

    <!-- 리뷰 리스트 -->
    <div class="related-list">
      <div class="section-title">리뷰 리스트:</div>
      <ul>
        <li v-for="review in reviewList" :key="review.reviewNo" @click="showReviewModal(review)">
          {{ review.reviewTitle }}
        </li>
      </ul>
    </div>
    <!-- modal -->
    <b-modal v-model="reviewModal" title="리뷰 상세 내용" v-if="reviewModal">
      <div class="modal-content">
        <div class="modal-header">
          <img :src="getImage(selectedReview.imgUrl, selectedReivew.imgCusUrl)" alt="리뷰 이미지">
          <h5 class="modal-title">{{ selectedReview.reviewTitle }}</h5>
          <button type="button" class="close" aria-label="Close" @click="closeReviewModal()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p class="text-muted">{{ selectedReview.createDate }}</p>
          <p>{{ selectedReview.reviewContent }}</p>
          <p>평점: {{ selectedReview.grade }}</p>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <b-button v-if="selectedReview.userNo === currentUserNo" class="btn btn-edit" @click="showEditReviewModal()">수정</b-button>
        <b-button v-if="selectedReview.userNo === currentUserNo" class="btn btn-delete" @click="deleteReview()">삭제</b-button>
      </div>

    <!-- replyList 출력 -->
    <ul class="list-unstyled">
      <li v-for="reply in replyList" :key="reply.replyNo">
        {{ reply.userNo }}&nbsp;&nbsp;&nbsp;&nbsp;{{ reply.createTime }}&nbsp;&nbsp;&nbsp;&nbsp;{{ reply.replyContent }}
        <button v-if="selectedReview.userNo === currentUserNo" class="btn btn-edit" @click="showEditReplyModal(reply)">수정</button>
        <button v-if="selectedReview.userNo === currentUserNo" class="btn btn-delete" @click="deleteReply(reply.replyNo)">삭제</button>
      </li>
    </ul>

    <b-modal v-model="editReplyModalVisible" title="댓글 수정" v-if="editReplyModalVisible">
      <div class="modal-content">
        <form @submit.prevent="saveReply">
          <div>
            <label for="replyContent">내용:</label><br>
            <textarea class="form-control" id="replyContent" v-model="editReplyContent"></textarea>
          </div>
          <br>
          <button class="btn btn-primary" type="submit">수정 완료</button>
          <button @click="closeEditReplyModal()">취소</button>
        </form>
      </div>
    </b-modal>

    <!-- reply 작성 폼 -->
  <form @submit.prevent="addReply">
    <div class="form-group">
      <label for="replyContent">댓글 작성</label>
      <textarea class="form-control" id="replyContent" v-model="newReplyContent"></textarea>
    </div>
    <button type="submit" class="btn btn-primary custom-button">작성</button>
  </form>
    </b-modal>

      <!-- 리뷰 수정 모달 -->
  <b-modal v-model="editReviewModalVisible" title="리뷰 수정" v-if="editReviewModalVisible">
      <div class="edit-modal-content">
        <form @submit.prevent="saveReview">
        <div>
          <label for="reviewTitle">제목:</label>
          <input class="review-form-control" type="text" id="reviewTitle" v-model="editReviewTitle"/>
        </div>
        <div>
          <label for="reviewContent">내용:</label>
          <textarea class="review-form-control" id="reviewContent" v-model="editReviewContent"></textarea>
        </div>
         <div>
        <label for="grade">점수:</label>
        <fieldset id="grade">
          <input type="radio" id="score5" name="score" value="5" v-model="editGrade">
          <label for="score5">5점</label>
          <input type="radio" id="score4" name="score" value="4" v-model="editGrade">
          <label for="score4">4점</label>
          <input type="radio" id="score3" name="score" value="3" v-model="editGrade">
          <label for="score3">3점</label>
          <input type="radio" id="score2" name="score" value="2" v-model="editGrade">
          <label for="score2">2점</label>
          <input type="radio" id="score1" name="score" value="1" v-model="editGrade">
          <label for="score1">1점</label>
        </fieldset>
      </div>
        <button class="btn btn-primary" type="submit">작성 완료</button>
        <button @click="closeEditModal()">취소</button>
      </form>
      </div>
    </b-modal>

    <!-- 리뷰 작성 폼 -->
<div class="related-list">
  <div class="section-title">리뷰 작성:</div>
  <form @submit.prevent="addReview">
    <div class="form-group">
          <label for="imgUrl">이미지:</label>
          <input type="file" class="form-control" id="imgUrl" accept="image/*" @change="handleImageUpload">
        </div>
    <div class="form-group">
      <label for="reviewTitle">제목:</label>
      <input type="text" id="reviewTitle" v-model="reviewTitle" class="review-form-control" />
    </div>
    <div class="form-group">
      <label for="reviewContent">내용:</label>
      <textarea id="reviewContent" v-model="reviewContent" class="review-form-control"></textarea>
    </div>
    <div class="form-group">
      <label>점수:</label>
      <div class="rating-input">
        <input type="radio" id="score5" name="score" value="5" v-model="grade">
        <label for="score5">5점</label>
        <input type="radio" id="score4" name="score" value="4" v-model="grade">
        <label for="score4">4점</label>
        <input type="radio" id="score3" name="score" value="3" v-model="grade">
        <label for="score3">3점</label>
        <input type="radio" id="score2" name="score" value="2" v-model="grade">
        <label for="score2">2점</label>
        <input type="radio" id="score1" name="score" value="1" v-model="grade">
        <label for="score1">1점</label>
      </div>
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-primary">작성 완료</button>
    </div>
  </form>
</div>
  </div>

</template>

<script>
import { getFormAxiosInstance } from '@/api/index'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/users.js'

export default {
  name: 'BottleDetailView',

  props: {
    bottleNo: {
      type: String,
      required: true
    }
  },

  setup (props) {

    const user = useUserStore()
    const axios = user.getLoginUserInfo ? getFormAxiosInstance(user.getLoginUserInfo) : getFormAxiosInstance('')
    const currentUserNo = user.getLoginUserInfo?.userNo

    const bottle = ref(null)
    const relatedBottleList = ref([])
    const foodList = ref([])
    const tagListByBottle = ref([])
    const reviewList = ref([])
    const reviewTitle = ref('')
    const reviewContent = ref('')
    const grade = ref(0)

    const getBottle = function (hhh) {
      let url = ''
      if (!hhh) {
        url = `/api/bottles/${props.bottleNo}`
      } else {
        url = '/api/bottles/' + hhh
      }
      axios.get(url)
        .then(res => {
          bottle.value = res.data.bottle
          relatedBottleList.value = res.data.relatedBottleList
          foodList.value = res.data.foodList
          tagListByBottle.value = res.data.tagListByBottle
          reviewList.value = res.data.reviewList

          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }

    // 이미지
    function getImage (imgUrl, imgCusUrl) {
      if (imgCusUrl != null) {
        return `http://localhost:8080/bittlebittle/image?path=bottle&name=${imgCusUrl}`
      } else {
        return `http://localhost:8080/bittlebittle/image?path=bottle&name=${imgUrl}`
      }
    }


    // 리뷰 작성
    
    const addReviewImage = ref()
    const handleImageUpload = function (event) {
      addReviewImage.value = event.target.files[0]
    }

    const addReview = function () {
      const url = `/api/bottles/${bottle.value.bottleNo}/reviews`

      const data = new FormData()
      data.append('userNo', user.getLoginUserInfo.userNo)
      data.append('reviewTitle', reviewTitle.value)
      data.append('reviewContent', reviewContent.value)
      data.append('grade', grade.value)

      if(addReviewImage.value){
        data.append('imgUrlOrigin', addReviewImage.value)
      }


      axios.post(url, data)
        .then(res => {
        // 리뷰 등록 후 새로고침 없이 해당 보틀의 리뷰 리스트 갱신
          reviewList.value = res.data
          reviewTitle.value = ''
          reviewContent.value = ''
          grade.value = ''
          addReviewImage.value=''
        })
        .catch(err => {
          console.log(err)
        })
    }

    const router = useRouter()

    const pageUpdate = (bottleNo) => {
      reviewModal.value = false
      editReviewModalVisible.value = false
      router.push('/bottles/' + bottleNo)
      getBottle(bottleNo)
    }

    onMounted(() => {
      getBottle()
    })

    // Function to show the modal with review details
    const selectedReview = ref(null)
    const reviewModal = ref(false)
    const replyList = ref([])

    const showReviewModal = (review) => {
      axios.get(`/api/bottles/${bottle.value.bottleNo}/reviews/${review.reviewNo}`)
        .then(res => {
          replyList.value = res.data.replyList
        })
        .catch(err => {
          console.log(err)
        })

      selectedReview.value = review
      reviewModal.value = true
      editReviewModalVisible.value = false
      editReplyModalVisible.value=false
    }

    const closeReviewModal = () => {
      selectedReview.value = null
      reviewModal.value = false
      editReviewModalVisible.value = false
      editReplyModalVisible.value = false
    }

    const editReviewModalVisible = ref(false)

    const showEditReviewModal = () => {
      reviewModal.value = false
      editReviewModalVisible.value = true
      editReviewNo.value = selectedReview.value.reviewNo
      editReviewTitle.value = selectedReview.value.reviewTitle
      editReviewContent.value = selectedReview.value.reviewContent
      editGrade.value = selectedReview.value.grade
    }

    const editReviewNo = ref(0)
    const editReviewTitle = ref('')
    const editReviewContent = ref('')
    const editGrade = ref(0)

    const saveReview = function () {
      const url = `/api/bottles/${bottle.value.bottleNo}/reviews/set-data`

      const data = new FormData()
      data.append('reviewNo', editReviewNo.value)
      data.append('reviewTitle', editReviewTitle.value)
      data.append('reviewContent', editReviewContent.value)
      data.append('grade', editGrade.value)

      axios.post(url, data)
        .then(res => {
        // 리뷰 등록 후 새로고침 없이 해당 보틀의 리뷰 리스트 갱신

          reviewList.value = res.data
          reviewModal.value = true
          editReviewModalVisible.value = false
          selectedReview.value.reviewTitle=editReviewTitle.value
          selectedReview.value.reviewContent=editReviewContent.value
          selectedReview.value.grade=editGrade.value

        })
        .catch(err => {
          console.log(err)
        })
    }

    // 리뷰 삭제
    const deleteReview = function () {
      axios.get(`/api/bottles/${bottle.value.bottleNo}/reviews/${selectedReview.value.reviewNo}/deletion`)
        .then(res => {
          reviewList.value = res.data
          reviewModal.value = false
          editReviewModalVisible.value = false
        })
    }

    const closeEditModal = () => {
      editReviewModalVisible.value = false
    }

    const newReplyContent = ref('')

    const addReply = function () {
      const data = new FormData()
      data.append('userNo', user.getLoginUserInfo.userNo)
      data.append('replyContent', newReplyContent.value)

      axios.post(`/api/bottles/${bottle.value.bottleNo}/reviews/${selectedReview.value.reviewNo}/replies`, data)
        .then(res => {
          replyList.value = res.data
          newReplyContent.value = ''
        }
        )
    }

    // 리플 수정
    const editReplyModalVisible = ref(false)
    const editReplyContent = ref('')
    const selectedReplyNo = ref(0)

    const showEditReplyModal = function(selectedReply){
      editReplyModalVisible.value = true
      editReplyContent.value = selectedReply.replyContent
      selectedReplyNo.value = selectedReply.replyNo
    }

    const saveReply = function(){
      const data = new FormData()
      data.append('replyNo', selectedReplyNo.value)
      data.append('replyContent', editReplyContent.value)

      axios.post(`/api/bottles/${bottle.value.bottleNo}/reviews/${selectedReview.value.reviewNo}/replies/set-data`, data)
      .then(res=> {
        replyList.value=res.data
        editReplyModalVisible.value=false
      })
      .catch(err => {
        console.log(err)
      })
    }

    const closeEditReplyModal = function(){
      editReplyModalVisible.value=false
    }

    // 리플 삭제
    const deleteReply = function (replyNo) {
      axios.get(`/api/bottles/${bottle.value.bottleNo}/reviews/${selectedReview.value.reviewNo}/replies/${replyNo}/deletion`)
        .then(res => {
          replyList.value = res.data
        })
    }

    return {
      bottle,
      relatedBottleList,
      foodList,
      tagListByBottle,
      reviewList,
      reviewTitle,
      reviewContent,
      grade,
      getBottle,
      addReview,
      pageUpdate,
      selectedReview,
      reviewModal,
      showReviewModal,
      replyList,
      closeReviewModal,
      editReviewModalVisible,
      showEditReviewModal,
      editReviewNo,
      editReviewTitle,
      editReviewContent,
      editGrade,
      saveReview,
      closeEditModal,
      newReplyContent,
      addReply,
      deleteReview,
      deleteReply,
      user,
      currentUserNo,
      editReplyModalVisible,
      closeEditReplyModal,
      editReplyContent,
      showEditReplyModal,
      selectedReplyNo,
      saveReply,
      getImage,
      addReviewImage,
      handleImageUpload
    }
  }
}
</script>

<style scoped>

  .bottle-detail-view {
    background-color: black;
    color: white;
    padding: 20px;
  }

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

 /* Style for rating stars */
  .rating-input input[type='radio'] {
    display: none;
  }

  .rating-input label {
    display: inline-block;
    font-size: 25px;
    color: #ccc;
    cursor: pointer;
    transition: color 0.2s;
  }

  .rating-input label:before {
    content: '★';
    margin-right: 5px;
    color: #ccc;
  }

  .rating-input input[type='radio']:checked + label {
    color: #FF8000;
  }

  .rating-input input[type='radio']:checked + label:before {
    color: #FF8000;
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
}

  .modal-dialog {
    max-width: 80%;
    margin: 1.75rem auto;
  }

  .modal-content {
    background-color: #000;
    color: #ff9933;
    border: 3px solid #ff9933;
    padding: 10px;
  }

  .edit-modal-content {
    width: 50%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #000;
    color: #ff9933;
    border: 3px solid #ff9933;
    padding: 10px;
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

  .btn-edit, .btn-delete {
    color: #fff;
    border: 1px solid #ff9933;
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
  height: 50px;
  width: 500px;
}
</style>
