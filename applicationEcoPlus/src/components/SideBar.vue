<template>
  <div class="alignContentSpaceAround" id="bg">
    <v-btn flat="true" icon="mdi-menu-left" class="btnSideBar"
      @click="model = Math.max(model - 1, 0)"
    ></v-btn>
    {{ titles[model] }}
    <v-btn flat="true" icon="mdi-menu-right" class="btnSideBar"
      @click="model = Math.min(model + 1, 3)"
    ></v-btn>
  </div>
  
  <v-carousel hide-delimiters :show-arrows="false" v-model="model" id="carouselItems" class="ma-0">
    <!-- quests -->
      <!-- <v-carousel-item>
        <div class="d-flex flex-column align-center">
          <div class="d-flex align-center justify-space-between pa-0 px-2 py-1 ma-0 mb-1 textSmall tooltip rowStyleMission" v-for="mission in this.missionStore.getMissions">
              <div>
                <img :src="mission.img" class="imgIcon">
              </div>  
              <div>
                <p class="px-2">{{ mission.name }}</p>
              </div>  
              <div>
                <div :style="{ 'background': 'conic-gradient( #bfbfbf ' + Math.round((this.userStore.getUserMissionState(this.user.id)[mission.id]/mission.quantity) * 360) + 'deg,#ffffff ' + Math.round((this.userStore.getUserMissionState(this.user.id)[mission.id]/mission.quantity) * 360) + 'deg)'}" class="circularProgress"></div>
              </div>  
              <div id="desc" class="rowDesc tooltiptext">{{ mission.descriptionription }}</div>
            </div>
        </div>
      </v-carousel-item> -->
    <!-- Recent Posts -->
      <v-carousel-item>
          <div class="d-flex flex-column align-center ">
            <div v-for="post in feed" class="ma-0 pa-0 w-100">
              <RouterLink v-if="post.IdCreator != undefined" :to="{name: 'eventDetail', params:{eventid : post.id}}">
                <div class="postBgImage alignContentBottom mx-auto pa-0" :style="{'background-image': 'url(' + post.image + ')'}">
                  <div class="postTitleContent">
                    <div class="postIconBackground">
                      <img class="postIcon" src="/src/assets/icons/calendar.svg">
                    </div>
                    <h1 class="textSmall postTitle" v-if="post.name.length < 18">{{post.name}}</h1>
                    <h1 class="textSmall postTitle" v-else>{{post.name.substring(0, 19)}}...</h1>
                  </div>
                </div>  
              </RouterLink>

              <RouterLink v-else :to="{name: 'occurrenceDetail', params:{occurrenceid : post.id}}">
                <div class="w-100 postBgImage alignContentBottom mx-auto pa-0" :style="{'background-image': 'url(' + post.image + ')'}">
                  <div class="postTitleContent">
                    <div class="postIconBackground">
                      <img class="postIcon" src="/src/assets/icons/tool.svg">
                    </div>
                    <h1 class="textSmall postTitle" v-if="post.name.length < 18">{{post.name}}</h1>
                    <h1 class="textSmall postTitle" v-else>{{post.name.substring(0, 19)}}...</h1>
                  </div>
                </div>
              </RouterLink>
            </div>
          </div>
      </v-carousel-item>
    <!-- Badges -->
      <v-carousel-item>
        <!-- nao tem badges -->
        <v-col class="bgGrey mx-auto ml-2 mr-2 align-center" v-if="getBadges('occurrence').length == 0 && getBadges('activity').length == 0 && getBadges('event').length == 0 && getBadges('other').length == 0"> 
          <v-row class="ma-1">
            <h3>Não tens Medalhas!</h3>
          </v-row>
          <v-row class="ma-1">
            <p>Não te preocupes, consegues obtê-las participando em Atividades e Eventos, publicando Ocorrências que encontres na tua escola e por classificares Atividades/Eventos</p>
          </v-row>
        </v-col>
        
        <!-- tem badges -->
        <v-col class="bgGrey mx-auto align-center " v-else>
          <!-- items container -->
          <!-- Events/Activities -->
          <v-row class="ma-1" v-if="getBadges('activity').length > 0 || getBadges('event').length > 0">
            <h3>Eventos/Atividades</h3>
          </v-row>
          <v-row class="ma-1" v-if="getBadges('activity').length > 0 || getBadges('event').length > 0">
            <!-- container item -->
            <div class="orderColumnCenter tooltipBadges mr-1"  v-for="badge in getBadges('event')">
              <img :src="badge.img" class="badgeImg">
              <div>{{ badge.name }}</div>
              <div class="tooltiptextBadges">
                <p><strong>{{ badge.name }}</strong></p>
                <p>{{ badge.description }}</p>
              </div>
            </div>
            <div class="orderColumnCenter tooltipBadges mr-1"  v-for="badge in getBadges('activity')">
              <img :src="badge.img" class="badgeImg">
              <div>{{ badge.name }}</div>
              <div class="tooltiptextBadges">
                <p><strong>{{ badge.name }}</strong></p>
                <p>{{ badge.description }}</p>
              </div>
            </div>
          </v-row>

          <!-- between activity/event and occurence -->
          <v-row class="mb-1 orderColumnCenter" v-if="getBadges('activity').length > 0 && getBadges('occurrence').length > 0 || 
                                                      getBadges('event').length > 0 && getBadges('occurrence').length > 0 || 
                                                      getBadges('activity').length > 0 && getBadges('other').length > 0 ||
                                                      getBadges('event').length > 0 && getBadges('other').length > 0">
            <div class="divider"></div>
          </v-row>

          <!-- occurences -->
          <v-row class="ma-1" v-if="getBadges('occurrence').length > 0">
            <h3>Ocorrências</h3>
          </v-row>
          <v-row class="ma-1" v-if="getBadges('occurrence').length > 0">
            <!-- container item -->
            <div class="orderColumnCenter tooltipBadges mr-1"  v-for="badge in getBadges('occurrence')">
              <img :src="badge.img" class="badgeImg">
              <div>{{ badge.name }}</div>
              <div class="tooltiptextBadges">
                  <p><strong>{{ badge.name }}</strong></p>
                  <p>{{ badge.description }}</p>
              </div>
            </div>
          </v-row>
          
          <!-- between occurence and other -->
          <v-row class="orderColumnCenter mb-1" v-if="getBadges('other').length > 0 && getBadges('occurrence').length > 0">
            <div class="divider"></div>
          </v-row>

          <!-- others -->
          <v-row class="ma-1" v-if="getBadges('other').length > 0">
            <h3>Outros</h3>
          </v-row>
          <v-row class="ma-1" v-if="getBadges('other').length > 0">
            <!-- container item -->
            <div class="orderColumnCenter tooltipBadges mr-1"  v-for="badge in getBadges('other')">
              <img :src="badge.img" class="badgeImg">
              <div>{{ badge.name }}</div>
              <div class="tooltiptextBadges">
                  <p><strong>{{ badge.name }}</strong></p>
                  <p>{{ badge.description }}</p>
              </div>
            </div>
          </v-row>

        </v-col>
      </v-carousel-item>
    <!-- Ranking -->
      <v-carousel-item> 
        <!-- col div, has everything -->
        <v-col class="rankingBgContainer pa-0 mx-auto">
          <!--  -->
          <v-row class="pa-3 pb-0 d-flex justify-space-between"> <!-- paddingRanking rowSpaceAround -->
            <button @click="filterRanking('badges')" class="btnFilter pa-1 px-2" variant="plain">Medalhas</button> <!-- btnFilter -->
            <button @click="filterRanking('occurrences')" class="btnFilter pa-1 px-2" variant="plain">Ocorrências</button>
            <button @click="filterRanking('event')" class="btnFilter pa-1 px-2" variant="plain">Eventos</button>
            <div class="dividerBlack"></div>
          </v-row><!-- mt-2 paddingRanking -->
          <!--  -->
          <v-row class="mt-2 pa-3 pb-2 pt-0"> <!-- tableHeader -->
            <v-col cols="3" class="alignContentCenter pt-2 pb-2"> <!--  -->
              <p>Rank</p>
            </v-col>
            <v-col class="alignContentCenter pt-2 pb-2"> <!-- alignContentCenter -->
              <p>Nome</p>
            </v-col>
            <v-col cols="3" class="alignContentCenter pt-2 pb-2"> <!-- alignContentCenter -->
              <p>Num</p>
            </v-col>
          </v-row>

          <v-col class="hiddenScroll">
            <v-row v-for="user, index in filterRanking(this.rankByFilter)"> <!-- alignContentCenter mt-5 mb-1 heightRanking -->
              <!-- image/rank number -->
              <v-col cols="3" class="alignContentCenter" v-if="index < 3" :style="{'background-color': rankingBackground[index]}"><!-- top3 alignContentCenter -->
                <img class="iconTop" :src="rankingImg[index]">
              </v-col> 
              <v-col cols="3" class="alignContentCenter" v-else> <!-- alignContentCenter heightRanking -->
                <p>{{ index}}</p>
              </v-col>
              <!-- username -->
              <v-col cols="6" class="alignContentCenter" v-if="index < 3" :style="{'background-color': rankingBackground[index]}"><!-- top3 alignContentCenter -->
                <p>{{ user.username }}</p><!-- textTop3 -->
              </v-col>
              <v-col cols="6" class="alignContentCenter" v-else> <!-- alignContentCenter heightRanking -->
                <p>{{ user.username }}</p>
              </v-col>
              <!-- number of -->
              <v-col cols="3" class="alignContentCenter" v-if="index < 3" :style="{'background-color': rankingBackground[index]}"><!-- top3 alignContentCenter -->
                <p class="">{{ rankByFilter == "badges" ? user.badgesState.length : rankByFilter == "occurrences" ? 
                user.occurrenceId.length : user.joined.eventId.length + user.joined.activityId.length }}</p> <!-- numTop3 -->
              </v-col>
              <v-col cols="3" class="alignContentCenter" v-else> <!-- alignContentCenter heightRanking -->
                <p>{{ rankByFilter == "badges" ? user.badgesState.length : rankByFilter == "occurrences" ? 
                user.occurrenceId.length : user.joined.eventId.length + user.joined.activityId.length }}</p>
              </v-col>
              <!-- dividers -->
              <div v-if="index == 2" class="dividerDark"></div>
              <div class="dividerRank" v-if="index > 2"></div>
            </v-row>
          </v-col>

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
import { cookie } from '../utilities/cookieFunctions'

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
      let userBadgesList = this.userStore.getBadgesState(this.user.id)
      let userBadges = []

      for(let i = 0; i < userBadgesList.length; i++) {
        if(userBadgesList[i].conditionType == type) {
          userBadges.push(userBadgesList[i])
        } 
      }
      return userBadges
    },
    filterRanking(type) {
      this.rankByFilter = type
      let users = this.userStore.getUsers
      if(type == 'badges') users.sort((a,b) => b.badges.length - a.badges.length)
      if(type == 'occurrences') users.sort((a,b) => b.occurrenceId.length - a.occurrenceId.length)
      if(type == 'event') users.sort((a,b) => (b.joined.eventId.length + b.joined.activityId.length) - (a.joined.eventId.length + a.joined.activityId.length))
      return users
    }
  },
  async created () {
    /* fetch all necessarie information */
    await this.userStore.fetchAllUsers()
    await this.badgeStore.fetchBadges()
    await this.occurrenceStore.fetchOccurrences(cookie.getCookie("token"))
    await this.eventStore.fetchAllEvents()
    
    this.user = await this.userStore.fetchLoggedUser(cookie.getCookie("token"))
    /* create most recent */
    let recentArray = []
    let occurrenceArray = this.occurrenceStore.getOccurrence
    let eventArray = this.eventStore.getEvents

    if(eventArray != undefined) for(let event of eventArray) this.feed.push(event)
    if(occurrenceArray != undefined) for (let occurrence of occurrenceArray) this.feed.push(occurrence)

    for(let i = 0; i < 3; i++) {
      if(this.feed[i] != undefined) recentArray.push(this.feed[i])
    }
    this.feed = recentArray;
  },
  }
</script>

<style lang="scss" scoped>
  @import '../assets/styles/sideBar.css';
  @import '../assets/styles/base.css';
</style>