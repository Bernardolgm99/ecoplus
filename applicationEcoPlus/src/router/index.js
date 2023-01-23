import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPageView.vue'
import HomePage from '../views/HomePageView.vue'
import SignInPage from '../views/SignInView.vue'
import SignUpPage from '../views/SignUpView.vue'
import OccurrenceDetailPage from '../views/OccurrenceDetailView.vue'
import EventDetailPage from '../views/EventDetailView.vue'
import EventsPage from '../views/EventsView.vue'
import OccurrencesPage from '../views/OccurrencesView.vue'
import ActivitiesPage from '../views/ActivitiesView.vue'
import ActivityDetailPage from '../views/ActivityDetailView.vue'
import SuggestionsPage from '../views/SuggestionsView.vue'
import PostOccurrencePage from '../views/PostOccurrenceView.vue'
import PerfilPage from '../views/PerfilView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: LandingPage,
      props: true
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
      component: SignUpPage,
      props: true
    },
    {
      path: '/occurrences',
      name: 'occurrences',
      component: OccurrencesPage
    },
    {
      path: '/occurrences/:occurrenceid',
      name: 'occurrenceDetail',
      component: OccurrenceDetailPage
    },
    {
      path: '/events',
      name: 'events',
      component: EventsPage
    },
    {
      path: '/events/:eventid',
      name: 'eventDetail',
      component: EventDetailPage
    },
    {
      path: '/activities',
      name: 'activities',
      component: ActivitiesPage
    },
    {
      path: '/activities/:activityId',
      name: 'activityDetail',
      component: ActivityDetailPage
    },
    {
      path: '/suggestions',
      name: 'suggestions',
      component: SuggestionsPage
    },
    {
      path: '/postOccurrence',
      name: 'post',
      component: PostOccurrencePage
    },
    {
      path: '/perfil/:perfilid',
      name: 'perfil',
      component: PerfilPage
    }
  ]
})

export default router