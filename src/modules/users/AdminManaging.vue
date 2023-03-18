<template>
    <div class="admin-container">
      <h1>관리자 회원관리</h1>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>회원번호</th>
              <th>이름</th>
              <th>이메일</th>
              <th>전화번호</th>
              <th>가입날짜</th>
              <th>탈퇴여부</th>
              <th>관리자여부</th>
            </tr>
          </thead>
          <tbody>
            <tr
        v-for="item in paginatedItems"
        :key="item.memberNo"
      >
        <td><input type="checkbox" v-model="item.checked" /></td>
        <td>{{ item.memberNo }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.phoneNumber }}</td>
        <td>{{ item.joinDate }}</td>
        <td>{{ item.withdrawalStatus }}</td>
        <td>{{ item.adminStatus }}</td>
      </tr>
          </tbody>
        </table>
      </div>
      <div class="search-container">
        <label>이름: <input type="text" /></label>
        <label>이메일: <input type="text" /></label>
        <label>전화번호: <input type="text" /></label>
        <button>검색</button>
      </div>

      <div class="pagination">
    <button
      v-for="page in totalPages"
      :key="page"
      @click="setCurrentPage(page)"
      :class="{ active: currentPage === page }"
    >
      {{ page }}
    </button>
</div>

      <div class="button-container">
        <button>선택 삭제</button>
        <button>수정</button>
      </div>
    </div>
  </template>
  
  <script>
import { ref, computed } from 'vue';

export default {
  name: 'AdminUserManagement',
  setup() {
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const totalItems = ref(100); // 전체 회원 수를 설정하십시오. 실제 데이터에 따라 변경됩니다.
    const memberList = ref([]); // 회원 목록 데이터입니다. 실제 데이터에 따라 변경됩니다.

    const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));

    const paginatedItems = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return memberList.value.slice(start, end);
    });

    const setCurrentPage = (page) => {
      currentPage.value = page;
    };

    return {
      currentPage,
      itemsPerPage,
      totalItems,
      memberList,
      totalPages,
      paginatedItems,
      setCurrentPage,
    };
  },
};
</script>
  
  <style scoped>
  .admin-container {
    font-family: 'Arial', sans-serif;
    padding: 20px;
  }
  
  h1 {
    font-size: 32px;
    font-weight: bold;
    color: #333333;
    margin-bottom: 20px;
  }
  
  .table-container {
    width: 100%;
    overflow-x: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  th,
  td {
    text-align: left;
    padding: 10px;
    border: 1px solid #cccccc;
  }
  
  th {
    font-weight: bold;
    background-color: #f2f2f2;
  }
  
  tbody tr:nth-child(even) {
    background-color: #f8f8f8;
  }
  
  .search-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .search-container input {
    padding: 5px;
  }
  
  .button-container {
    display: flex;
    justify-content: flex-end;
  }
  
  button {
    padding: 10px 20px;
    font-size: 14px;
    color: #ffffff;
    background-color: #007bff;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    outline: none;
    margin-left: 10px;
  }
  </style>
  