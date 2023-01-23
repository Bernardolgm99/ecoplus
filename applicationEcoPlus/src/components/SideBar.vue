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
                <div :style="{ 'background': 'conic-gradient( #bfbfbf ' + Math.round((this.userStore.getUserMissionState(this.user.id)[mission.id]/mission.quantity) * 360) + 'deg,#ffffff ' + Math.round((this.userStore.getUserMissionState(this.user.id)[mission.id]/mission.quantity) * 360) + 'deg)'}" class="circularProgress"></div>
                
              </div>
              <div id="desc" class="rowDesc">{{ mission.description }}</div>
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
          <div class="bgGrey">
            <!-- items container -->
            <div class="contentBadgesCat" v-if="getBadges('occurrence').length > 0">
              <h3>Ocorrências</h3>
              <div class="orderBadges">
                <!-- container item -->
                <div class="orderColumnCenter badgeImgContainer displayWarp"  v-for="badge in getBadges('occurrence')">
                  <img :src="badge.img" class="badgeImg">
                  <!-- <p>{{ badge.name }}</p> -->
                </div>
              </div>
            </div>

            <div class="orderColumnCenter" v-if="getBadges('activity').length > 0 || getBadges('events').length > 0">

              <!-- divider -->
              <div class="divider"></div>
              <!-- divider -->
              <div class="contentBadgesCat">
                <h3>Eventos/Atividades</h3>
                <div class="orderBadges">
                  <!-- container item -->
                  <div class="orderColumnCenter badgeImgContainer"  v-for="badge in getBadges('events')">
                    <img :src="badge.img" class="badgeImg">
                    <!-- <p>{{ badge.name }}</p> -->
                  </div>
                  <div class="orderColumnCenter badgeImgContainer"  v-for="badge in getBadges('activity')">
                    <img :src="badge.img" class="badgeImg">
                    <!-- <p>{{ badge.name }}</p> -->
                  </div>
                </div>
              </div>

            </div>
              
            <div class="orderColumnCenter" v-if="getBadges('other').length > 0">

              <!-- divider -->
              <div class="divider"></div>
              <!-- divider -->
              <div class="contentBadgesCat displayColumn" v-if="getBadges('occurrence').length > 0">
              <h3>Ocorrências</h3>
              <div class="orderBadges">
                <!-- container item -->
                <div class="orderColumnCenter badgeImgContainer displayWarp"  v-for="badge in getBadges('other')">
                  <img :src="badge.img" class="badgeImg">
                  <!-- <p>{{ badge.name }}</p> -->
                </div>
              </div>
            </div>

            </div>

          </div>
        </v-carousel-item>
      <!-- Ranking -->
        <v-carousel-item>
          <div>
            
          </div>
        </v-carousel-item>
    </v-carousel>
</template>

<script>
  import {missionStore} from '../stores/mission'
  import { occurrenceStore } from '../stores/occurrence'
  import { eventStore } from '../stores/event'
  import { badgeStore } from '../stores/badge'
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
            feed: [],

            /* badges */
            badgeStore: badgeStore(),
      }
    },
    methods: {
      getBadges(type) {
        let userBadges = []
        let userState = this.userStore.getBadgesState(this.user.id)
        let allBadges = this.badgeStore.getBadges


        for(let i = 0; i < allBadges.length; i++) {
          if(allBadges[i].type == type && userState[i] == true) userBadges.push(allBadges[i])
        }

        return userBadges
      }
    },
    created () {
      
      this.user = JSON.parse(localStorage.getItem('currentUser'))

      /* create most recent */
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