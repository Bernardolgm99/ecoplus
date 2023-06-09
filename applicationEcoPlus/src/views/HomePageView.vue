<script>
import SideBar from '../components/SideBar.vue'
import NavBar from '../components/NavBar.vue'
import { occurrenceStore } from '../stores/occurrence'
import { eventStore } from '../stores/event'
import { userStore } from '../stores/user'
import { cookie } from '../utilities/cookieFunctions'

export default {

  components: {
    SideBar, NavBar
  },
  data() {
    return {
      userStore: userStore(),
      occurrenceStore: occurrenceStore(),
      eventStore: eventStore(),
      user: {},
      feed: [],
    }
  },
  created() {
    if (!cookie.getCookie("token")) {
      this.$router.push({ name: 'signin' })
    }
  },
  async created(){
    await this.occurrenceStore.fetchOccurrences(cookie.getCookie("token"))
    await this.eventStore.fetchAllEvents()

    await this.userStore.fetchLoggedUser();
    this.user = await this.userStore.getUser;
    await this.eventStore.fetchAllEvents();

    let occurrenceArray = this.occurrenceStore.getOccurrences
    let eventArray = this.eventStore.getEvents
    
    if(eventArray != undefined) for (let event of eventArray) this.feed.push(event)
    if(occurrenceArray != undefined) for (let occurrence of occurrenceArray) this.feed.push(occurrence)
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
            <NavBar :user="user"/>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 border-page" style="background-color: rgba(255, 250, 246, 1);">
            <!-- content -->
            <v-container class="d-flex flex-column align-center contentColumn">
              <div v-for="post in feed" class="content">

                  <div class="card">
                    <div class="image" :style="`background: url(${post.image});`">
                      <div v-if="post.status == 1" class="topperIconsOccurrence">
                        <div class="infoCardContent">
                          <div class="postIconBackground">
                            <img class="postIcon" :src="'src/assets/icons/tool.svg'">
                          </div>
                          <div class="infos">
                            <div class="title">
                              <span class="textMediumLarge">{{ post.name }} {{
                                post.status == "3" ? `(${post.status})`
                                  : ""
                              }}</span> &nbsp;
                            </div>
                            <div class="location">
                              <span class="textSmall txtLocation">{{ post.location }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div v-if="post.IdCreator != undefined" class="topperIconsEvent">
                        <div class="infoCardContent">
                          <div class="postIconBackground">
                            <img class="postIcon" :src="'src/assets/icons/calendar.svg'">
                          </div>
                          <div class="infos">
                            <div class="title">
                              <span class="textMediumLarge">{{ post.name }}</span> &nbsp;
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


                  <div class="routerLink" v-if="post.IdCreator != undefined">
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