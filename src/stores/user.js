import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

const REST_USER_API = 'http://localhost:8080/api/user'

export const useUserStore = defineStore('user', () => {

    //const userName = ref(null)
    const loginUserId = ref('')
    const userName = ref('')
    //로그인한 유저

    // id getter
    const getLoginUserId = computed(() => {
        return loginUserId.value;
    })

    // name getter
    const getUserName = computed(()=>{
        return userName.value;
    })

    watch((loginId)=>{
        
        if(sessionStorage.getItem('access-token') == null)
            return;
        
        const tokenSplit = sessionStorage.getItem('access-token').split('.')
        const tokenName = sessionStorage.getItem('name')

        let id = tokenSplit[1]
        id = atob(id)
        id = JSON.parse(id)
        loginId = id['id'] 
        loginUserId.value = loginId
        userName.value = tokenName;
    })

    // 회원 가입
    const createUser = function (user) {
        console.log("are you here?");
        console.log(user);
        axios({
            url: `${REST_USER_API}/signup`,
            method: 'POST',
            data: user
            // params는 요청과 함께 전송되는 파라미터 (쿼리스트링)
            // data는 요청 바디로 전송될 데이터 (JSON)
        })
            .then((res) => {
                console.log(res.data);
                if (res.data == 2) {
                    window.alert("이미 가입된 ID 입니다.")
                } else {
                    window.alert("회원 가입 성공")
                    router.push({ name: 'home' })
                }
            }).catch((err) => {
                console.log(err)
            })

    }

    const getIdFromSession = function () {
        const token = sessionStorage.getItem('access-token')
        if(token == null || token == undefined)
            return false;
        
        const tokenSplit = sessionStorage.getItem('access-token').split('.')

        let id = tokenSplit[1]
        id = atob(id)
        id = JSON.parse(id)
        return id['id'];
    }

    // 로그인
    const loginUser = function (id2, pass2) {
        axios.post(`${REST_USER_API}/login`, null, { params: { id: id2, pass: pass2 } })
            .then((response) => {
                if (response.data["access-token"].length > 0) {
                    sessionStorage.setItem('access-token', response.data["access-token"])
                    sessionStorage.setItem('name', response.data["message"])

                    const token = response.data['access-token'].split('.')
                    userName.value = response.data["message"]
                    let id = token[1]
                    id = atob(id)
                    id = JSON.parse(id)

                    loginUserId.value = id['id']

                    // userName.value = response.data
                    console.log("successed to login")
                    window.alert("로그인 성공!!")
                    router.push({ name: 'home' })
                } else {
                    console.log("failed to login")
                    window.alert("로그인 실패!!")
                }
            }).catch(() => {
                alert("로그인 실패!!")
                console.log("실패")
            })
    }

    // 로그아웃
    const logoutUser = function () {
        axios.get(`${REST_USER_API}/logout`)
            .then(() => {
                window.alert("로그아웃 !!")
                loginUserId.value = ''
                userName.value = ''
                sessionStorage.clear()
            })
    }

    return { userName, getUserName, loginUserId, createUser, loginUser, logoutUser, getLoginUserId, getIdFromSession }
}, { persist: true })