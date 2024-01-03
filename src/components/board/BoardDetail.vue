<template>
  <div class="board-create-container">
    <div class="board-create-box">
      <template v-if="!isUpdate">
        <!-- Detail View -->
        <div class="detail-container">
          <span class="board-title-lv1">게시글 상세 보기</span>
          <hr />
          <fieldset>
            <div class="form-group">
              <label for="title" class="board-title-lv2">제목:</label>
              <input
                type="text"
                id="title"
                class="board-content"
                readonly
                v-model="store.board.title"
              />
            </div>
            <div class="form-group">
              <label for="writer" class="board-title-lv2">작성자:</label>
              <input
                type="text"
                id="writer"
                class="board-content"
                readonly
                v-model="store.board.writer"
              />
            </div>
            <div class="form-group">
              <label for="content" class="board-title-lv2">내용:</label>
              <textarea
                name="content"
                cols="30"
                rows="10"
                class="board-content"
                readonly
                v-model="store.board.content"
              ></textarea>
            </div>
            <div class="button-group">
              <button @click="closeModal" class="btn btn-danger">닫기</button>
              <template v-if="store.board.id === userStore.getLoginUserId">
                <button @click="updateToggle" class="btn btn-success">
                  수정
                </button>
                <button @click="deleteBoard" class="btn btn-danger">
                  삭제
                </button>
              </template>
            </div>
          </fieldset>
        </div>
      </template>

      <template v-else>
        <!-- Edit View -->
        <div class="edit-container">
          <span class="board-title-lv1">게시글 수정</span>
          <hr />
          <fieldset>
            <div class="form-group">
              <label for="title" class="board-title-lv2">제목:</label>
              <input
                type="text"
                id="title"
                class="board-content"
                v-model="store.board.title"
              />
            </div>
            <div class="form-group">
              <label for="writer" class="board-title-lv2">작성자:</label>
              <input
                type="text"
                id="writer"
                class="board-content"
                readonly
                v-model="store.board.writer"
              />
            </div>
            <div class="form-group">
              <label for="content" class="board-title-lv2">내용:</label>
              <textarea
                name="content"
                cols="30"
                rows="10"
                class="board-content"
                v-model="store.board.content"
              ></textarea>
            </div>
            <div class="button-group">
              <button @click="updateBoard" class="btn btn-success">수정</button>
              <button
                @click="updateToggle"
                class="btn btn-warning cancel-button"
              >
                취소
              </button>
            </div>
          </fieldset>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useBoardStore } from "@/stores/board";
import { useUserStore } from "@/stores/user";
import { onBeforeMount, ref } from "vue";
import router from "@/router";

const store = useBoardStore();
const userStore = useUserStore();
const emit = defineEmits();

const isUpdate = ref(false);

const closeModal = () => {
  emit('close');
  // location.reload();
};

onBeforeMount(() => {});

const updateToggle = function () {
  isUpdate.value = !isUpdate.value;
};
const updateBoard = function () {
  store.updateBoard();
  closeModal();
  location.reload();
};

const deleteBoard = function () {
  store.deleteBoard(
    store.board.location_id,
    store.board.mountain_id,
    store.board.board_id
  );
  closeModal();
  location.reload();
};
</script>

<style scoped>
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

.board-create-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(128, 128, 128, 0.863);
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.board-create-box {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.detail-container,
.edit-container {
  text-align: center;
}

h2,
h4 {
  margin-bottom: 15px;
  font-size: 1.2em;
}

hr {
  margin: 15px 0;
  border: 0;
  border-top: 1px solid #ccc;
}

.detail-info h3 {
  margin: 10px 0;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.button-group {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}

button {
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-danger {
  background-color: #f44336;
  color: #fff;
}

.btn-success {
  background-color: #4caf50;
  color: #fff;
}

.btn-warning {
  background-color: #ff9800;
  color: #fff;
}
</style>
