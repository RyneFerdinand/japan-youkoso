import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/utils/store/auth.js'

import User from '@/utils/request/users.js'

import HomeView from '@/views/HomeView.vue'
import StepView from '@/views/StepView.vue'
import StepListView from '@/views/StepListView.vue'
import StepCreationView from '@/views/StepCreationView.vue'
import RoadmapView from '@/views/RoadmapView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/step/detail/:id',
      name: 'step-detail',
      component: StepView
    },
    {
      path: '/step/list',
      name: 'step-list',
      component: StepListView
    },
    {
      path: '/step/create',
      name: 'step-create',
      component: StepCreationView
    },
    {
      path: '/roadmap',
      name: 'roadmap',
      component: RoadmapView
    },
    {
      path: '/register',
      name: 'register',
      component: RegistrationView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

router.beforeEach(async () => {
  const authStore = useAuthStore()

  if (localStorage.getItem('uid') && !authStore.isLoggedIn) {
    try {
      const response = await User.getById(localStorage.getItem('uid'));
      authStore.setUser(response.data.user)
    } catch (error) {
      console.log(error)
    }
  }
})

export default router
