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
          <v-sheet class="pa-2 ma-2" style="background-color: green">
            <!-- content -->
            <div id="title">
<!--                 <div id="backBtn">
                    {{buttonBack}}
                </div> -->
                <div class="textTitle">
                    Post Occurrence
                </div>
            </div>
            <div id="content">

                <div id="contTitle">
                    <span class="textMediumLarge">Title: </span>
                    <v-text-field label="Title" variant="solo" v-model="title"></v-text-field>
                </div>
                <div id="contLocation">
                    <span class="textMediumLarge">Location: </span>
                    <v-text-field label="Location" variant="solo" v-model="location"></v-text-field>
                </div>
                <div id="contLocationDesc">
                    <span class="textMediumLarge">Location description: </span>
                    <v-text-field label="Location Description" variant="solo" v-model="locationDesc"></v-text-field>
                </div>
                <div id="inputFile">
                    <span class="textMediumLarge">Image:</span>
                    <v-file-input label="File input" variant="solo" v-model="image"></v-file-input>
                </div>
                <div id="txtAreaInput">
                    <span class="textMediumLarge">Description:</span>
                    <v-textarea label="Write here your suggestion..." v-model="desc" variant="solo"></v-textarea>
                </div>
                <div id="btnDuo">
                    <div id="btnBack">
                        <v-btn variant="tonal">
                            Back
                        </v-btn>
                    </div>
                    <div id="btnCommit">
                        <v-btn variant="tonal" @click="postOccurrence()">
                            Post
                        </v-btn>
                    </div>
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

<script>

import SideBar from '../components/SideBar.vue'
import NavBar from '../components/NavBar.vue'
import { occurrenceStore } from '../stores/occurrence.js'
/* import buttonBack from '../components/ButtonGoBack.vue' */

    export default {
        components: {
            SideBar, NavBar
        },
        data() {
            return {
                occurrenceStore: occurrenceStore(),
                title: '',
                location: '',
                locationDesc: '',
                image: '',
                desc: '',
                user: {}
            }
        },
        methods: {
            postOccurrence() {
                this.occurrenceStore.addOccurrence(this.user.id, this.title, this.image, this.location, this.locationDesc, this.desc)
                this.$router.push('/home') 
            }
        },
        created() {
            if(!JSON.parse(localStorage.getItem('currentUser'))){
              this.$router.push({name: 'signin'})
            } else {
              this.user = JSON.parse(localStorage.getItem('currentUser'))
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import '../assets/styles/base.css';
  #inspire {
    scroll-behavior: smooth;
  }
</style>