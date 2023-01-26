<template>
    <v-app id="inspire">
    <v-container class="noContainer">
      <v-row no-gutters>
        <!-- navbar -->
        <v-col cols="3">
          <v-sheet class="pa-2 ma-2">
            <NavBar />
          </v-sheet>
        </v-col>

        <v-col>
          <!-- perfil content -->
            <div class="perfilHeader bannerPerfil" :style="{'background-image': 'url(' + user.perfilBgImage + ')'}">
              <a class="editProfile" v-if="this.user.id == this.currentUser.id" @click="changeSettings()" >Edit Profile</a>
            </div>
            <div class="containUserInfo">
              <div class="perfilElements row">
                <img :src="user.perfilImage" class="imgPerfil">
                <div class="perfilTextElements">
                  <p class="perfilName">{{ user.name }}</p>
                  <p class="perfilDesc">{{ user.district }}, {{ user.city }}, Portugal</p>
                </div>
              </div>
            </div>
            <v-tabs v-model="tab" bg-color="#ACE4BD" class="filterPerfil">
              <v-tab class="filterBtnPerfil" value="all">All</v-tab>
              <v-tab class="filterBtnPerfil" value="events">Events</v-tab>
              <v-tab class="filterBtnPerfil" value="occurrences">Occorrences</v-tab>
            </v-tabs>
            <v-sheet class="pa-2 contentColumnPerfil" style="background-color: rgba(255, 250, 246, 1); 
              border-right: 1px solid rgba(111, 190, 135, 1);
              border-left: 1px solid rgba(111, 190, 135, 1);">
            <!-- content -->
            <v-window v-model="tab">
              <v-window-item value="all">
                <div v-for="post in feedAll()" class="content">
                  <div>
                    <div class="card">
                      <div class="image"  :style="`background: url(${post.image});`">
                        <div v-if="post.type == 'event'" class="topperIconsEvent">
                          <div class="infoCardContent">
                            <div class="postIconBackground">
                              <img class="postIcon" src="/src/assets/icons/calendar.svg">
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
                                <img class="postIcon" src="/src/assets/icons/tool.svg">
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
                      </div>
                    </div>
                    <div class="comments" v-for=",i in post.comments.length > 1 ? 2 : (post.comments.length == 1 ? 1 : 0)">
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
              </v-window-item>
              <v-window-item value="events">
                <div v-for="post in feedEvents()" class="content">
                  <div>
                    <div class="card">
                      <div class="image"  :style="`background: url(${post.image});`">
                        <div v-if="post.type == 'event'" class="topperIconsEvent">
                          <div class="infoCardContent">
                            <div class="postIconBackground">
                              <img class="postIcon" src="/src/assets/icons/calendar.svg">
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
                                <img class="postIcon" src="/src/assets/icons/tool.svg">
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
                      </div>
                    </div>
                    <div class="comments" v-for=",i in post.comments.length > 1 ? 2 : (post.comments.length == 1 ? 1 : 0)">
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
              </v-window-item>
              <v-window-item value="occurrences">
                <div v-for="post in feedOccurrences()" class="content">
                  <div>
                    <div class="card">
                      <div class="image"  :style="`background: url(${post.image});`">
                        <div v-if="post.type == 'event'" class="topperIconsEvent">
                          <div class="infoCardContent">
                            <div class="postIconBackground">
                              <img class="postIcon" src="/src/assets/icons/calendar.svg">
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
                                <img class="postIcon" src="/src/assets/icons/tool.svg">
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
                      </div>
                    </div>
                    <div class="comments" v-for=",i in post.comments.length > 1 ? 2 : (post.comments.length == 1 ? 1 : 0)">
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
              </v-window-item>
            </v-window>
          </v-sheet>
        </v-col>

        <!-- sidebar -->
        <v-col cols="3">
          <v-sheet class="pa-2 ma-2">
            <SideBar />
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import SideBar from '../components/SideBar.vue'
import NavBar from '../components/NavBar.vue'
import { userStore } from '../stores/user'
import { occurrenceStore } from '../stores/occurrence'
import { eventStore } from '../stores/event'
    
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
            currentUser: {},
            userFeed: [],
            tab: 'all',
        }
    },
    methods: {
      changeSettings() {
        
      },
      feedAll() {
        /* create feed user all */
        this.userFeed = []
        let occurrenceArray = this.occurrenceStore.getOccurrences
        let eventArray = this.eventStore.getEvents
        for (let event of eventArray) {
          if(this.user.id == event.userId) this.userFeed.push(event)
        }
        for (let occurrence of occurrenceArray) {
          if(this.user.id == occurrence.userId) this.userFeed.push(occurrence)
        }
        this.userFeed.sort((a, b) => (b.dateHour.compare + b.dateHour.compare) - (a.dateHour.compare + a.dateHour.compare))
        return this.userFeed
      },
      feedEvents() {
        /* create feed user events */
        this.userFeed = []
        let eventArray = this.eventStore.getEvents
        for (let event of eventArray) {
          if(this.user.id == event.userId) this.userFeed.push(event)
        }
        this.userFeed.sort((a, b) => (b.dateHour.compare + b.dateHour.compare) - (a.dateHour.compare + a.dateHour.compare))
        console.log(this.userFeed)
        return this.userFeed
      },
      feedOccurrences() {
        /* create feed user occurence */
        this.userFeed = []
        let occurrenceArray = this.occurrenceStore.getOccurrences
        for (let occurrence of occurrenceArray) {
          if(this.user.id == occurrence.userId) this.userFeed.push(occurrence)
        }
        console.log(this.userFeed)
        this.userFeed.sort((a, b) => (b.dateHour.compare + b.dateHour.compare) - (a.dateHour.compare + a.dateHour.compare))
        return this.userFeed
      }
    },
    created() {
        if (!JSON.parse(localStorage.getItem('currentUser'))) {
          this.$router.push({ name: 'signin' })
        }
        this.userStore.getUsers.findIndex(user => {
            if(user.id == this.$route.params.perfilid) this.user = user
        })
        this.userStore.getUsers.findIndex(user => {
            if(user.id == this.$route.params.perfilid) this.user = user
        })
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    }
}
</script>

<style lang="scss" scoped>
    @import '../assets/styles/perfil.css';
    @import '../assets/styles/home.css';
    @import '../assets/styles/base.css';
</style>