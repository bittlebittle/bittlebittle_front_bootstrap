<template>
  <h4>리뷰작성</h4>
    <div class="tm-bg-white tm-p-4">
        <form action="index.html" method="post" class="contact-form">
            <div class="form-group">
                <input type="text" id="contact_name" name="contact_name" class="form-control" placeholder="제목" required="">
            </div>
            <div class="form-group">
                <textarea id="contact_message" name="contact_message" class="form-control" rows="9" placeholder="내용을 입력해주세요" required=""></textarea>
            </div>
            <button type="submit" class="btn btn-primary tm-btn-primary">등록하기</button>
        </form>
    </div>
    <!-- 댓글 -->
    <h4>댓글작성</h4>
    <div class="col-lg-7 col-12 mx-auto">
            <form class="custom-form comment-form" action="#" method="get" role="form">

                <input type="text" name="comment-name" id="comment-name" class="form-control" placeholder="Your Name" required="">
                <textarea class="form-control" rows="5" id="comment" name="comment" placeholder="Write a comment" required=""></textarea>

                <div class="col-lg-3 col-4 mx-auto">
                    <button type="submit" class="form-control" id="subscribe">Submit</button>
                </div>
            </form>

            <div class="news-author d-flex flex-wrap align-items-center">
                <img src="" class="img-fluid news-author-image" alt="">

                <div class="ms-4 w-50">
                    <p class="mb-2">Donec pharetra tellus nulla, aliquam elementum lorem hendrerit non.</p>

                    <a href="#">David Martin</a>
                </div>

                <span class="ms-auto">14 hours ago</span>
            </div>

            <div class="news-author d-flex flex-wrap align-items-center">
                <img src="" class="img-fluid news-author-image" alt="">

                <div class="ms-4 w-50">
                    <p class="mb-2">Quisque non libero ut mauris fermentum efficitur ac ut nibh.</p>

                    <a href="#">Jessica Noel</a>
                </div>

                <span class="ms-auto">3 days ago</span>
            </div>
        </div>
</template>

<script>
export default {
  name: 'BottleView',
  setup () {
  }
}
</script>

<style scoped>
@import '../../../assets/css/templatemo-hexashop.css';
@import '../../../assets/css/font-awesome.css';
/* @import '../../../assets/css/tooplate-crispy-kitchen.css' */

</style>
