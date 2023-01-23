<template>
    <div class="alignContentSpaceAround" id="bg">
      <v-btn
        @click="model = Math.max(model - 1, 0)"
      ></v-btn>
      {{ titles[model] }}
      <v-btn
        @click="model = Math.min(model + 1, 3)"
      ></v-btn>
    </div>
    <v-carousel hide-delimiters :show-arrows="false" v-model="model" id="carouselItems" class="alignContentCenter">
      <!-- quests -->
        <v-carousel-item>
          <div class="rowMission textSmall" v-for="mission in this.missionStore.getMissions">
            <div class="rowStyleMission">
                <div class="orderRow">
                  <img :src="mission.img" class="imgIcon">
                  <p class="textMission">{{ mission.name }}</p>
                </div>
<<<<<<< Updated upstream
                <div :style="{ 'background': 'conic-gradient(#bfbfbf ' + (this.userStore.getUserMissionState(this.user.id)[mission.id]/mission.quantity) * 360 + 
                'deg,#fff ' + (this.userStore.getUserMissionState(this.user.id)[mission.id]/mission.quantity) * 360 + 'deg)'}" ref="cProgress" class="circularProgress"></div>
            </div>
            <div id="desc" class="rowDesc">{{ mission.description }}</div>
=======
                <div class="circularProgressContainer">
                  <div ref="cProgress" class="circularProgress"></div>
                </div>
                <!-- {{ progressBar(index) }} -->
              </div>
              <div id="desc" class="rowDesc">{{ mission.description }}</div>
>>>>>>> Stashed changes
          </div>
        </v-carousel-item>
      <!-- Recent Posts -->
        <v-carousel-item>
          <!-- {{createFeed}} -->
          <div v-for="post in feed">
            <!-- type == event -->
            <div v-if="post.type == 'event'">
              <RouterLink :to="{name: 'eventDetail', params:{eventid : post.id}}">
                <div class="postBgImage alignContentBottom" :style="{'background-image': 'url(' + post.image + ')'}">
                  <div class="postTitleContent">
                    <div class="postIconBackground">
                      <img v-if="post.type == 'occurrence'" class="postIcon" src="src/assets/icons/tool.svg">
                      <img v-else class="postIcon" src="src/assets/icons/calendar.svg">
                    </div>
                    <h1 class="textMediumLarge postTitle">{{post.title}}</h1>
                  </div>
                </div>
              </RouterLink>
            </div>
            <!-- type == occurrence -->
            <div v-if="post.type == 'occurrence'">
              <RouterLink :to="{name: 'occurrenceDetail', params:{occurrenceid : post.id}}">
                <div class="postBgImage alignContentBottom" :style="{'background-image': 'url(' + post.image + ')'}">
                  <div class="postTitleContent">
                    <div class="postIconBackground">
                      <img v-if="post.type == 'occurrence'" class="postIcon" src="src/assets/icons/tool.svg">
                      <img v-else class="postIcon" src="src/assets/icons/calendar.svg">
                    </div>
                    <h1 class="textMediumLarge postTitle">{{post.title}}</h1>
                  </div>
                </div>
              </RouterLink>
            </div>
          </div>
        </v-carousel-item>
      <!-- Badges -->
        <v-carousel-item>
          <div>
            mulheres sao todas boas, estava a mentir
          </div>
        </v-carousel-item>
      <!-- Ranking -->
        <v-carousel-item>
          <div>
            homens sao gays
          </div>
        </v-carousel-item>
    </v-carousel>
</template>

<script>
  import {missionStore} from '../stores/mission.js'
  import { occurrenceStore } from '../stores/occurrence'
  import { eventStore } from '../stores/event'
  import { userStore } from '../stores/user'
    export default {
        data () {
          return {
            /* missions */
            missionStore: missionStore(),
            userStore: userStore(),
            titles: ['Missões', 'Publicações Recentes', 'Medalhas', 'Classificação'],
            model: 0,
            user: {},

            /* recent posts */
            occurrenceStore: occurrenceStore(),
            eventStore: eventStore(),
            feed: []
      }
    },
<<<<<<< Updated upstream
    created () {
=======
/*     computed: {
      progressBar(index) {
        let progressBar = document.querySelector('.circularProgress') */
        /* console.log(progressBar) */
        /* let progressValue = this.userStore.getUserMissionState(this.user.id)[index] */
/*         console.log(index)
        console.log(progressBar)
        
        progressBar.style.background = `conic-gradient(
          #ffffff 50deg,#3045ff 20deg)` */
          /* progressBar.style.background = `conic-gradient(~
          #ffffff ${progressValue * 3.6}deg,
          #3045ff ${progressValue * 3.6}deg)` */
/*         }
      }, */
      created () {
>>>>>>> Stashed changes
      this.user = JSON.parse(localStorage.getItem('currentUser'))
      if(!JSON.parse(localStorage.getItem('currentUser'))){
          this.$router.push({name: 'signin'})
      }

      /* CREATE FEED */
      let recentArray = []
      let occurrenceArray = this.occurrenceStore.getOccurrences
      let eventArray = this.eventStore.getEvents
      for(let event of eventArray) {
        this.feed.push(event)
      }
      for(let occurrence of occurrenceArray) {
        this.feed.push(occurrence)
      }
      
      this.feed.sort((a,b) => (b.dateHour.date + b.dateHour.hour) - (a.dateHour.date + a.dateHour.hour))
      
      for(let i = 0; i < 3; i++) {
        recentArray.push(this.feed[i])
      }

      this.feed = recentArray
      
    },
    }
</script>

<style lang="scss" scoped>
    @import '../assets/styles/sideBar.css';
</style>