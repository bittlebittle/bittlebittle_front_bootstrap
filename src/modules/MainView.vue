<template>
 <swiper :options="swiperOption" ref="swiperRef">
  <slide  v-for="newbottle in newBottles" :key="newbottle.bottleNo">
    <div>
      <div>
        <img src="@/assets/images/breakfast/brett-jordan-8xt8-HIFqc8-unsplash.jpg">
      </div>
      <div>
        <h4>{{ newbottle.bottleName }}</h4>
      </div>
    </div>
  </slide>
 </swiper>
</template>


<script>
import { getFormAxiosInstance } from '@/api/index'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/users'
import { Swiper, Slide } from "vue-swiper-component/index";


export default {
  name: 'MainView',

   components: {
    Swiper,
    Slide
  },

  setup () {
    // axios Instance 를 생성할 때, token 문제 때문에 인자로 데이터하나가 필요해
    const user = useUserStore()
    const axios = getFormAxiosInstance(user.getLoginUserInfo);

    const bottles = ref([]);;
    const newBottles = ref([]);
    const swiperRef = ref(null); // ref 추가
    
    function prevSlide() {
      swiperRef.value.slideToPrev();
    }

    function nextSlide() {
      swiperRef.value.slideToNext();
    }
    
    const swiperOption = {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 10,
      
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        // when window width is >= 640px
        375: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      425: {
        slidesPerView: 2,
        spaceBetween: 30,
      
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
       
      },
      1024: {
        slidesPerView: 4,
       
      },
      1400: {
        slidesPerView: 5,
       
      },
      },
    };


    onMounted(()=>{

      axios.get('/api/bottles')
        .then(res => {
          console.log('bottles data', res.data.bottle)
          bottles.value = res.data.bottle

          newBottles.value = res.data.newBottle
          console.log('new data', res.data.newBottle)
      
          })
        .catch(err=>{
          console.log('error', err)
        })
    })

   return {
    bottles,
    newBottles,
    swiperOption,
    Swiper,
    Slide,
    prevSlide,
    nextSlide
   }

  }

}
</script>

<style scoped>
/* #heart-btn {
  background-color: white;
  border: none;
  cursor: pointer;
  font-size: 20px;
  padding: 5px 10px;
} */

.menu-card {
  padding: 10px; /* 원하는 크기로 조정합니다. */
}

/* .menu-thumb {
  display: inline-block;
} */


</style>