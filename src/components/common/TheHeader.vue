<template>
  <div>
    <header class="header-area">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div
              class="menu-area d-flex justify-content-between"
              style="font-weight: bold; color: white"
            >
              <!-- Logo Area  -->
              <div class="logo-area">
                <RouterLink
                  class="nav-link"
                  :to="{
                    name: 'location',
                    params: { id: '1' },
                    query: { label: '대덕구' },
                  }"
                  @click="onoffmenu()"
                  ><img
                    src="../../img/SeongSeobDang_icon_grey2.png"
                    height="50"
                    alt=""
                  />
                  SeongSeobDang</RouterLink
                >
              </div>

              <!--Menu-bar st-->

              <div class="mainMenu d-flex" :class="{ 'open-menu': isMenuOpen }">
                <font-awesome-icon
                  icon="xmark"
                  class="exit-icon"
                  @click="onoffmenu()"
                />
                <div class="logo-area">
                  <RouterLink
                    class="nav-link"
                    :to="{
                      name: 'location',
                      params: { id: '1' },
                      query: { label: '대덕구' },
                    }"
                    @click="onoffmenu()"
                  >
                    <img
                      src="../../img/SeongSeobDang_icon_full_grey2.png"
                      height="200"
                      alt=""
                  /></RouterLink>
                  <span
                    class="font-customer"
                    v-if="userStore.getLoginUserId.length > 0"
                  >
                    {{ userStore.getUserName }}님 환영합니다.</span
                  >
                </div>
                <div class="mainMenu-item">
                  <RouterLink
                    class="nav-link"
                    :to="{
                      name: 'location',
                      params: { id: '1' },
                      query: { label: '대덕구' },
                    }"
                    @click="onoffmenu()"
                    >Home</RouterLink
                  >
                  <template v-if="userStore.getLoginUserId.length > 0">
                    <a class="nav-link forClick" @click="logout">Logout</a>
                  </template>
                  <template v-else>
                    <RouterLink
                      :to="{ name: 'login' }"
                      class="nav-link"
                      @click="onoffmenu()"
                      >Login</RouterLink
                    >
                    <RouterLink
                      to="/signup"
                      class="nav-link"
                      @click="onoffmenu()"
                      >SignUp</RouterLink
                    >
                  </template>
                </div>
                <div>
                  <span style="font-size: 25px">
                    SeongSeobDang <br />
                    Copyright © 2023 All rights reserved
                  </span>
                </div>
              </div>
              <!--Menu-bar ed-->

              <!-- Menu Icon -->
              <div class="menu-content-area d-flex align-items-center">
                <span
                  class="navbar-toggler-icon"
                  @click="onoffmenu()"
                  id="menuIcon"
                  ><font-awesome-icon icon="bars"
                /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useMountainStore } from "@/stores/mountain";

const userStore = useUserStore();
const mountainStore = useMountainStore();

const isLogin = computed(() => {
  return userStore.isLogin;
});

const logout = function () {
  console.log(isLogin.value);
  userStore.logoutUser();
  onoffmenu();
};

const mountainTest = function () {
  mountainStore.location_id = 5;
  mountainStore.mountain_id = 1;
  mountainStore.getMountain();
};
// const mainMenu = document.querySelector('.mainMenu')
const isMenuOpen = ref(false);

const onoffmenu = function () {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
.forClick:hover {
  cursor: pointer;
}

.font-customer {
  color: white;
  font-size: 20px;
}
.header-area {
  position: fixed;
  z-index: 995;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  /* @include trans-duration(500ms); */
  background-color: #232323;
  padding: 15px 30px;
  color: cornsilk;
  font-size: 36px;
  font-weight: 100;
}

.mainMenu {
  position: fixed;
  display: flex;
  width: 480px;
  height: 100%;
  top: 0;
  right: -500px;
  background-color: #232323;
  z-index: 99999;
  text-align: center;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 15px;
  transition-duration: 800ms;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
}

.navbar-toggler-icon {
  cursor: pointer;
}

.open-menu {
  right: 0;
}

.exit-icon {
  position: absolute;
  top: 30px;
  right: 30px;
}

.exit-icon:hover {
  cursor: pointer;
}

.mainMenu-item {
}
</style>
