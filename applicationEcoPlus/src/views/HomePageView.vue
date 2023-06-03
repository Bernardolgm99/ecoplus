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

      let occurrenceArray = this.occurrenceStore.getOccurrence
      let eventArray = this.eventStore.getEvents
      
      for (let event of eventArray) {
        this.feed.push(event)
      }
      for (let occurrence of occurrenceArray) {
        this.feed.push(occurrence)
      }
      console.log(this.feed)
    }
  },
  async created(){
    await this.occurrenceStore.fetchOccurrences()
    await this.eventStore.fetchAllEvents()
  }
}
</script>

<template>
  {{ createFeed }}
  <v-app id="inspire">
    <v-container class="noContainer height100">
      <v-row no-gutters class="height100">
        <v-col cols="3">
          <v-sheet class="pa-2 ma-2">
            <!-- navbar -->
            <NavBar />
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 border-page" style="background-color: rgba(255, 250, 246, 1);">
            <!-- content -->
            <v-container class="d-flex flex-column align-center contentColumn">
              <div v-for="post in feed" class="content">

                <div v-if="post.stage != 'To Do'">

                  <div class="card">
                    <div class="image" :style="`background: url(${post.image});`">
                      <div v-if="post.type == 'event'" class="topperIconsEvent">
                        <div class="infoCardContent">
                          <div class="postIconBackground">
                            <img class="postIcon" :src="'src/assets/icons/calendar.svg'">
                          </div>
                          <div class="infos">
                            <div class="title">
                              <span class="textMediumLarge">{{ post.title }}</span> &nbsp;
                            </div>
                            <div class="location">
                              <span class="textSmall txtLocation">{{ post.location }}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div v-else class="topperIconsOccurrence">
                        <div class="infoCardContent">
                          <div class="postIconBackground">
                            <img class="postIcon" :src="'src/assets/icons/tool.svg'">
                          </div>
                          <div class="infos">
                            <div class="title">
                              <span class="textMediumLarge">{{ post.title }} {{
                                post.stage == "Done" ? `(${post.stage})`
                                  : ""
                              }}</span> &nbsp;
                            </div>
                            <div class="location">
                              <span class="textSmall txtLocation">{{ post.location }}</span>
                            </div>
                          </div>
                        </div>
                      </div>



                    </div>


                  </div>

                  <div class="comments"
                    v-for=",i in post.comments.length > 1 ? 2 : (post.comments.length == 1 ? 1 : 0)">
                    <p class="userName">@{{ userStore.getUserById(post.comments[i].userId).username }}: &nbsp;</p>
                    <p class="comment">{{ post.comments[i].message }}</p>
                  </div>


                  <div class="routerLink" v-if="post.type == 'event'">
                    <p class="viewMore textSmall">
                      <RouterLink :to="{ name: 'eventDetail', params: { eventid: post.id } }">- View More -</RouterLink>
                    </p>
                  </div>
                  <div class="routerLink" v-else>
                    <p class="viewMore textSmall">
                      <RouterLink :to="{ name: 'occurrenceDetail', params: { occurrenceid: post.id } }">- View More -
                      </RouterLink>
                    </p>
                  </div>
                  <div>
                    <hr class="line">
                  </div>

                </div>
              </div>
            </v-container>
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
@import '../assets/styles/home.css';

#inspire {
  scroll-behavior: smooth;
}
</style>