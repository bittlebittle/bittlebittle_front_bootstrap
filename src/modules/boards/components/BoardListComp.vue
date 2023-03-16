<template>
<!-- <div class="container">
    <h4>자유게시판</h4>
    <table class="table table-striped table-hover text-white ">
      <thead>
        <tr>
          <th class="text-white" scope="col" v-for="item in theadList" :key="item">{{ item }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th class="text-white" scope="row">1</th>
          <td class="text-white">Mark</td>
          <td class="text-white">Otto</td>
          <td class="text-white">@mdo</td>
        </tr>
        <tr>
          <th class="text-white" scope="row">1</th>
          <td class="text-white">Mark</td>
          <td class="text-white">Otto</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </table>
  </div> -->

  <!-- 여기부터 컨텐츠 영역 ---------------------------->
<div class="container">

  <!-- <div class="content" id="aside" style=" background: white">

    <div class="side-menu" style="margin-left: 10px;">
      <div class="side-menubar">
        <img src="resources/images/jeju-sea.gif" style="width: 350px; border-radius: 270px; border: 15px solid rgb(235, 235, 235);">
      </div>
    </div>

  </div> -->

  <div class="content-2" id="content" style=" height:650px;">
    <p style="margin-top: 10px; margin-bottom: 20px; font-size: 25px; display:block;">커뮤니티</p>
    <div>
      <button id="write-button" onclick="location.href='enrollForm.bo'" >작성하기</button>
    </div>
    <table id="boardList">
      <thead>
        <tr>
          <th>No</th>
          <th style="width: 380px;">제목</th>
          <th>작성자</th>
          <th>작성일</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="state.boardList.length">
          <tr v-for="item in state.boardList" :key="item"  @click="boardDetail(item.boardNo)"
              id="table-hover">
                  <td class="bno">{{ item.boardNo }}</td>
                  <td>{{ item.boardTitle }}</td>
                  <td>{{ item.nickname }}</td>
                  <td>{{ item.createDate }}</td>
          </tr>
      </template>
      <template v-else>
          <tr v-slse>
            <td colspan="4">게시글이 존재하지 않습니다.</td>
          </tr>
      </template>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import { getBoardList } from '@/api/board'
import { ref, onMounted } from 'vue'
import router from '@/router'

export default {
  name: 'BoardListComp',
  setup () {
    const theadList = [
      '글번호', '글제목', '작성일', '작성자'
    ]

    const state = ref({ boardList: {} })

    const setBoardList = () => {
      getBoardList('/api/boards')
        .then(res => {
          console.log(res.data)
          state.value.boardList = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }

    const boardDetail = (boardNo) => {
      router.push(`/boards/${boardNo}`)
    }

    onMounted(() => (
      setBoardList()
    ))

    return {
      theadList, state, boardDetail
    }
  }
}
</script>

<style scope>
/*----------------------------------------------------------------------*/
  /*리스트뷰 관련*/
  .container {
    margin-left: 100px;
  }
  #aside {
    width: 200px;
    height: 800px;
    float: left;
  }
  #content {
    width: 900px;
    height: 800px;
  }

  #content {
    background-color: white;
  }

  .side-menubar {
    width: 220px;
    margin-left: 40%;
    border-radius: 50px;
  }

  select:focus {outline: 1px solid #39A652; box-shadow: 0 0 2px 2px rgba(166, 208, 169, 0.7);}
        input:focus {outline: 1px solid #39A652; box-shadow: 0 0 2px 2px rgba(166, 208, 169, 0.7);}
        textarea:focus {outline: 1px solid #39A652; box-shadow: 0 0 2px 2px rgba(166, 208, 169, 0.7);}

/*------ 자유게시판 관련 --------*/
table {
  width: 880px;
  border-collapse: collapse;
  line-height: 15px;
  color: solid rgb(255,255,255);
}
table td,th {
    border-top:1px solid rgb(217, 233, 207);
    border-bottom:1px solid rgb(217, 233, 207);
    border-collapse: collapse;
    text-align: center;
    padding: 10px;
}
th {
  background: rgb(217, 233, 207);
}
a{
    text-decoration: none;
    color: black;
}
a:hover {
  font-weight: bold;
}
#write-button {
  margin-bottom: 20px;
  margin-left: 812px;
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
