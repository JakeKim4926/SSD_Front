import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useMountainStore } from './mountain'
import axios from 'axios'
import router from '@/router'

const REST_BOARD_API = 'http://localhost:8080/api/board'

export const useBoardStore = defineStore('board', () => {
    const boardList = ref([])
    const mountainStore = useMountainStore() 
    // getter for boardlist

    const getterBoardList = computed(()=>{
        return boardList;
    })

    // 게시글 전체 조회
    const getBoardList = function (location_id, mountain_id) {
        axios.get(`${REST_BOARD_API}/${location_id}/${mountain_id}`)
            .then((response) => {
                boardList.value = response.data;
            })
    }

    // 게시글 상세
    const board = ref({})
    
    const getBoard = function (location_id, mountain_id, board_id) {
        axios.get(`${REST_BOARD_API}/${location_id}/${mountain_id}/${board_id}`)
            .then((response) => {
                board.value = response.data;
                // 여기에 상세보기로 띄울 modal or 옮길 창을 넣자

                // const temp = videoId.value
                // router.push(`/board/${temp}/${board.value.id}`)
            })
    }

    // 게시글 등록
    const createBoard = function (board) {
        axios({
            url: REST_BOARD_API,
            method: 'POST',
            data: board
            // params는 요청과 함께 전송되는 파라미터 (쿼리스트링)
            // data는 요청 바디로 전송될 데이터 (JSON)
        })
            .then(() => {
                //console.log(res)
                // response 응답으로 들어온 게시글의 id를 이용해서
                // 상세보기로 바로 점프 가넝
                router.push(`/mountain`)
            }).catch((err) => {
                console.log(err)
            })

    }

    // 게시글 수정
    const updateBoard = function () {
        axios({
            url: REST_BOARD_API,
            method: 'put',
            data: board.value
        }).then(() => {
            // 여기에 상세보기로 띄울 modal or 옮길 창을 넣자
        }).catch((err) => {
            console.log(err)
        })
    }


    // 게시글 삭제
    const deleteBoard = function (location_id, mountain_id, board_id) {
        axios.delete(`${REST_BOARD_API}/${location_id}/${mountain_id}/${board_id}`)
            .then(() => {
                // 여기에 상세보기로 띄울 modal or 옮길 창을 넣자
            })
    }

    const moveCreate = function () {
        const temp = videoId.value
        router.push(`/board/${temp}/create`)
    }

    // getter
    const getList = computed(() => {
        return boardList.value;
      });


    return {boardList, getterBoardList, getBoardList, getBoard, board, createBoard, updateBoard, deleteBoard, moveCreate, getList }
}, { persist: true })