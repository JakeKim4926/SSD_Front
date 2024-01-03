<template>
  <div>
    <!-- Navbar & Hero Start -->
    <div class="container-fluid position-relative p-0">
      <div
        class="container-fluid py-5 mb-5 hero-header"
        :style="{ backgroundImage: `url(../../src/img/BG/BG${bgImgNum}.jpg)` }"
      >
        <div class="container py-5">
          <div class="row justify-content-center py-5">
            <div class="col-lg-10 pt-lg-5 mt-lg-5 text-center">
              <span
                class="display-3 text-white animated slideInDown"
                style="font-size: 100px; font-weight: bold"
              >
                {{ mountainStore.getMount.mountain }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Navbar & Hero End -->

    <!-- About Start -->
    <div class="container-xxl py-5">
      <div class="container">
        <div class="row g-5">
          <div
            class="col-lg-6 wow fadeInUp"
            data-wow-delay="0.1s"
            style="min-height: 400px"
          >
            <div class="position-relative h-100" style="border: 4px solid #000">
              <img
                class="img-fluid position-absolute w-100 h-100"
                :src="getImgSrc"
                alt="여기에 산 이미지를 넣자"
                style="object-fit: cover"
              />
            </div>
          </div>
          <div
            class="col-lg-6 wow fadeInUp"
            data-wow-delay="0.3s"
            style="font-weight: bold"
          >
            <span
              class="section-title text-start text-primary pe-3"
              style="display: block"
            >
              등산 정보
            </span>
            <span class="mb-4" style="font-size: 36px">
              Welcome to
              <span class="text-primary" style="color: #86b817 !important">{{
                mountainStore.getMount.mountain
              }}</span>
            </span>

            <div class="row gy-2 gx-4 mb-4">
              <div class="col-sm-6">
                <p class="mb-0">
                  <span
                    ><font-awesome-icon
                      icon="map-location-dot"
                      style="color: rgb(240, 200, 0)"
                      class="icon-style"
                  /></span>
                  주소 :
                  <span class="section-title text-start text-primary pe-3">{{
                    kakaoStore.getterAddress
                  }}</span>
                </p>
              </div>
              <div class="col-sm-6">
                <p class="mb-0">
                  <i class="fa fa-arrow-right text-primary me-2"></i>
                </p>
              </div>

              <div class="col-sm-6">
                <p class="mb-0">
                  <span
                    ><font-awesome-icon
                      icon="person-hiking"
                      beat
                      style="color: rgb(240, 200, 0)"
                      class="icon-style"
                  /></span>
                  최대 오르막길 :
                  <span class="section-title text-start text-primary pe-3"
                    >{{ mountainApiStore.getMaxUpTime }} 분</span
                  >
                </p>
              </div>
              <div class="col-sm-6">
                <p class="mb-0">
                  <i class="fa fa-arrow-right text-primary me-2"></i>
                </p>
              </div>

              <div class="col-sm-6">
                <p class="mb-0">
                  <span
                    ><font-awesome-icon
                      icon="star"
                      spin
                      style="color: rgb(240, 200, 0)"
                      class="icon-style"
                  /></span>
                  예상 난이도 :
                  <span class="section-title text-start text-primary pe-3">{{
                    mountainApiStore.getDifficulty
                  }}</span>
                </p>
              </div>
              <div class="col-sm-6">
                <p class="mb-0">
                  <i class="fa fa-arrow-right text-primary me-2"></i>
                </p>
              </div>
            </div>
            <div id="map"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- About End -->

    <hr />

    <!-- Team Start -->
    <div class="container-xxl py-5" style="font-weight: bold">
      <div class="container">
        <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
          <div class="section-title text-center text-primary px-3">
            등산 게시판
          </div>
          <span class="mb-5" style="font-size: 36px"
            >{{ mountainStore.getMount.mountain }} / 게시판</span
          >
        </div>
        <div class="mb-4">
          <button
            class="btn btn-primary py-3 px-4"
            @click="openCreatedModal"
            style="font-weight: bold; border-radius: 10px"
          >
            게시글 등록
          </button>
          <BoardCreate @close="closeCreatedModal" v-if="isCreatedModal" />
        </div>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">번호</th>
                <th scope="col" colspan="2">제목</th>
                <th scope="col">작성자</th>
                <th scope="col">조회수</th>
                <th scope="col">작성시간</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(board, index) in boardStore.boardList" :key="board.id">
                <td>{{ index+1 }}</td>
                <td colspan="2">
                  <a
                    class="nav-link forClick"
                    @click="openDetailModal(board)"
                    >{{ board.title }}</a
                  >
                </td>
                <td>{{ board.writer }}</td>
                <td>{{ board.view_cnt }}</td>
                <td>{{ board.reg_date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <BoardDetail @close="closeDetailModal" v-if="isDetailModal" />
      </div>
    </div>

    <!-- Team End -->
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useMountainStore } from "@/stores/mountain";
import { useBoardStore } from "@/stores/board";
import { useKakaoStore } from "@/stores/kakao";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useMountainApiStore } from "@/stores/mountain_api";

import BoardCreate from "@/components/board/BoardCreate.vue";
import BoardDetail from "@/components/board/BoardDetail.vue";

const mountainStore = useMountainStore();
const boardStore = useBoardStore();
const kakaoStore = useKakaoStore();
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const mountainApiStore = useMountainApiStore();

let map = null;
let address = ref("");
let name = ref("");
let imgSrc = ref("");
let mountain_id = ref("");

const getImgSrc = computed(() => {
  return imgSrc.value;
});
const bgImgNum = computed(() => {
  return route.params.location_id;
});

watch(boardStore.getterBoardList, ()=>{

  if( mountainStore.location_id == undefined || mountainStore.mountain_id == undefined)
    return;

  mountainStore.getMountain();
})
let id = ref(1);

onMounted(async () => {

  console.log(route.params.location_id);
  mountainStore.location_id = route.params.location_id;
  mountainStore.mountain_id = route.params.mountain_id;
  await mountainStore.getMountain();
  console.log("getMountain completed");
  name.value = mountainStore.mounT.mountain;
  mountain_id.value = mountainStore.mounT.mountain_id;
  imgSrc.value = `../../src/img/Mountain/M${mountain_id.value}.jpg`;

  await mountainApiStore.getAllJson();
  console.log("getAllJson completed");
  kakaoStore.latitude = mountainStore.mounT.latitude;
  kakaoStore.longtitude = mountainStore.mounT.longtitude;

  // 여기서 카카오맵 뿌려주기
  kakaoStore.getKakao();
  map = kakaoStore.map;
  console.log("getKakao completed");

  // 여기서 카카오맵 주소 받아오기
  kakaoStore.getAddress();
  address.value = kakaoStore.address.value;
  console.log("getAddress completed");
});

const isCreatedModal = ref(false);
const isDetailModal = ref(false);

const openCreatedModal = () => {
  console.log(userStore.getLoginUserId);
  if (userStore.loginUserId.length > 0) isCreatedModal.value = true;
  else window.alert("로그인 하셔야 이용이 가능합니다.");
};

const closeCreatedModal = () => {
  isCreatedModal.value = false;
};

const openDetailModal = (board) => {
  console.log(userStore.getLoginUserId);
  if (userStore.loginUserId.length > 0) {
    boardStore.getBoard(board.location_id, board.mountain_id, board.board_id);
    isDetailModal.value = true;
  } else window.alert("로그인 하셔야 이용이 가능합니다.");
};

const closeDetailModal = () => {
  isDetailModal.value = false;
};
</script>

<style scoped>
.hero-header {
  background-size: cover;
  background-position: center;
}

#map {
  width: 600px;
  height: 300px;
  border: 4px solid black;
}

.forClick:hover {
  cursor: pointer;
}

.btn-primary {
  background-color: #232323;
  border-color: #232323;
  color: white;
  border-radius: 10%;
  margin: 10px 20px;
}
.btn-primary:hover {
  color: rgb(255, 217, 0) !important;
  background-color: #232323;
  border-color: #232323;
}

.nav-link {
  display: block;
  padding: 0.5rem 1rem;
  color: black;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;
}

.nav-link:hover,
.nav-link:focus {
  color: rgb(240, 200, 0) !important;
}

.text-primary {
  color: rgb(240, 128, 0) !important;
}

.icon-style {
  color: rgb(240, 128, 0) !important;
}
</style>
