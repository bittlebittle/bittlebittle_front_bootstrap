<template>

<div class="container">

<div class="content-2" id="content" style="height: auto;">

  <table id="table-1">
      <tr>
        <td colspan="2" id="header">{{ board.boardTitle }}</td>
      </tr>
      <tr>
        <td id="profile-pic" rowspan="2"><img id="profile-pic2"
          src="resources/images/orange.PNG"></td>
        <td id="nickname">{{ board.nickname }}</td>
      </tr>
      <tr>
        <td id="date">{{board.createDate }}</td>
      </tr>
      <tr>
        <td style="height: 10px;"></td>
      </tr>
    </table>

    <div>

      <table id="table-2">
        <tbody>
            dadada
        </tbody>
      </table>
      <table id="table-3">
        <tr>
          <!-- <c:choose>
            <c:when test="${ empty loginUser }">

              <td style="width: 50px; height: 40px;">
                <img id="c-pic" src="resources/images/jeju-sea.gif">
              </td>
              <td>
                <textarea id="comment-text" style="resize:none;" readonly>로그인한 사용자만 이용 가능한 서비스입니다. 로그인 후 이용 바랍니다.</textarea>
                <button id="comment-button" disabled>등록하기</button>
              </td>

            </c:when>

            <c:otherwise>

              <td style="width: 50px; height: 40px;">
                <img id="c-pic" src="resources/images/orange.PNG">
              </td>

              <td>
                <textarea id="comment-text" style="resize:none;" placeholder="비방성 댓글은 무통보 삭제됩니다. 서로를 존중하는 탐나지 커뮤니티를 만들어요! 😊 "></textarea>
                <button id="comment-button" onclick="addReply();">등록하기</button>
              </td>

            </c:otherwise>
          </c:choose> -->
        </tr>
      </table>
    </div>

    <!-- 글 수정, 삭제하기-->
    <div id="button-2">
    <v-if test="false">

        <button id="c-write-button-2" onclick="postFormSubmit(2);">삭제하기</button>
        <button id="c-write-button-3" onclick="location.href='list.bo'">목록보기</button>

        <form id="postForm" action="" method="post">
          <input type="hidden" name="bno" value="${ b.boardNo }">
        </form>

      </v-if>

    </div>
  </div>
</div>
  </template>

<script>
import { getBoardDetail } from '@/api/board'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'BoardDetailComp',
  setup () {
    const board = ref({})
    const route = useRoute()
    const setBoardDetail = () => {
      const boardNo = route.params.boardNo
      getBoardDetail(`/api/boards/${boardNo}`)
        .then(res => {
          console.log(res.data)
          board.value = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }

    onMounted(() => (
      setBoardDetail()
    ))

    return { board }
  }
}
</script>

<style scoped >
/*----------------------------------------------------------------------*/
/*디테일뷰 관련*/
#aside {
width: 200px;
height: 100%;
float: left;
}
#content {
	width: 900px;
	height: 100%;
	margin-bottom: 50px;
}
.side-menubar {
	width: 220px;
	margin-left: 40%;
	border-radius: 50px;
}
select:focus {
	outline: 1px solid #39A652;
	box-shadow: 0 0 2px 2px rgba(166, 208, 169, 0.7);
}
input:focus {
	outline: 1px solid #39A652;
	box-shadow: 0 0 2px 2px rgba(166, 208, 169, 0.7);
}
textarea:focus {
	outline: 1px solid #39A652;
	box-shadow: 0 0 2px 2px rgba(166, 208, 169, 0.7);
}
/*------  -------*/
.air {
	z-index: 100;
	animation: a 10s linear infinite alternate;
	position: absolute;
	pointer-events: none;
}
@keyframes a { 0% {
	transform: translate(80px, 70px);
}
20
%
{
transform
:
translate(
90px
,
150px
);
}
40
%
{
transform
:
translate(
100px
,
350px
);
}
60
%
{
transform
:
translate(
200px
,
350px
);
}
80
%
{
transform
:
translate(
230px
,
150px
);
}
100
%
{
transform
:
translate(
230px
,
100px
);
}
}
</style>
