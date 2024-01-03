<template>
  <div>
    <div>
      <swiper
        :slides-per-view="3"
        :space-between="50"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
        :speed="3000"
        :modules="modules"
        loop="true"
        class="row g-0 overflow-hidden"
      >
        <swiper-slide
          v-for="(slideContent, index) in slides"
          :key="index"
          :virtualIndex="index"
          class="col-4 position-relative"
        >
          <img :src="slideContent.src" alt="" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
  <div
    class="d-flex flex-column align-items-center home-body"
    style="font-weight: bold"
  >
    <div class="nav-roof-text" style="font-size: 80px">
      <span
        ><font-awesome-icon icon="person-hiking" bounce style="color: black"
      /></span>
      <span> FIND YOUR HIKING PLACE</span>
    </div>
    <div style="font-size: 30px">
      <ul class="nav nav-pills">
        <li v-for="link in links" :key="link.name" class="nav-item p-3">
          <RouterLink
            :class="[link.activeClass, 'text-decoration-none']"
            :to="{
              name: 'location',
              params: { id: link.name },
              query: { label: link.label },
            }"
          >
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>
    </div>
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import { useMountainStore } from "@/stores/mountain";
import { ref, computed, onMounted, onBeforeMount, watch } from "vue";
//swiper 기능들 임포트
import "swiper/css";

import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const links = ref([
  { name: "1", label: "대덕구" },
  { name: "2", label: "동구" },
  { name: "3", label: "중구" },
  { name: "4", label: "서구" },
  { name: "5", label: "유성구" },
]);

onMounted(() => {
  // 초기에 첫 번째 링크 활성화

  route.params.id = "1";
  router.push({
    name: "location",
    params: { id: "1" },
    query: { label: "대덕구" },
  });
});

const activeLink = computed(() => {
  return links.value.find((link) => route.params.id === link.name);
});

links.value.forEach((link) => {
  link.activeClass = computed(() => {
    return { active: activeLink.value === link };
  });
});

//carousel에 쓸 스크립트

const modules = [Autoplay];
//자동회전을 위한 모듈

const store = useMountainStore();

const slides = ref([
  { src: "src/img/Carousel/M1.jpg" },
  { src: "src/img/Carousel/M2.jpg" },
  { src: "src/img/Carousel/M3.jpg" },
  { src: "src/img/Carousel/M4.jpg" },
]);
</script>

<style scoped>
.swiper {
  height: 100vh;
}

.swiper img {
  height: 100%;
  width: 100vh;
  right: 0%;
}

.card-box {
  width: 100%;
  padding: 50px;
}

.nav-pills > .nav-item > .active {
  color: rgb(255, 217, 0) !important;
  /* background-color: rgba(31, 89, 99, 0.801); */
  border-radius: 10%;
}

.nav-pills > .nav-item a {
  text-decoration: none;
  color: inherit;
}

.nav-pills > .nav-item {
  background-color: #232323;
  color: white;
  border-radius: 10%;
  margin: 10px 20px;
}

.nav-roof-text {
  margin: 30px 0;
}
</style>
