<script>
import SideBar from '../components/SideBar.vue'
import NavBar from '../components/NavBar.vue'
import { occurrenceStore } from '../stores/occurrence'
import { eventStore } from '../stores/event'
import { userStore } from '../stores/user'

export default {

  components: {
    SideBar, NavBar
  },
  data() {
    return {
      userStore: userStore(),
      occurrenceStore: occurrenceStore(),
      eventStore: eventStore(),
      feed: [],
    }
  },
  created() {
    if (!JSON.parse(localStorage.getItem('currentUser'))) {
      this.$router.push({ name: 'signin' })
    }
  },
  computed: {
    createFeed() {

      let occurrenceArray = this.occurrenceStore.getOccurrences
      let eventArray = this.eventStore.getEvents

      for (let event of eventArray) {
        this.feed.push(event)
      }
      for (let occurrence of occurrenceArray) {
        this.feed.push(occurrence)
      }

      this.feed.sort((a, b) => (b.dateHour + b.dateHour) - (a.dateHour + a.dateHour))
    }
  }
}
</script>

<template>
  {{ createFeed }}
  <v-app id="inspire">
    <v-container>
      <v-row no-gutters>
        <v-col cols="3">
          <v-sheet class="pa-2 ma-2">
            <!-- navbar -->
            <NavBar />
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2" style="background-color: blue">
            <!-- content -->
            <div v-for="post in feed" class="content">

              <div class="card">
                <img :src=post.image width="500">
                <div>
                  <h1>{{ post.title }}</h1> &nbsp;
                  <h3>{{ post.location }}</h3>
                </div>
              </div>

              <div class="comments" v-for=",i in post.comments.length > 1 ? 2 : (post.comments.length == 1 ? 1 : 0)">
                <p class="userName">@{{ userStore.getUserById(post.comments[i].userId).username }}</p>
                <p class="comment">{{ post.comments[i].message }}</p>
              </div>


              <div class="routerLink" v-if="post.type == 'event'">
                <h5>
                  <RouterLink :to="{ name: 'eventDetail', params: { eventid: post.id } }">View More!</RouterLink>
                </h5>
              </div>
              <div class="routerLink" v-else>
                <h5>
                  <RouterLink :to="{ name: 'occurrenceDetail', params: { occurrenceid: post.id } }">View More!
                  </RouterLink>
                </h5>
              </div>
            </div>
          </v-sheet>
        </v-col>
        <v-col cols="3">
          <v-sheet class="pa-2 ma-2">
            <!-- sidebar -->
            <SideBar />
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style lang="scss" scoped>
@import '../assets/styles/base.css';

#inspire {
  scroll-behavior: smooth;
}
</style>