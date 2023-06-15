<template>
  <v-app id="inspire">
    <v-container class="noContainer height100">
      <v-row no-gutters class="height100">
        <v-col cols="3">
          <v-sheet class="pa-2 ma-2">
            <!-- navbar -->
            <NavBar :user="user"/>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 border-page" style="background-color: rgba(255, 250, 246, 1);">
            <!-- content -->
            <v-container class="d-flex flex-column align-center contentColumn" @scroll="scrollEnd">
              <div v-for="post in feed" class="content">

                <div v-if="post.status == 1">
                <div class="card">
                  <div class="image" :style="`background-image: url(data:image/webp;jpg;png;jpeg;base64,${post.image})`">
                    <div class="topperIconsOccurrence">
                      <div class="infoCardContent">
                        <div class="postIconBackground">
                          <img class="postIcon" :src="'src/assets/icons/tool.svg'">
                        </div>
                        <div class="infos">
                          <div class="title">
                            <span class="textMediumLarge">{{ post.name }}</span> &nbsp;
                          </div>
                          <div class="location">
                            <span class="textSmall text txtLocation">{{ post.location }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- change comments -->
                <div class="comments" v-for=",i in post.comments.length > 1 ? 2 : (post.comments.length == 1 ? 1 : 0)">
                  <p class="userName">@{{ userStore.getUserById(post.comments[i].userId).username }}: &nbsp;</p>
                  <p class="comment">{{ post.comments[i].description }}</p>
                </div>
                <div class="routerLink">
                  <p class="viewMore textSmall">
                    <RouterLink :to="{ name: 'occurrenceDetail', params: { occurrenceid: post.id } }">- View More -
                    </RouterLink>
                  </p>
                </div>
                <div>
                  <hr class="line">
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
import { occurrenceStore } from '../stores/occurrence'
import { userStore } from '../stores/user'
import { cookie } from '../utilities/cookieFunctions'

export default {

  components: {
    SideBar, NavBar
  },
  data() {
    return {
      userStore: userStore(),
      occurrenceStore: occurrenceStore(),
      feed: [],
      user: {},
      canPaginate: true,
    }
  },
  async created() {
    if (!cookie.getCookie("token")) {
      this.$router.push({ name: 'signin' })
    }
    await this.userStore.fetchLoggedUser();
    this.user = this.userStore.getUser;
    if (this.occurrenceStore.getOccurrences.length == 0)
      await this.occurrenceStore.fetchOccurrences()
    let occurrenceArray = this.occurrenceStore.getOccurrences
      for (let occurrence of occurrenceArray) {
        this.feed.push(occurrence)
      }
  },

  methods: {
    async scrollEnd(e) {
      if (e.target.offsetHeight + e.target.scrollTop + 1 >= e.target.scrollHeight && this.canPaginate) {
        this.canPaginate = false;
        await this.occurrenceStore.fetchOccurrences();
        this.feed = await this.occurrenceStore.getOccurrences;
        this.canPaginate = true;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/base.css';
@import '../assets/styles/home.css';

#inspire {
  scroll-behavior: smooth;
}
</style>