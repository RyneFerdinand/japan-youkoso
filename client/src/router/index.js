import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StepView from '../views/StepView.vue'
import StepListView from '../views/StepListView.vue'
import StepCreationView from '../views/StepCreationView.vue'

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
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
