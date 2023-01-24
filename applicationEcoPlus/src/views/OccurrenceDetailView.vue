<template>
<v-app id="inspire">
    <v-container>
      <v-row no-gutters>
        <v-col cols="3">
          <v-sheet class="pa-2 ma-2">
            <!-- navbar -->
            <NavBar/>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2" style="background-color: blue">
            <!-- content -->
            <h1>{{ occurrence.title }}</h1>
            <h2>{{ occurrence.location }}</h2>
            <h3>Description of the location: {{ occurrence.locationDescription }}</h3>
            <p>" {{ occurrence.description }} "</p>
            <p>Submited by {{ user.name }}</p>
            <p>
                {{ turnDateHour }}
                Posted {{ this.date[2] }}/{{ this.date[1] }}/{{ this.date[3] }} at {{ this.date[4] }}
            </p>
            <img :src = occurrence.image width="500">
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

<script>
import SideBar from '../components/SideBar.vue'
import NavBar from '../components/NavBar.vue'
import { occurrenceStore } from "../stores/occurrence";
import { userStore } from "../stores/user"

export default {
        components: {
            SideBar, NavBar
        },
        data() {
            return {
                userStore: userStore(),
                occurrenceStore: occurrenceStore(),
                occurrence: {},
                user: {},
                date: '',
                hour: ''
            }
        },
        created() {
            this.occurrence = this.occurrenceStore.getOccurrenceById(this.$route.params.occurrenceid)
            this.user = this.userStore.getUserById(this.occurrence.userId)

        },
        computed: {
            turnDateHour() {
              this.date = this.occurrence.dateHour.date
            }
        }
}
</script>

<style lang="scss" scoped>
    @import '../assets/styles/base.css';
</style>