import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import MountainView from '@/views/MountainView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'

import locationView from '@/views/location/locationView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children:[
        {path:':id',
          name:'location',
          component:locationView,
        },
              
      ]
    },
    {
      path: '/mountain/:location_id/:mountain_id',
      name: 'mountain',
      component: MountainView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
  ],
  //라우터 링크를 사용하면 기본적으로 페이지가 맨 위로 스크롤 되는데 이것을 막음
  scrollBehavior(to, from , savedPosition){
    if (savedPosition) {
      return savedPosition;
    } else {
      // 기본적으로 맨 위로 스크롤합니다.
      return { x: 0, y: 50};
    }
  }
})

export default router
