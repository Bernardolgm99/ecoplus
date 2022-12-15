<template>
    <div class="d-flex justify-space-around align-center py-4" id="bg">
      <v-btn
        variant="text"
        icon="mdi-minus"
        @click="model = Math.max(model - 1, 0)"
      ></v-btn>
      {{quests.Titles[model]}}
      <v-btn
        variant="text"
        icon="mdi-plus"
        @click="model = Math.min(model + 1, 2)"
      ></v-btn>
    </div>
    <v-carousel hide-delimiters :show-arrows="false" v-model="model" id="bg">
        <v-carousel-item v-for="(titles, i) in titles"
        :key="titles"
        :value="i">
        <!-- content -->
            <div v-if="quests.Titles[model] = 'Quests'">
              <div v-for="item in quests.Quest">
                {{item}}
              </div>
              <br>
              <br>
              <br>
              <div>
                progress: 2 out of 3 done 
              </div>
            </div>
            <div v-if="quests.Titles[model] = 'Status'">
              status
            </div>
        </v-carousel-item>
    </v-carousel>
</template>

<script>
    export default {
        data () {
      return {
        titles: ['Quests', 'Badges', 'Recent Posts', 'Ranking'],
        model: 0,
        quests: {Titles: ['Quests', 'Badges', 'Recent Posts', 'Ranking'], Quest: ['Go for a walk','Buy cigarrets','study for PWI'], state: ['Done', 'Not Done'], descHover: ['go to the home page and join a event','etc1','etc2'],
                  }
      }
    },
    }
</script>

<style lang="scss" scoped>
    
    #bg {
        background-color: rgb(255, 149, 0);
    }
</style>