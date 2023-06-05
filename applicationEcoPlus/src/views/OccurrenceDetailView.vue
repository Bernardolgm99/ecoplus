<template>
  <v-app>
    <v-container class="noContainer height100">
      <v-row no-gutters class="height100">
        <v-col cols="3">
          <v-sheet class="pa-2 ma-2">
            <!-- navbar -->
            <NavBar />
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 border-page">
            <!-- content -->
            <v-container>
              <div class="d-flex flex-column mb-6">
                <div class="d-flex">
                  <ButtonGoBack />
                  <h1 class="text-h2">{{ occurrence.title }}</h1>
                </div>
                <h4 class="align-self-end mt-2">{{ occurrence.location }}</h4>
              </div>
              <div class="d-flex mb-6">
                <h2>Description of the location:</h2>
                <p class="ml-2 pt-1">{{ occurrence.locationDescription }}</p>
              </div>
              <p>" {{ occurrence.description }} "</p>
              <v-container class="d-flex flex-column align-end mt-6">
                <p style="font-size: 10px">Submited by <div style="color: black;"
                    @click="sendUserPage()">{{ user.username }}
                </div>
                </p>
                <p>
                  {{ turnDateHour }}
                  Posted {{ this.date[2] }}/{{ this.date[1] }}/{{ this.date[0] }} at {{ this.date[3] }}
                </p>
                <img :src=occurrence.image class="mt-6 align-self-center img-occurrence">
              </v-container>
              <h2 class="my-6" style="text-decoration: underline; text-decoration-thickness: 2px">Comments:</h2>
              <div value="comments">
                <v-textarea label="Comment" rows="1" auto-grow bg-color="grey-lighten-2" color="green"
                  v-model="newComment"></v-textarea>
                <v-btn color="green" @click="addComment">Send</v-btn>
                <div class="d-flex" v-for="comment in comments">
                  <div class="d-flex flex-column align-center">
                    <v-btn variant="text" icon="mdi-arrow-up-bold" size="x-large"
                      :color="comment.likesDislikes.likes.indexOf(this.user.id) != -1 ? 'green' : 'gray'"
                      @click="like(comment)">
                    </v-btn>
                    <span> {{
                      comment.likesDislikes.likes.length -
                        comment.likesDislikes.dislikes.length
                    }} </span>
                    <v-btn variant="text" icon="mdi-arrow-down-bold" size="x-large"
                      :color="comment.likesDislikes.dislikes.indexOf(this.user.id) != -1 ? 'red' : 'gray'"
                      @click="dislike(comment)">
                    </v-btn>
                  </div>
                  <div class="d-flex flex-column justify-center">
                    <RouterLink style="color: black;"
                      :to="{ name: 'perfil', params: { perfilid: userStore.getUserById(comment.userId).id } }">
                      <h2>
                        {{ userStore.getUserById(comment.userId).username }}
                      </h2>
                    </RouterLink>
                    <p>
                      {{ comment.message }}
                    </p>
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
import ButtonGoBack from '../components/ButtonGoBack.vue'
import { occurrenceStore } from "../stores/occurrence";
import { userStore } from "../stores/user"
import { cookie } from '../utilities/cookieFunctions'

export default {
  components: {
    SideBar, NavBar, ButtonGoBack
  },
  data() {
    return {
      userStore: userStore(),
      occurrenceStore: occurrenceStore(),
      occurrence: {},
      user: {},
      comments: [],
      newComment: "",
      date: '',
      hour: ''
    }
  },
  async created() {
    if (!cookie.getCookie("token")) {
      this.$router.push({ name: 'signin' })
    }
    await this.occurrenceStore.fetchOccurrences(cookie.getCookie("token"))
    await this.userStore.fetchAllUsers()
    this.occurrence = this.occurrenceStore.getOccurrenceById(this.$route.params.occurrenceid)
    this.user = this.userStore.getUserById(this.occurrence.userId)
    this.comments = this.occurrence.comments
    console.log(this.comments);
    console.log(this.user)
  },
  computed: {
    turnDateHour() {
      let fullDate = this.occurrence.updatedAt
      this.date = [fullDate.substring(0,4), fullDate.substring(5,7), fullDate.substring(8,10), fullDate.substring(11,16)]
    }
  },
  methods: {
    like(comment) {
      if (!(comment.likesDislikes.likes.indexOf(this.user.id) != -1)) {
        comment.likesDislikes.likes.push(this.user.id);
        if ((comment.likesDislikes.dislikes.indexOf(this.user.id) != -1)) {
          comment.likesDislikes.dislikes.splice(comment.likesDislikes.dislikes.indexOf(this.user.id), 1)
        }
      } else {
        comment.likesDislikes.likes.splice(comment.likesDislikes.likes.indexOf(this.user.id), 1)
      }
      const index = this.comments.findIndex(commentIndex => commentIndex.messageId == comment.messageId)
      this.comments[index] = comment
      this.update()
    },

    dislike(comment) {
      if (!(comment.likesDislikes.dislikes.indexOf(this.user.id) != -1)) {
        comment.likesDislikes.dislikes.push(this.user.id);
        if ((comment.likesDislikes.likes.indexOf(this.user.id) != -1)) {
          comment.likesDislikes.likes.splice(comment.likesDislikes.likes.indexOf(this.user.id), 1)
        }
      } else {
        comment.likesDislikes.dislikes.splice(comment.likesDislikes.dislikes.indexOf(this.user.id), 1)
      }
      const index = this.comments.findIndex(commentIndex => commentIndex.messageId == comment.messageId)
      this.comments[index] = comment
      this.update()
    },

    addComment() {
      if (this.comments.length > 0) {
        this.comments.splice(0, 0, {
          messageId: this.comments[0].messageId + 1,
          userId: this.user.id,
          message: this.newComment,
          likesDislikes: { likes: [], dislikes: [] },
        });
      }
      else {
        this.comments.push({
          messageId: 0,
          userId: this.user.id,
          message: this.newComment,
          likesDislikes: { likes: [], dislikes: [] },
        });
      }
      this.newComment = "";
      this.update();
    },

    update() {
      this.occurrence.comments = this.comments;
      this.occurrenceStore.updateOccurrences();
    },
    sendUserPage(){
      this.$router.push({ name: 'perfil', params: { perfilid: this.userStore.getUserId(this.user.username) } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/base.css';
@import '../assets/styles/details.css';
</style>