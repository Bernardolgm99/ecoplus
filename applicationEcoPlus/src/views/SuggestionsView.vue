<template>
  {{ createFeed }}
  <v-app id="inspire">
    <v-container class="noContainer height100">
      <v-row no-gutters class="height100">
        <v-col cols="3">
          <v-sheet class="pa-2 ma-2">
            <!-- navbar -->
            <NavBar :user="user" />
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet class="pa-2 border-page" style="background-color: rgba(255, 250, 246, 1); 
                                        border-right: 1px solid rgba(111, 190, 135, 1);
                                        border-left: 1px solid rgba(111, 190, 135, 1)">
            <!-- content -->
            <v-container>
              <div id="suggestionContent">
                <div id="title">
                  <div class="textTitle">
                    <ButtonGoBack />
                    <span>Suggestion</span>
                  </div>
                </div>
                <div class="my-6" id="description">
                  Firstly, select the type of suggestion you want to make,
                  in the dropbox below and then write your suggestion.
                </div>
                <div id="selectBox">
                  <v-select v-model="suggestionType" label="Choose a recommendation type..."
                    :items="['Event Recomendation', 'Occurrence Recomendation', 'Activity Recomendation']" variant="solo">
                  </v-select>
                </div>
                <div id="textArea">
                  <v-textarea label="Write here your suggestion..." v-model="txtSuggestion" variant="solo"></v-textarea>
                </div>
                <div id="buttons">
                  <div id="btnOrganizer">
                    <div id="btnBack">
                      <v-btn class="btn" id="backBtn" @click="this.$router.push('/home')">
                        Back
                      </v-btn>
                    </div>
                    <div id="btnCommit">
                      <v-btn class="btn" id="sendBtn" @click="sendSuggestion">
                        Send
                      </v-btn>
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
            <SideBar />
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

import SideBar from '../components/SideBar.vue'
import NavBar from '../components/NavBar.vue'
import { userStore } from '../stores/user'
import { suggestionStore } from '../stores/suggestion'
import ButtonGoBack from "../components/ButtonGoBack.vue";

export default {
  components: {
    SideBar, NavBar, ButtonGoBack
  },
  data() {
    return {
      userStore: userStore(),
      suggestionStore: suggestionStore(),
      suggestionType: '',
      txtSuggestion: '',
      user: {},
      suggestions: []
    }
  },

  async created() {
    await this.userStore.fetchLoggedUser();
    this.user = this.userStore.getUser;
  },

  methods: {
    sendSuggestion() {
      let sended = this.suggestionStore.addSuggestion({ type: this.suggestionType, description: this.txtSuggestion });
      if(sended) {
        this.$router.push('/home')
      } else {
        alert("something went wrong, please try again later!")
      }
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