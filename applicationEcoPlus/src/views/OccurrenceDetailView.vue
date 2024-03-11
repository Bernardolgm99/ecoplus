<template>
  <v-app>
    <v-container class="noContainer height100">
      <v-row no-gutters class="height100">
        <v-col cols="3">
          <v-sheet class="pa-2 ma-2">
            <!-- navbar -->
            <NavBar :user="user" />
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 border-page">
            <!-- content -->
            <v-container class="d-flex flex-column contentColumn" @scroll="scrollEnd">
              <div class="d-flex flex-column mb-6">
                <div class="d-flex">
                  <ButtonGoBack />
                  <h1 class="text-h2">{{ occurrence.name }}</h1>
                </div>
                <h4 class="align-self-end mt-2">{{ occurrence.location }}</h4>
              </div>
              <div class="d-flex mb-6">
                <h2>Description of the location:</h2>
                <p class="ml-2 pt-1">{{ occurrence.locationDescription }}</p>
              </div>
              <p>" {{ occurrence.description }} "</p>
              <v-container class="d-flex flex-column align-end mt-6">
                <p style="font-size: 10px">Submited by
                <div style="color: black;" @click="sendUserPage()">{{ user.username }}
                </div>
                </p>
                <p>
                  Posted {{ date.toLocaleDateString('en-GB') }} at {{ date.toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit'
                  }) }}
                </p>
                <img :src="`data:image/webp;jpg;png;jpeg;base64,${occurrence.image}`" class="mt-6 align-self-center img-occurrence">
              </v-container>
              <h2 class="my-6" style="text-decoration: underline; text-decoration-thickness: 2px">Comments:</h2>
              <Comments :id="path.id" :type="path.type" :user="user" />
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
import ButtonGoBack from '../components/ButtonGoBack.vue'
import Comments from '../components/Comments.vue'
import { occurrenceStore } from "../stores/occurrence";
import { userStore } from "../stores/user"

export default {
  components: {
    SideBar,
    NavBar,
    ButtonGoBack,
    Comments,
  },
  data() {
    return {
      userStore: userStore(),
      occurrenceStore: occurrenceStore(),
      occurrence: {},
      user: {},
      comments: [],
      newComment: "",
      date: new Date(),
      hour: ''
    }
  },
  async created() {
    this.path = {
      id: this.$router.currentRoute._value.params.occurrenceid,
      type: this.$router.currentRoute._value.fullPath.split('/')[1]
    }
    await this.occurrenceStore.fetchOccurrenceId(this.path.id);
    this.occurrence = await this.occurrenceStore.getOccurrence;
    await this.userStore.fetchLoggedUser();
    this.user = await this.userStore.getUser;
    this.date = await new Date(this.occurrence.createdAt)
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/base.css';
@import '../assets/styles/details.css';
</style>