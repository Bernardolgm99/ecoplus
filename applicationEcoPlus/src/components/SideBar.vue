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
                  <img :src="this.missionStore.getIcon" alt="">
                  <p>{{ missions.name }}</p>
                </div>
                <div></div>
              </div>
              <div id="desc" class="rowDesc">{{ missions.description }}</div>
          </div>
        </v-carousel-item>
      <!-- Recent Posts -->
        <v-carousel-item>
          <div >
            mulheres sao lixo
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
    export default {
        data () {
          return {
            missionStore: missionStore(),
            titles: [],
            model: 0,
      }
    },
    created () {

      this.titles = 
      console.log(this.missionStore.getMissions);
      console.log(this.missionStore.get)
    },
    }
</script>

<style lang="scss" scoped>
    @import '../assets/styles/sideBar.css';
</style>