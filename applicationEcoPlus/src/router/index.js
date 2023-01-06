import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPageView.vue'
import HomePage from '../views/HomePageView.vue'
import SignInPage from '../views/SignInView.vue'
import SignUpPage from '../views/SignUpView.vue'

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
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInPage
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpPage
    }
  ]
})

export default router