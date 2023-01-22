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
          <div class="rowMission textSmall" v-for="missions in this.missionStore.getMissions">
            <div class="rowStyle">
                <div class="orderRow">
                  <img :src="missions.img" class="imgIcon">
                  <p class="textMission">{{ missions.name }}</p>
                </div>
                  <div class="circularProgressContainer">
                    <div class="circularProgress"></div>
                  </div>
              </div>
              <div id="desc" class="rowDesc">{{ missions.description }}</div>
          </div>
        </v-carousel-item>
      <!-- Recent Posts -->
        <v-carousel-item>
          <div>
            
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
    {{ progressBar }}
</template>

<script>
  import {missionStore} from '../stores/mission.js'
  import {userStore} from '../stores/user.js'
    export default {
        data () {
          return {
            missionStore: missionStore(),
            userStore: userStore(),
            titles: ['Missões', 'Publicações Recentes', 'Medalhas', 'Classificação'],
            model: 0,
            user: {}
      }
    },
    computed: {
      progressBar(/* index */) {
        let index = 1
        console.log(this.$el.querySelectorAll('.circularProgress')[index])
        let progressBar = this.$el.querySelector('.circularProgress')
        let progressValue = this.userStore.getUserMissionState(this.user.id)[index]
        
        progressBar.style.background = `conic-gradient(
        #ffffff 50deg,#3045ff 20deg)`
        /* progressBar.style.background = `conic-gradient(~
        #ffffff ${progressValue * 3.6}deg,
        #3045ff ${progressValue * 3.6}deg)` */
      }
    },
    created () {
      this.user = JSON.parse(localStorage.getItem('currentUser'))
      console.log(this.userStore.getUserMissionState(this.user.id))
    },
    }
</script>

<style lang="scss" scoped>
    @import '../assets/styles/sideBar.css';
</style>