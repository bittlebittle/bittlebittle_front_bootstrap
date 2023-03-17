<template>
  <div class="bottle-detail-view" v-if="bottle">
    <div>보틀 번호: {{ bottle.bottleNo }}</div>
    <div>보틀 이름: {{ bottle.bottleName }}</div>
    <div>보틀 내용: {{ bottle.bottleContent }}</div>
    <div>보틀 브랜드: {{ bottle.bottleBrand }}</div>
    <div>보틀 도수: {{ bottle.bottleAbv }}</div>

    <!-- 관련 보틀 리스트 -->
    <div class="related-list">
      <div class="section-title">관련 보틀 리스트:</div>
      <ul>
        <li v-for="relatedBottle in relatedBottleList" :key="relatedBottle.bottleNo" @click=getBottle(relatedBottle.bottleNo)>
    
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
    <div class="related-list">
      <div class="section-title">태그 리스트:</div>
          <div class="tag-box" v-for="tag in tagListByBottle" :key="tag.tagNo">{{ tag.tagName }}</div>
    </div>

    <div class="related-list">
      <div class="section-title">리뷰 리스트:</div>
      <ul>
        <li v-for="review in reviewList" :key="review.reviewNo">
          {{ review.reviewTitle }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { createAxiosInstance } from '@/api/index'
import { onMounted, ref } from '@vue/runtime-core'

export default {
  name: 'BottleDetailView',
 
  props: {
    bottleNo: {
      type: String,
      required: true
    }
  },
  
  setup (props) {
    const axios = createAxiosInstance()
   
    const bottle = ref(null)
    const relatedBottleList = ref([])
    const foodList = ref([])
    const tagListByBottle = ref([])
    const reviewList = ref([])
    const getBottle = function(hhh){
      let url = '';
      if(!hhh) {
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


    onMounted(() => {
      getBottle()
    })

  return {
    bottle,
    relatedBottleList,
    foodList,
    tagListByBottle,
    reviewList,
    getBottle
  }

  }
}
</script>

<style>

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
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .related-list ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .related-list li {
    margin-bottom: 5px;
    color: white;
  }
  .related-list li:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  .tag-box {
  display: inline-block;
  background-color: #555;
  color: white;
  padding: 5px;
  border-radius: 5px;
  margin-right: 10px;
}

</style>