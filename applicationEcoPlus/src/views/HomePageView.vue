<script>
import SideBar from '../components/SideBar.vue'
import NavBar from '../components/NavBar.vue'
import { occurrenceStore } from '../stores/occurrence'
import { eventStore } from '../stores/event'
import { userStore } from '../stores/user'

export default {
  

    components: {
        SideBar, NavBar
    },
    data() {
      return {
        userStore: userStore(),
        occurrenceStore: occurrenceStore(),
        eventStore: eventStore(),
        feed: [],
      }
    },
    created() {

      if(!JSON.parse(localStorage.getItem('currentUser'))){
          this.$router.push({name: 'signin'})
      }
    },
    computed: {
      createFeed() {
        
        let occurrenceArray = this.occurrenceStore.getOccurrences
        let eventArray = this.eventStore.getEvents
        let longerArray 
        let max = Infinity
        
        if(occurrenceArray.length < eventArray.length){
          longerArray = eventArray
        } else {
          longerArray = occurrenceArray
        }

        for(let i = 0; i < longerArray.length; i++) {
          if(occurrenceArray[i] != undefined){
            this.feed.push(occurrenceArray[i])
          }
          if(eventArray[i] != undefined){
            this.feed.push(eventArray[i])
          }
        }

        this.feed.sort()

      }
    }
}
</script>

<template>
  {{createFeed}}
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
          <v-sheet class="pa-2 ma-2" style="background-color: blue">
            <!-- content -->
            <div v-for="post in feed">
            
                <div id="card">
                  <img :src = post.image width="500">
                  <div>
                    <h1>{{post.title}}</h1> &nbsp;
                    <h3>{{post.location}}</h3>
                  </div>
                </div>
                
                <div id="comments" v-for="comment in post.comments">
                  <p id="userName">@{{ userStore.getUserById(comment.user).username }}</p>
                  <p id="comment">{{ comment.comment}}</p>
                </div>
                
                
                <div id="routerLink" v-if="post.type == 'event'">
                  <h5><RouterLink :to="{name: 'eventDetail', params:{eventid : post.id}}">View More!</RouterLink> </h5>
                </div>
                <div id="routerLink" v-else>
                  <h5><RouterLink :to="{name: 'occurrenceDetail', params:{occurrenceid : post.id}}">View More!</RouterLink> </h5>
                </div>
                

            </div>

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
  @import '../assets/styles/base.css';
</style>