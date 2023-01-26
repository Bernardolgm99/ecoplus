<template>
<v-app id="inspire">
    <v-container class="noContainer height100">
      <v-row no-gutters class="height100">
        <v-col cols="3">
          <v-sheet class="pa-2 ma-2">
            <!-- navbar -->
            <NavBar/>
          </v-sheet>
        </v-col>
       
        <v-col>
          <v-sheet class="pa-2 border-page">
            <!-- content -->
            <v-container>
              <div>
                <div id="title">
                  <div class="textTitle">
                      <ButtonGoBack />
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
                    <div>
                      <v-alert prominent type="error" variant="outlined" style="margin-bottom: 20px;" v-if="alert" id="alert">
                        <strong>All parameters are required!</strong>
                      </v-alert>
                    </div>
                  <div id="buttons">
                    <div id="btnOrganizer">
                      <div id="btnBack">
                          <v-btn class="btn" id="backBtn" @click="this.$router.push('/home')">
                              Back
                          </v-btn>
                      </div>
                      <div id="btnCommit">
                          <v-btn class="btn" id="sendBtn" @click="postOccurrence"> 
                              Send
                          </v-btn>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </v-container>




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
import ButtonGoBack from "../components/ButtonGoBack.vue";

    export default {
        components: {
            SideBar, NavBar, ButtonGoBack
        },
        data() {
            return {
                occurrenceStore: occurrenceStore(),
                title: '',
                location: '',
                locationDesc: '',
                image: '',
                desc: '',
                user: {},
                alert: false
            }
        },
        methods: {
            postOccurrence() {
                if(this.title != "" && this.image[0].name != undefined && this.location != "" && this.locationDesc != "" && this.desc != ""){
                  this.alert = false
                  this.occurrenceStore.addOccurrence(this.user.id, this.title, '/src/assets/images/'+this.image[0].name, this.location, this.locationDesc, this.desc)
                  this.$router.push('/home')  
                } else {
                  this.alert = true
                }
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
  @import '../assets/styles/postOccurrence.css';
  #inspire {
    scroll-behavior: smooth;
  }
</style>