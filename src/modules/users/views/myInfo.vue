<template>
    <div class="my-info">
      <h2>나의 등록정보</h2>
      <div class="info-edit">
        <div class="input-group">
          <label for="name">이름</label>
          <input type="text" id="name" v-model="name" />
        </div>
        <div class="input-group">
          <label for="nickname">닉네임</label>
          <input type="text" id="nickname" v-model="nickname" />
        </div>
        <div class="input-group">
          <label for="email">이메일</label>
          <input type="email" id="email" v-model="email" />
        </div>
        <div class="input-group">
          <label for="phone">전화번호</label>
          <input type="text" id="phone" v-model="phone" />
        </div>
        <button @click="updateInfo">수정</button>
      </div>

      <!-- 내가 작성한 리뷰 및 댓글 테이블 -->
      <h3>내가 작성한 리뷰 및 댓글</h3>
    <table class="reviews-comments-table">
      <thead>
        <tr>
          <th>내가 작성한 리뷰</th>
          <th>내가 작성한 댓글</th>
        </tr>
      </thead>
      <tbody>
        <!-- 내가 작성한 리뷰 및 댓글 테이블 데이터 -->
        <!-- 실제 데이터를 가져와서 반복문으로 채우십시오 -->
      </tbody>
    </table>
    <button @click="deleteSelected">삭제</button>

    <h3>내가 작성한 리뷰 상세보기</h3>
    <table class="review-details-table">
      <thead>
        <tr>
          <th>상품</th>
          <th>제목</th>
          <th>평점</th>
        </tr>
      </thead>
      <tbody>
        <!-- 내가 작성한 리뷰 상세보기 테이블 데이터 -->
        <!-- 실제 데이터를 가져와서 반복문으로 채우십시오 -->
      </tbody>
    </table>

    </div>
  </template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    // 초기값 설정 (실제로는 SQL에서 가져온 값으로 설정해야 함)
    const name = ref('홍길동')
    const nickname = ref('gil-dong')
    const email = ref('gildong@example.com')
    const phone = ref('010-1234-5678')

    const updateInfo = () => {
      // SQL에 변경된 값 저장하는 코드 작성 필요
      console.log('변경된 정보:', { name: name.value, nickname: nickname.value, email: email.value, phone: phone.value })
    }

    return {
      name,
      nickname,
      email,
      phone,
      updateInfo
    }
  }
}
</script>

  <style scoped>
  .my-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  label {
    margin-bottom: 5px;
  }

  input[type='text'],
  input[type='email'] {
    padding: 5px;
    width: 100%;
  }

  button {
    padding: 5px 10px;
  }
  </style>
