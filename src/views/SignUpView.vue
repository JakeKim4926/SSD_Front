<template>
  <div class="bodyC">
    <title>SignUp Page</title>
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
            <span class="board-title-lv1"
              >회원가입</span
            >
            <div class="d-flex justify-content-end social_icon">
              <!-- <span><i class="fab fa-facebook-square"></i></span> -->
              <span
                ><font-awesome-icon
                  icon="person-walking"
                  bounce
                  style="color: #ffd500"
              /></span>
              <span
                ><font-awesome-icon
                  icon="user-plus"
                  bounce
                  style="color: #ffd500"
              /></span>
              <span
                ><font-awesome-icon
                  icon="users-between-lines"
                  bounce
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
                v-model="User.id"
              />
            </div>

            <div class="input-group form-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-key"></i></span>
              </div>
              <input
                type="password"
                class="form-control board-content"
                placeholder="password"
                v-model="User.pw"
              />
            </div>

            <div class="input-group form-group">
              <div class="input-group-prepend">
                <span class="input-group-text"
                  ><font-awesome-icon icon="address-card"
                /></span>
              </div>
              <input
                type="text"
                class="form-control board-content"
                placeholder="name"
                v-model="User.name"
              />
            </div>

            <br />
            <div class="form-group">
              <input
                type="submit"
                value="등록"
                class="btn float-right login_btn board-content"
                @click="funcSignUp"
              />
            </div>
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-center links board-content">
              이미 회원이신가요 ?
            </div>
            <div class="d-flex justify-content-center links board-content">
              <a href="/" style="color:coral">홈으로</a>
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

let User = ref({
  id: "",
  pw: "",
  name: "",
});

const funcSignUp = function () {
  console.log("여기서 찍자");
  console.log(User);
  userStore.createUser(User.value);
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Numans");

html,
body {
  height: 100%;
  margin: 0;
}

.board-title-lv1 {
  font-size: 35px;
  font-weight:bold;
  color:white
}
.board-title-lv2 {
  font-size: 25px;
  font-weight:bold;
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
