<template>
  <div class="bodyC">
    <title>Login Page</title>
    <!--Made with love by Mutiullah Samim -->

    <!--Bootsrap 4 CDN-->
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
      integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
      crossorigin="anonymous"
    />

    <!--Fontawesome CDN-->
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
      integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
      crossorigin="anonymous"
    />

    <!--Custom styles-->
    <link rel="stylesheet" type="text/css" href="styles.css" />
    <div class="container">
      <div class="d-flex justify-content-center h-100">
        <div class="card">
          <div class="card-header">
            <span style="font-size: 40px; color: white; font: bold"
              >로그인</span
            >
            <div class="d-flex justify-content-end social_icon">
              <!-- <span><i class="fab fa-facebook-square"></i></span> -->
              <span
                ><font-awesome-icon
                  icon="person-hiking"
                  bounce
                  style="color: #ffd500"
              /></span>
              <span
                ><font-awesome-icon
                  icon="mountain-sun"
                  fade
                  style="
                    --fa-primary-color: #ffc800;
                    --fa-secondary-color: #a5fe01;
                  "
              /></span>
              <span
                ><font-awesome-icon
                  icon="person-hiking"
                  shake
                  style="color: #ffd500"
              /></span>
            </div>
          </div>
          <div class="card-body">
            <div class="input-group form-group">
              <div class="input-group-prepend">
                <span class="input-group-text"
                  ><i class="fas fa-user"></i
                ></span>
              </div>
              <!-- ID 입력-->
              <input
                type="text"
                class="form-control board-content"
                placeholder="ID"
                style="color: black"
                v-model="id"
                @keyup.enter.prevent="funcLogin"
              />
            </div>
            <div class="input-group form-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-key"></i></span>
              </div>
              <input
                type="password"
                class="form-control board-content"
                style="color: black"
                placeholder="password"
                v-model="pass"
                @keyup.enter.prevent="funcLogin"
              />
            </div>
            <br />
            <div class="form-group">
              <input
                type="submit"
                value="로그인"
                class="btn float-right login_btn board-content"
                @click="funcLogin"
              />
            </div>
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-center links board-content">
              To share your happiness with hiking,
            </div>
            <div class="d-flex justify-content-center links board-content">
              <a href="/signup" style="color:coral">회원 가입</a>
            </div>
            <!-- <div class="d-flex justify-content-center">
              <a href="#">Forgot your password?</a>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

let id = ref("");
let pass = ref("");

const funcLogin = function () {
  userStore.loginUser(id.value, pass.value);
};
</script>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
}
.board-title-lv1 {
  font-size: 35px;
}
.board-title-lv2 {
  font-size: 25px;
}
.board-content {
  font-size: 15px;
  font-weight: bold;
}

.bodyC {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url("http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
}

.container {
  height: 100%;
  align-content: center;
}

.card {
  height: 370px;
  margin-top: auto;
  margin-bottom: auto;
  width: 400px;
  background-color: rgba(0, 0, 0, 0.5) !important;
}

.social_icon span {
  font-size: 60px;
  margin-left: 10px;
  color: #ffc312;
}

.social_icon span:hover {
  color: white;
  cursor: pointer;
}

.card-header h3 {
  color: white;
}

.social_icon {
  position: absolute;
  right: 20px;
  top: -45px;
}

.input-group-prepend span {
  width: 50px;
  background-color: #ffc312;
  color: black;
  border: 0 !important;
}

input:focus {
  outline: 0 0 0 0 !important;
  box-shadow: 0 0 0 0 !important;
}

.remember {
  color: white;
}

.remember input {
  width: 20px;
  height: 20px;
  margin-left: 15px;
  margin-right: 5px;
}

.login_btn {
  color: black;
  background-color: #ffc312;
  width: 100px;
}

.login_btn:hover {
  color: black;
  background-color: white;
}

.links {
  color: white;
}

.links a {
  margin-left: 4px;
}
</style>
