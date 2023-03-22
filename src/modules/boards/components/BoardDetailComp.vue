<template>
    <div class="bright-section detail-view">
      <table id="list">
        <thead>
          <tr>
            <th colspan="2">제목</th>
            <th colspan="2">{{ board.boardTitle }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2">작성자</td>
            <td colspan="2">{{ board.nickname}}</td>
          </tr>
          <tr>
            <td colspan="2">작성일</td>
            <td colspan="2">{{ board.createDate }}</td>
          </tr>
          <tr>
            <td colspan="4" class="board-content" style="min-height: 300px;">{{ board.boardContent }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <br>
    <template v-if="loginUser != null && loginUser.userNo == board.userNo">
      <div class="button-container">
        <button class="custom-button edit-button" @click="editBoard">수정</button>
        <button class="custom-button delete-button">삭제</button>
      </div>
    </template>
    <br><br><br><br><br>

    <h6>댓글</h6>
    <div class="button-container">
</div>
    <div class="bright-section comments">
      <table id="list">
        <thead>
          <tr>
            <th colspan="2">작성자</th>
            <th colspan="2">작성날짜</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(comment, index) in comments" :key="index">
            <tr>
              <td colspan="2">{{ comment.nickname }}</td>
              <td colspan="2">{{ comment.status }}</td>
            </tr>
            <tr>
              <td colspan="4" class="comment-content">{{ comment.replyContent }}</td>
            </tr>

          </template>
        </tbody>
      </table>
    </div>
<!-- Add this code right after the closing </div> tag for the comments table and before the comment-form div -->
<div class="button-container">
  <button class="custom-button edit-button">수정</button>
  <button class="custom-button delete-button">삭제</button>
</div>
    <!-- Add this code right after the comments table and before the closing </div> tag -->
    <div class="comment-form">
      <textarea v-model="newComment" class="comment-input" placeholder="댓글을 입력하세요..."></textarea>
      <button @click="addComment" class="comment-submit button-edit">댓글 작성</button>
    </div>
</template>

<script>
import { $getBoardDetail, getReplyList, addReply } from '@/api/board'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/users'
import { useBoardStore } from '@/stores/boards'

export default {
  name: 'BoardDetailComp',
  setup () {
    // Add this code inside the `setup()` function
    const comments = ref([])
    const fetchComments = () => {
      const boardNo = route.params.boardNo
      console.log(boardNo)
      getReplyList(`/reply?boardNo=${boardNo}`)
        .then((res) => {
          comments.value = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const loginUser = useUserStore().getLoginUserInfo

    const board = ref({})

    const route = useRoute()
    const setBoardDetail = () => {
      const boardNo = route.params.boardNo
      $getBoardDetail(boardNo)
        .then((res) => {
          board.value = res.data
        })
        .catch((err) => {
          console.log(err)
        })
      // 임시 댓글 데이터 추가
      board.value.comments = [
        {
          nickname: '댓글 작성자1',
          createDate: '2023-03-16',
          content: '댓글 내용1'
        },
        {
          nickname: '댓글 작성자2',
          createDate: '2023-03-17',
          content: '댓글 내용2'
        }
      ]
    }

    const router = useRouter()
    // 수정창 이동 + 현재 데이터를 router 를 통해 전송
    function editBoard () {
      useBoardStore().setBoardInfo(board.value)
      router.push({ name: 'BoardEditComp' })
    }

    onMounted(() => {
      setBoardDetail()
      fetchComments()
    })

    // Add this code inside the `setup()` function
    const newComment = ref('')

    const addComment = () => {
      if (newComment.value.trim() === '') {
        alert('댓글을 입력하세요.')
        return
      }

      // Send the new comment to the API
      const reply = {
        replyContent: newComment.value
      }
      addReply(`/reply/api/boards/${board.value.boardNo}/addReply`, reply)
        .then((res) => {
          if (res.data.status === 'success') {
            const newCommentData = {
              nickname: res.data.nickname,
              createDate: res.data.createDate,
              content: newComment.value
            }
            board.value.comments.push(newCommentData)
            newComment.value = ''
          } else {
            alert('댓글 작성 중 오류가 발생했습니다.')
          }
        })
        .catch((err) => {
          console.log(err)
          alert('댓글 작성 중 오류가 발생했습니다.')
        })
    }

    // Add 'newComment' and 'addComment' to the returned object
    return {
      board,
      comments,
      newComment,
      addComment,
      loginUser,
      editBoard
    }
  }
}

</script>


<style scoped >
/*디테일뷰 관련*/
/* .container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: transparent;
} */

.bright-section table {
  width: 100%;
  border-collapse: collapse;
}

.bright-section th,
.bright-section td {
  padding: 8px;
  text-align: left;
  border: 1px solid #cccccc;
}

.board-content {
  white-space: pre-wrap;
  min-height: 300px;
}

.bright-section {
  background-color: #ffffff;
}

/* .detail-view {
  padding-bottom: 20px;
  border-bottom: 1px solid #cccccc;
} */

.author-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.comments {
  margin-top: 20px;
}

.comment-list {
  margin-top: 10px;
}

.comment-item {
  padding: 10px;
  border-bottom: 1px solid #cccccc;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.comments h2 {
  font-size: 1.2em;
}

.button-edit {
  background-color: orange;
  color: white;
  margin-top : 10px;
  margin-left: 10px;
  border: none;
  border-radius: 20px;
}

.button-remove {
  background-color: red;
  color: white;
  margin-top : 10px;
  margin-left: 10px;
  border: none;
  border-radius: 20px;
}


.button-container {
  text-align: right;
}

/* 수정된 footer 스타일 추가 */
#footer {
  background-color: transparent;
}

.comment-input {
  width: 100%;
  min-height: 80px;
  margin-bottom: 10px;
  resize: none;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 10px;
}

.comment-submit {
  background-color: orange;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  transition: background-color 0.3s;
}

.comment-submit:hover {
  background-color: orange;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.custom-button {
  background-color: orange;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  transition: background-color 0.3s;
  margin-left: 10px;
}

.custom-button:hover {
  background-color: orange;
}

  #list {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  #list th {
    padding: 10px;
    background-color: #333;
    color: #fff;
    text-align: center;
    font-size: 16px;
  }

  #list td {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  #list td.bno {
    width: 50px;
    text-align: center;
  }

  #list tbody tr:hover {
    background-color: #f5f5f5;
  }
</style>
