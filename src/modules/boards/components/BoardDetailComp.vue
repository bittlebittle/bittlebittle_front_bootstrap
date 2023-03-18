<template>
    <div class="bright-section detail-view">
      <table>
        <thead>
          <tr>
            <th colspan="2">제목</th>
            <th colspan="2">{{ board.boardTitle }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2">작성자</td>
            <td colspan="2">작성날짜</td>
          </tr>
          <tr>
            <td colspan="2">{{ board.nickname }}</td>
            <td colspan="2">{{ board.createDate }}</td>
          </tr>
          <tr>
            <td colspan="4" class="board-content">{{ board.content }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="bright-section comments">
      <h2>댓글</h2>
      <table>
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

    <!-- Add this code right after the comments table and before the closing </div> tag -->
    <div class="comment-form">
      <textarea v-model="newComment" class="comment-input" placeholder="댓글을 입력하세요..."></textarea>
      <button @click="addComment" class="comment-submit">댓글 작성</button>
    </div>
</template>

<script>
import { getBoardDetail, getReplyList, addReply } from '@/api/board'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

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
          console.error(err)
        })
    }

    const board = ref({})
    const route = useRoute()
    const setBoardDetail = () => {
      const boardNo = route.params.boardNo
      getBoardDetail(boardNo)
        .then((res) => {
          console.log(res.data)
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
          console.error(err)
          alert('댓글 작성 중 오류가 발생했습니다.')
        })
    }

    // Add 'newComment' and 'addComment' to the returned object
    return { board, comments, newComment, addComment }
  }
}

</script>


<style scope>
/*디테일뷰 관련*/
.container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: transparent;
}

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
}

.bright-section {
  background-color: #ffffff;
}

.detail-view {
  padding-bottom: 20px;
  border-bottom: 1px solid #cccccc;
}

.author-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.board-content {
  white-space: pre-wrap;
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

/* 수정된 footer 스타일 추가 */
#footer {
  background-color: transparent;
}
</style>
