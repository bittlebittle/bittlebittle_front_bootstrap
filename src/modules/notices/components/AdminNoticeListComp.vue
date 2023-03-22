<template>
  <div class="container">
   <div class="content"> <!-- 수정 -->
     <p class="title">커뮤니티</p>
     <div class="search-container">
       <select v-model="searchOption" style="margin-right: 10px;">
         <option value="noticeTitle">제목</option>
         <option value="nickname">작성자</option>
         <option value="noticeContent">내용</option>
       </select>
       <input v-model="searchText" placeholder="검색어를 입력하세요" />
       <button @click="filterNoticeList">검색</button>
     </div>
     <table id="noticeList">
      <thead>
         <tr>
          <th><input type="checkbox" v-model="selectAll" @change="toggleAllCheckboxes" /></th> <!-- 추가 -->

           <th>No</th>
           <th style="width: 380px;">제목</th>
           <th>작성자</th>
           <th>작성일</th>
         </tr>
       </thead>
       <tbody>

        <template v-if="state.noticeList.length">
  <tr
    v-for="item in state.noticeList"
    :key="item.noticeNo"
    @click="noticeDetail(item.noticeNo)"
    id="table-hover"
  >
    <td><input type="checkbox" v-model="item.checked" /></td> <!-- 체크박스 추가 -->
    <td class="bno">{{ item.noticeNo }}</td>
    <td>{{ item.noticeTitle }}</td>
    <td>{{ item.nickname }}</td>
    <td>{{ item.createDate }}</td>
  </tr>
</template>

         <template v-else>
           <tr>
             <td colspan="4">게시글이 존재하지 않습니다.</td>
           </tr>
         </template>
       </tbody>
     </table>
     <div class="write-button-container">
       <button id="write-button" onclick="location.href='enrollForm.bo'">작성하기</button>
     </div>

     <!-- Add the 'Delete Selected' button next to the 'Write' button -->
<div class="write-button-container">
  <button @click="deleteSelected" class="custom-button">선택 삭제</button> <!-- 추가 -->
  <button id="write-button" onclick="location.href='enrollForm.bo'">작성하기</button>
</div>

   </div> <!-- 수정 -->
 </div>
</template>

<style scoped>
  .container {
    margin: 0 auto;
    width: 900px;
    min-height: 70vh; /* 추가 */
    display: flex;
    flex-direction: column; /* 추가 */
    background-color: #FFFAF6; /* 추가 */
  }

  .title {
    font-size: 35px;
    text-align: center;
    margin-bottom: 30px;
  }

  .content {
    flex-grow: 1; /* 추가 */
    background-color: #FFFAF6; /* 추가 */
    padding: 20px; /* 추가 */
    border-radius: 5px; /* 추가 */
  }

  .search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  .search-container button {
    margin-left: 10px;
    padding: 5px 10px;
    background-color: #39a652;
    border: 1px solid #39a652;
    border-radius: 5px;
    color: white;
    cursor: pointer;
  }

  .search-container button:hover {
    background-color: #2c803c;
  }

  #boardList {
    background-color: white;
    margin-bottom: 20px;
  }

  table {
    width: 98%;
    border-collapse: collapse;
    line-height: 15px;
    color: solid rgb(255, 255, 255);
  }

  table td,
  th {
    border-top: 1px solid rgb(217, 233, 207);
    border-bottom: 1px solid rgb(217, 233, 207);
    border-collapse: collapse;
    text-align: center;
    padding: 10px;
  }

  th {
    background: rgb(217, 233, 207);
  }

  a {
    text-decoration: none;
    color: black;
  }

  a:hover {
    font-weight: bold;
  }

  .write-button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

  #write-button {
    padding: 10px;
    font-size: 13px;
    background-color: #FAAA74;
    border: 1px solid rgb(245, 228, 224);
    border-radius: 5px;
  }

  #write-button:hover {
    background-color: #FD6500;
    color: white;
    cursor: pointer;
  }

  #table-hover:hover {
    background-color: #FFFAF6;
    cursor: pointer;
  }
</style>

<script>
import { ref, onMounted } from 'vue'
import { $getNoticeList } from '@/api/notice'
import router from '@/router'

export default {
  name: 'AdminNoticeListComp',
  setup () {
    const selectAll = ref(false)

    const toggleAllCheckboxes = () => {
      state.value.noticeList.forEach(item => {
        item.checked = selectAll.value
      })
    }

    const deleteSelected = () => {
      state.value.noticeList = state.value.noticeList.filter(item => !item.checked)
    }

    const theadList = [
      '글번호', '글제목', '작성일', '작성자'
    ]

    const state = ref({ noticeList: [] })

    const setNoticeList = () => {
      $getNoticeList('/api/notices')
        .then(res => {
          console.log(res.data)
          state.value.noticeList = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }

    const noticeDetail = (noticeNo) => {
      router.push(`/notices/${noticeNo}`)
    }

    const searchOption = ref('noticeTitle')
    const searchText = ref('')

    const filterNoticeList = () => {
      if (searchText.value.trim() === '') {
        setNoticeList()
      } else {
        const filteredList = state.value.noticeList.filter((item) =>
          item[searchOption.value].toLowerCase().includes(searchText.value.toLowerCase())
        )
        state.value.noticeList = filteredList
      }
    }

    onMounted(() => {
      setNoticeList()
    })

    return {
      theadList,
      state,
      noticeDetail,
      searchOption,
      searchText,
      filterNoticeList,
      selectAll, // 추가
      toggleAllCheckboxes, // 추가
      deleteSelected // 추가
    }
  }
}
</script>
