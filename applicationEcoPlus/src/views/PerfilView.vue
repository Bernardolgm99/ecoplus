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

        <!-- content -->
        <v-col>
            <div class="perfilHeader bannerPerfil" :style="{'background-image': 'url(' + user.perfilBgImage + ')'}">
              <div class="containUserInfo">
                {{ user.username }}
                {{ user.name }}
              </div>
            </div>
            <v-sheet class="pa-2 contentColumnPerfil" style="background-color: rgba(255, 250, 246, 1); 
              border-right: 1px solid rgba(111, 190, 135, 1);
              border-left: 1px solid rgba(111, 190, 135, 1);">
            <!-- content -->
            <div v-for="post in userFeed" class="content">

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
            userFeed: [],
        }
    },
    created() {
        this.userStore.getUsers.findIndex(user => {
            if(user.id == this.$route.params.perfilid) this.user = user
        })
        /* create feed user */
        let occurrenceArray = this.occurrenceStore.getOccurrences
        let eventArray = this.eventStore.getEvents
        for (let event of eventArray) {
          this.userFeed.push(event)
        }
        for (let occurrence of occurrenceArray) {
          this.userFeed.push(occurrence)
        }
        this.userFeed.sort((a, b) => (b.dateHour.compare + b.dateHour.compare) - (a.dateHour.compare + a.dateHour.compare))
    }
}
</script>

<style lang="scss" scoped>
    @import '../assets/styles/perfil.css';
    @import '../assets/styles/home.css';
    @import '../assets/styles/base.css';
</style>