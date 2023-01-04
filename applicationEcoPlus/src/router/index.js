import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPageView.vue'
import HomePage from '../views/HomePageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: LandingPage
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage
    }
  ]
})

export default router