<template>
    <v-app id="inspire">
    <v-container>
      <v-row no-gutters>
        <!-- navbar -->
        <v-col cols="3">
          <v-sheet class="pa-2 ma-2">
            <NavBar />
          </v-sheet>
        </v-col>

        <!-- content -->
        <v-col class="contentColumn">
            <div class="perfilHeader bannerPerfil" :style="{'background-image': 'url(' + user.perfilBgImage + ')'}">
            </div>
            <div class="containUserInfo">
                {{ user.username }}
                {{ user.name }}
            </div>
            <v-sheet class="pa-2 ma-2" style="background-color: blue">
                <div v-for="post in userFeed" class="content">
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
    @import '../assets/styles/base.css';
</style>