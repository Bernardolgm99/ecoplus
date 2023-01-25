<template>
  {{createFeed}}
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
          <v-sheet class="pa-2 ma-2" style="background-color: rgba(255, 250, 246, 1); 
                                        border-right: 1px solid rgba(111, 190, 135, 1);
                                        border-left: 1px solid rgba(111, 190, 135, 1)">
            <!-- content -->
    
            <div id="suggestionContent">
                <div id="title">
                    <div class="textTitle">
                        <ButtonGoBack />
                        <span>Suggestion</span>
                    </div>
                </div>
                <div id="description">
                    Firstly, select the type of suggestion you want to make, 
                    in the dropbox below and then write your suggestion.
                </div>
                <div id="selectBox">
                    <v-select v-model="suggestionType"
                    label="Choose a recommendation type..."
                    :items="['Event Recomendation', 'Occurrence Recomendation', 'Activity Recomendation']"
                    variant="solo">
                    </v-select>
                </div>
                <div id="textArea">
                    <v-textarea label="Write here your suggestion..." v-model="txtSuggestion" variant="solo"></v-textarea>
                </div>
                <div id="buttons">
                  <div id="btnOrganizer">
                    <div id="btnBack">
                        <v-btn variant="tonal">
                            Back
                        </v-btn>
                    </div>
                    <div id="btnCommit">
                        <v-btn variant="tonal" @click="sendSuggestion">
                            Send
                        </v-btn>
                    </div>
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
import { suggestionStore } from '../stores/suggestion'
import ButtonGoBack from "../components/ButtonGoBack.vue";

    export default {
        components: {
            SideBar, NavBar, ButtonGoBack
        },
        data() {
            return {
                suggestionStore: suggestionStore(),
                suggestionType: '',
                txtSuggestion: '',
                user: {}
            }
        },
        methods: {
            sendSuggestion() {
                this.suggestionStore.addSuggestion(this.suggestionType, this.user.id, this.txtSuggestion)
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
  @import '../assets/styles/suggestion.css';

  #inspire {
    scroll-behavior: smooth;
  }
</style>