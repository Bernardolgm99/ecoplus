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
                      <img v-if="post.type == 'occurrence'" class="postIcon" src="/src/assets/icons/tool.svg">
                      <img v-else class="postIcon" src="/src/assets/icons/calendar.svg">
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
                      <img v-if="post.type == 'occurrence'" class="postIcon" src="/src/assets/icons/tool.svg">
                      <img v-else class="postIcon" src="/src/assets/icons/calendar.svg">
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
            <div class="contentBadgesCat" v-if="getBadges('occurrence').length == 0 && getBadges('activity').length == 0 && getBadges('events').length == 0 && getBadges('other').length == 0">
              <h3>Não tens Medalhas!</h3>
              <p>Não te preocupes, consegues obtelas participando em Atividades e Eventos, publicando Ocorrências que encontres na tua escola e por classificares Atividades/Eventos</p>
            </div>

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

          <div class="orderColumnCenter" v-if="getBadges('activity').length > 0 || getBadges('events').length > 0 && getBadges('occurrence').length > 0">
            <!-- divider -->
            <div class="divider"></div>
            <!-- divider -->
          </div>

              <div class="contentBadgesCat"  v-if="getBadges('activity').length > 0 || getBadges('events').length > 0">
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

            
          <div class="orderColumnCenter" v-if="getBadges('other').length > 0 && getBadges('activity').length > 0 || getBadges('events').length > 0">
            <!-- divider -->
            <div class="divider"></div>
            <!-- divider -->
          </div>

              <div class="contentBadgesCat displayColumn" v-if="getBadges('other').length > 0">
              <h3>Outros</h3>
              <div class="orderBadges">
                <!-- container item -->
                <div class="orderColumnCenter badgeImgContainer displayWarp"  v-for="badge in getBadges('other')">
                  <img :src="badge.img" class="badgeImg">
                  <!-- <p>{{ badge.name }}</p> -->
                </div>
              </div>
            </div>


          </div>
        </v-carousel-item>
      <!-- Ranking -->
        <v-carousel-item> 
          <v-col class="rankingBgContainer">
            <v-row class="paddingRanking rowSpaceAround">
              <button @click="filterRanking('badges')" class="btnFilter" variant="plain">Medalhas</button>
              <button @click="filterRanking('occurrences')" class="btnFilter" variant="plain">Ocorrências</button>
              <button @click="filterRanking('events')" class="btnFilter" variant="plain">Eventos</button>
              <div class="dividerBlack"></div>
            </v-row>
            <div class="mt-2 paddingRanking">
              <v-row class="tableHeader">
                <v-col cols="3" class="alignContentCenter">
                  <p>Rank</p>
                </v-col>
                <v-col class="alignContentCenter">
                  <p>Nome</p>
                </v-col>
                <v-col cols="3" class="alignContentCenter">
                  <p>Num</p>
                </v-col>
              </v-row>
            </div>

            <div class="hiddenScroll">
              <v-row class=" alignContentCenter mt-5 mb-1 heightRanking" v-for="user, index in filterRanking(this.rankByFilter)">
                
                <v-row class="top3Container " v-if="index < 3" :style="{'background-color': rankingBackground[index]}">
                  <v-col cols="3" class="top3 alignContentCenter">
                    <img class="iconTop" :src="rankingImg[index]">
                  </v-col>
                  <v-col class="alignContentCenter top3">
                    <p class="textTop3">{{ user.username }}</p>
                  </v-col>
                  <v-col cols="3" class="top3 alignContentCenter">
                    <p class="numTop3">{{ rankByFilter == "badges" ? user.badgesState.length : rankByFilter == "occurrences" ? user.occurrenceId.length : user.joined.eventId.length + user.joined.activityId.length }}</p>
                  </v-col>
                  <!-- divider -->
                  <div v-if="index == 2" class="dividerDark"></div>
                </v-row>
                
                <v-row class="heightRanking alignContentCenter" v-else>
                  <v-col cols="4" class="alignContentCenter heightRanking">
                    <p>{{ index}}</p>
                  </v-col>
                  <v-col class="alignContentCenter heightRanking">
                    <p>{{ user.username }}</p>
                  </v-col>
                  <v-col cols="4" class="alignContentCenter heightRanking">
                    <p>{{ rankByFilter == "badges" ? user.badgesState.length : rankByFilter == "occurrences" ? user.occurrenceId.length : user.joined.eventId.length + user.joined.activityId.length }}</p>
                  </v-col>
                  <div class="dividerRank my-2"></div>
                </v-row>
                
              </v-row>
              
            </div>
          </v-col>
        </v-carousel-item>
    </v-carousel>
</template>

<script>
  import { userStore } from '../stores/user'
  import { occurrenceStore } from '../stores/occurrence'
  import { eventStore } from '../stores/event'
  import { missionStore } from '../stores/mission'
  import { badgeStore } from '../stores/badge'
    export default {
        data () {
          return {
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

            /* ranking */
            selected: '',
            rankingImg: ['/src/assets/icons/leafFirstPlace.svg','/src/assets/icons/leafSecondPlace.svg','/src/assets/icons/leafThirdPlace.svg'],
            rankingBackground: ['rgba(156, 209, 171, 0.9)','rgba(156, 209, 171, 0.5)','rgba(156, 209, 171, 0.3)'],
            rankByFilter: 'badges'

      }
    },
    methods: {
      getBadges(type) {
        let userBadges = []
        let userState = this.userStore.getBadgesState(this.user.id)
        let allBadges = this.badgeStore.getBadges

        for(let i = 0; i < allBadges.length; i++) {
          if(allBadges[i].type == type) {
            if(userState.findIndex(element => element == allBadges[i].id)  != -1) userBadges.push(allBadges[i])
          } 
        }

        /* if(type == 'badges') {
          let countBadges = 0
          userState.forEach(element => {
            element.badgesState.forEach(item => {
              if(item == true) countBadges++
            });
            userBadges.sort((b,a) => ())
            
          }); 
        }*/

        return userBadges
      },
      filterRanking(type) {
        this.rankByFilter = type
        let users = this.userStore.getUsers
        if(type == 'badges') users.sort((a,b) => b.badgesState.length - a.badgesState.length)
        if(type == 'occurrences') users.sort((a,b) => b.occurrenceId.length - a.occurrenceId.length)
        if(type == 'events') users.sort((a,b) => (b.joined.eventId.length + b.joined.activityId.length) - (a.joined.eventId.length + a.joined.activityId.length))
        return users
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
      this.feed.sort((a,b) => (b.dateHour.compare + b.dateHour.compare) - (a.dateHour.compare + a.dateHour.compare))

      for(let i = 0; i < 3; i++) {
        if(this.feed[i] != undefined) recentArray.push(this.feed[i])
      }
      
      this.feed = recentArray
      
    },
    }
</script>

<style lang="scss" scoped>
    @import '../assets/styles/sideBar.css';
</style>