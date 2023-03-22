<template>
<div class="content-notice">
  <div>
    <form @submit.prevent="editNotice" style="margin: 0 auto; width: 730px;">
          <fieldset>
              <table style=" padding-left: 35px; padding-top: 20px;">
                  <tr>
                      <td style="width: 5rem;"><b>제목</b></td>
                      <td>
                        <input type="text" v-model="notice.noticeTitle" id="title"  required>
                      </td>
                  </tr>
                  <tr>
                      <td><b>내용</b></td>
                      <td>
                        <textarea v-model="notice.noticeContent" id="content-text" cols="52" rows="12" required></textarea>
                      </td>
                  </tr>
                  <tr class="buttons">
                      <td colspan="2">
                        <input type="submit" value="수정하기" id="submit">
                        <input type="button" value="뒤로가기" id="cancel">
                      </td>
                  </tr>
              </table>
              <br>
          </fieldset>
      </form>
  </div>
</div>
</template>

<script>
// import { useNoticeStore } from '@/stores/notices'
import { useUserStore } from '@/stores/users'
import { useNoticeStore } from '@/stores/notices'
import { $editNotice } from '@/api/notices'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

export default {
  name: 'NoticeEditComp',
  setup () {
    const notice = useNoticeStore().getNoticeInfo

    const loginUser = useUserStore().getLoginUserInfo

    function editNotice () {
      $editNotice(loginUser.userNo, notice)
        .then(res => {
          console.log(res.data)
          useRouter().push(`/notices/${notice.value.noticeNo}`)
        }).catch(err => console.log(err))
    }

    onMounted(() => {
      console.log(notice)
    })

    return {
      notice,
      editNotice
    }
  }
}
</script>

<style scroped >
/*글쓰기 관련 ----------*/
a{
    text-decoration: none;
    color: #3B3B3B;
}
select:focus {outline: 1px solid #39A652; box-shadow: 0 0 2px 2px rgba(166, 208, 169, 0.7);}
input:focus {outline: 1px solid #39A652; box-shadow: 0 0 2px 2px rgba(166, 208, 169, 0.7);}
textarea:focus {outline: 1px solid #39A652; box-shadow: 0 0 2px 2px rgba(166, 208, 169, 0.7);}

/*게시판 작성하기-----------------------------------------------*/
fieldset {
    background-color: rgb(233, 247, 223);
    border-radius: 50px;
    padding: 20px;
    padding-right: 50px;
    color:rgb(94, 87, 90);
    border: none;
}
legend {
    color: rgb(70, 70, 70);
}
#title {
    background-color: rgb(253, 253, 253);
    border-radius: 5px;
    border: none;
    box-shadow: #BFE9A5 0px 1px 10px;
    padding: 10px;
    width: 550px;
    margin-top:10px;
    margin-bottom: 10px;
}
#content-text {
    background-color: rgb(253, 253, 253);
    border-radius: 5px;
    border: none;
    box-shadow: #BFE9A5 0px 1px 10px;
    padding: 10px;
    resize:none;
    width: 550px;
    margin-bottom: 10px;
}
.buttons {
  text-align: center;
}

.buttons input {
  width: 100px;
  height: 40px;
  background-color: white;
  border-radius: 20px;
  border: none;
  margin-left: 1rem;
}
#submit {
  box-shadow: #f4b967 0px 1px 10px;
}
#submit:hover {
    background-color: #ffae00;
    color: white;
    cursor: pointer;
}
#cancel {
  box-shadow: #f47a67 0px 1px 10px;
}

#cancel:hover {
  background-color: #ff1e00;
    color: white;
    cursor: pointer;
}

input #fileselect {
    background-color: white;
    border: none;
}
td>b {
    font-size: 15px;
}
/*클릭 시 테두리*/
input:focus {outline: 2px solid rgb(151, 197, 145);}
textarea:focus {outline: 2px solid rgb(151, 197, 145);}

</style>
