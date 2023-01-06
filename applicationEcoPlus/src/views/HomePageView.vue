<script>
import SideBar from '../components/SideBar.vue'
import NavBar from '../components/NavBar.vue'
export default {
    components: {
        SideBar, NavBar
    },

    created() {

      if(!JSON.parse(localStorage.getItem('currentUser'))){
          this.$router.push({name: 'signin'})
      }

    }
}
</script>

<template>
<v-app id="inspire">
    <v-container>
      <v-row no-gutters>
        <v-col cols="2">
          <v-sheet class="pa-2 ma-2">
            <!-- navbar -->
            <NavBar/>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <!-- content -->
            
          </v-sheet>
        </v-col>
        <v-col cols="3">
          <v-sheet class="pa-2 ma-2">
            <!-- sidebar -->
            <SideBar/>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
</v-app>
</template>

<style lang="scss" scoped>

</style>