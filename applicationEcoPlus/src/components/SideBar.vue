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
          <div class="rowMission textSmall" v-for="mission, index in this.missionStore.getMissions">
            <div class="rowStyle">
                <div class="orderRow">
                  <img :src="mission.img" class="imgIcon">
                  <p class="textMission">{{ mission.name }}</p>
                </div>
                <div class="circularProgressContainer">
                  <div ref="cProgress" class="circularProgress"></div>
                </div>
                {{ progressBar(index) }}
              </div>
              <div id="desc" class="rowDesc">{{ mission.description }}</div>
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
      progressBar(index) {
        let progressBar = document.querySelector('.circularProgress')
        /* console.log(progressBar) */
        /* let progressValue = this.userStore.getUserMissionState(this.user.id)[index] */
        console.log(index)
        console.log(progressBar)
        
        progressBar.style.background = `conic-gradient(
          #ffffff 50deg,#3045ff 20deg)`
          /* progressBar.style.background = `conic-gradient(~
          #ffffff ${progressValue * 3.6}deg,
          #3045ff ${progressValue * 3.6}deg)` */
        }
      },
      created () {
      this.user = JSON.parse(localStorage.getItem('currentUser'))
      console.log(this.$refs)
    },
    }
</script>

<style lang="scss" scoped>
    @import '../assets/styles/sideBar.css';
</style>