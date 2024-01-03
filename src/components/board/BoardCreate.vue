<template>
    <div class="board-create-container">
      <div class="board-create-box">
        <span class="board-title-lv1">게시글 등록</span>
        <fieldset>
          <legend>등록</legend>
          <div class="form-group">
            <label for="title" class="board-title-lv2">제목:</label>
            <input type="text" id="title" class="board-content" v-model="board.title" placeholder="제목을 입력하세요">
          </div>
          <div class="form-group">
            <label for="writer" class="board-title-lv2">작성자:</label>
            <input type="text" id="writer" class="board-content" v-model="board.writer" placeholder="작성자를 입력하세요">
          </div>
          <div class="form-group">
            <label for="content" class="board-title-lv2">내용:</label>
            <textarea name="content" class="board-content" cols="30" rows="10" v-model="board.content" placeholder="내용을 입력하세요"></textarea>
          </div>
          <div class="button-group">
            <button @click="createBoard">등록</button>
            <button @click="closeModal">닫기</button>
          </div>
        </fieldset>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useBoardStore } from '@/stores/board';
  import { useMountainStore } from '@/stores/mountain';
  import { useUserStore } from '@/stores/user';
  
  const emit = defineEmits();
  
  const boardStore = useBoardStore();
  const mountainStore = useMountainStore();
  const userStore = useUserStore();
  
  const board = ref({
    location_id: mountainStore.mounT.location_id,
    mountain_id: mountainStore.mounT.mountain_id,
    id: userStore.getIdFromSession(),
    board_id: 0,
    title: '',
    writer: '',
    content: '',
    reg_date: '',
    view_cnt: 0,
  });
  
  const createBoard = function () {
    console.log(board.value);
    boardStore.createBoard(board.value);
    closeModal();
    location.reload();
  };
  
  const closeModal = () => {
    emit('close');
  };
  </script>
  
  <style scoped>
.board-title-lv1{
  font-size: 35px;
}
.board-title-lv2{
  font-size : 25px
}
.board-content {
  font-size: 15px;
  font-weight: bold;
}


  .board-create-container {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(128, 128, 128, 0.9);
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
  
  h4 {
    margin-bottom: 15px;
    font-size: 1.2em;
  }
  
  fieldset {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 15px;
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
    justify-content: space-between;
  }
  
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
  }
  
  button:nth-child(1) {
    background-color: #4caf50;
  }
  
  button:nth-child(2) {
    background-color: #f44336;
  }
  </style>
  