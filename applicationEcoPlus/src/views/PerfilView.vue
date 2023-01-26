<template>
    <v-app id="inspire">
    <v-container class="noContainer">
      <v-row no-gutters>
        <!-- navbar -->
        <v-col cols="3">
          <v-sheet class="pa-2 ma-2">
            <NavBar />
          </v-sheet>
        </v-col>

        <v-col>
          <!-- perfil content -->
            <div class="perfilHeader bannerPerfil" :style="{'background-image': 'url(' + user.perfilBgImage + ')'}">
              <!-- pop up -->
              <!-- call by btn -->
              <v-dialog v-model="dialog">
              <template v-slot:activator="{ props }">
                <v-btn class="editProfile" v-if="this.user.id == this.currentUser.id" v-bind="props" flat="true"> Edit Profile </v-btn>
              </template>
              <!-- card -->
              <v-card class="bgPopUp">
                <v-card-text>
                  <!-- actual form -->
                <v-form @submit.prevent="saveSettings()" ref="form">
                  <v-container>
                    <v-row>
                      <!-- change image -->
                      <v-col cols="12" md="4" class="alignContentCenter">
                        <div>
                          <div class="changeImgPerfil" :style="{'background-image': 'url(' + this.user.perfilImage + ')'}">
                            <v-file-input v-model="this.perfilImage" prepend-icon="undefined" class="file"></v-file-input>
                          </div>
                        </div>
                        
                      </v-col>
                      <!-- banner -->
                      <v-col cols="12" md="8" class="alignContentCenter">
                        <div class="changeBannerPerfil" :style="{'background-image': 'url(' + this.changeUser.perfilBgImage + ')'}">
                          <v-file-input v-model="this.perfilBgImage" prepend-icon="undefined" class="file"></v-file-input>
                          </div>
                      </v-col>
                      <v-col cols="12" md="4">
                        <!-- district -->
                        <v-text-field 
                        bg-color="#CCEED6"
                        v-model="this.changeUser.district"
                        :placeholder="this.user.district"
                        label="District"
                        ></v-text-field>
                        <!-- city -->
                        <v-text-field 
                        bg-color="#CCEED6"
                        v-model="this.changeUser.city"
                        :placeholder="this.user.city"
                        label="City"
                        ></v-text-field>
                        <!-- postal code -->
                        <v-text-field 
                        bg-color="#CCEED6"
                        v-model="this.changeUser.postalcode"
                        :placeholder="this.user.postalcode"
                        label="Postal Code"
                        ></v-text-field>
                        <!-- school -->
                        <v-text-field 
                        bg-color="#CCEED6"
                        v-model="this.changeUser.school"
                        :placeholder="this.user.school"
                        label="School"
                        ></v-text-field>
                      </v-col>
                      <!-- change name -->
                      <v-col cols="12" md="8">
                        <v-row>
                          <v-col cols="12" md="6">
                            <v-text-field 
                            bg-color="#CCEED6"
                            label="Complete Name"
                            v-model="this.changeUser.name"
                            :placeholder="this.user.name"
                          ></v-text-field>
                          <!-- change passwword -->
                          <v-text-field
                          bg-color="#CCEED6"
                          v-model="this.password"
                          :placeholder="this.user.password"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.min, checkMatchingPasswords]"
                          :type="show1 ? 'text' : 'password'"
                          label="Password"
                          hint="At least 5 characters"
                          counter
                          @click:append="show1 = !show1"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <!-- change email -->
                          <v-text-field
                          bg-color="#CCEED6"
                          v-model="this.changeUser.email"
                          :placeholder="this.user.email"
                          label="Email"
                          :rules="rulesEmail"
                          ></v-text-field>
                          
                          <!-- confirm password -->
                          <v-text-field
                          bg-color="#CCEED6"
                          v-model="this.confirmPassword"
                          :placeholder="this.user.password"
                          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.min, checkMatchingPasswords]"
                          :type="show2 ? 'text' : 'password'"
                          label="Confirm Password"
                          hint="At least 5 characters"
                          counter
                          @click:append="show2 = !show2"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                        <!-- save btns -->
                        <v-row>
                          <v-col cols="12" md="6" class="containerbtnResetSaveL alignContentCenter">
                            <v-btn class="btnReset btnLeaf " variant="text" @click="resetSettings()">
                              Reset
                            </v-btn>
                          </v-col>
                          <v-col cols="12" md="6" class="containerbtnResetSaveR alignContentCenter">
                            <v-btn class="btnSave btnLeaf" variant="text" type="submit">
                              Save Changes
                            </v-btn>
                          </v-col>
                        </v-row> 
                      </v-col>

                    </v-row>
                  </v-container>
                </v-form>
                </v-card-text>
                </v-card>
              </v-dialog>
            </div>
            <div class="containUserInfo">
              <div class="perfilElements row">
                <img :src="user.perfilImage" class="imgPerfil">
                <div class="perfilTextElements">
                  <p class="perfilName">{{ user.name }}</p>
                  <p class="perfilDesc">{{ user.district }}, {{ user.city }}, Portugal</p>
                </div>
              </div>
            </div>
            <v-tabs v-model="tab" bg-color="#ACE4BD" class="filterPerfil">
              <v-tab class="filterBtnPerfil" value="all">All</v-tab>
              <v-tab class="filterBtnPerfil" value="events">Events</v-tab>
              <v-tab class="filterBtnPerfil" value="occurrences">Occorrences</v-tab>
            </v-tabs>
            <v-sheet class="pa-2 contentColumnPerfil" style="background-color: rgba(255, 250, 246, 1); 
              border-right: 1px solid rgba(111, 190, 135, 1);
              border-left: 1px solid rgba(111, 190, 135, 1);">
            <!-- content -->
            <v-window v-model="tab">
              <v-window-item value="all">
                <div v-for="post in feedAll()" class="content">
                  <div>
                    <div class="card">
                      <div class="image"  :style="`background: url(${post.image});`">
                        <div v-if="post.type == 'event'" class="topperIconsEvent">
                          <div class="infoCardContent">
                            <div class="postIconBackground">
                              <img class="postIcon" src="/src/assets/icons/calendar.svg">
                            </div>
                            <div class="infos">
                              <div class="title">
                                <span class="textMediumLarge">{{ post.title }}</span> &nbsp;
                              </div>
                              <div class="location">
                                <span class="textSmall txtLocation">{{ post.location }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      
                          <div v-else class="topperIconsOccurrence">
                            <div class="infoCardContent">
                              <div class="postIconBackground">
                                <img class="postIcon" src="/src/assets/icons/tool.svg">
                              </div>
                              <div class="infos">
                                <div class="title">
                                  <span class="textMediumLarge">{{ post.title }}</span> &nbsp;
                                </div>
                                <div class="location">
                                  <span class="textSmall txtLocation">{{ post.location }}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                    </div>
                    <div class="comments" v-for=",i in post.comments.length > 1 ? 2 : (post.comments.length == 1 ? 1 : 0)">
                      <p class="userName">@{{ userStore.getUserById(post.comments[i].userId).username }}: &nbsp;</p>
                      <p class="comment">{{ post.comments[i].message }}</p>
                    </div>
                    <div class="routerLink" v-if="post.type == 'event'">
                      <p class="viewMore textSmall">
                        <RouterLink :to="{ name: 'eventDetail', params: { eventid: post.id } }">- View More -</RouterLink>
                      </p>
                    </div>
                    <div class="routerLink" v-else>
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
              </v-window-item>
              <v-window-item value="events">
                <div v-for="post in feedEvents()" class="content">
                  <div>
                    <div class="card">
                      <div class="image"  :style="`background: url(${post.image});`">
                        <div v-if="post.type == 'event'" class="topperIconsEvent">
                          <div class="infoCardContent">
                            <div class="postIconBackground">
                              <img class="postIcon" src="/src/assets/icons/calendar.svg">
                            </div>
                            <div class="infos">
                              <div class="title">
                                <span class="textMediumLarge">{{ post.title }}</span> &nbsp;
                              </div>
                              <div class="location">
                                <span class="textSmall txtLocation">{{ post.location }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      
                          <div v-else class="topperIconsOccurrence">
                            <div class="infoCardContent">
                              <div class="postIconBackground">
                                <img class="postIcon" src="/src/assets/icons/tool.svg">
                              </div>
                              <div class="infos">
                                <div class="title">
                                  <span class="textMediumLarge">{{ post.title }}</span> &nbsp;
                                </div>
                                <div class="location">
                                  <span class="textSmall txtLocation">{{ post.location }}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                    </div>
                    <div class="comments" v-for=",i in post.comments.length > 1 ? 2 : (post.comments.length == 1 ? 1 : 0)">
                      <p class="userName">@{{ userStore.getUserById(post.comments[i].userId).username }}: &nbsp;</p>
                      <p class="comment">{{ post.comments[i].message }}</p>
                    </div>
                    <div class="routerLink" v-if="post.type == 'event'">
                      <p class="viewMore textSmall">
                        <RouterLink :to="{ name: 'eventDetail', params: { eventid: post.id } }">- View More -</RouterLink>
                      </p>
                    </div>
                    <div class="routerLink" v-else>
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
              </v-window-item>
              <v-window-item value="occurrences">
                <div v-for="post in feedOccurrences()" class="content">
                  <div>
                    <div class="card">
                      <div class="image"  :style="`background: url(${post.image});`">
                        <div v-if="post.type == 'event'" class="topperIconsEvent">
                          <div class="infoCardContent">
                            <div class="postIconBackground">
                              <img class="postIcon" src="/src/assets/icons/calendar.svg">
                            </div>
                            <div class="infos">
                              <div class="title">
                                <span class="textMediumLarge">{{ post.title }}</span> &nbsp;
                              </div>
                              <div class="location">
                                <span class="textSmall txtLocation">{{ post.location }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      
                          <div v-else class="topperIconsOccurrence">
                            <div class="infoCardContent">
                              <div class="postIconBackground">
                                <img class="postIcon" src="/src/assets/icons/tool.svg">
                              </div>
                              <div class="infos">
                                <div class="title">
                                  <span class="textMediumLarge">{{ post.title }}</span> &nbsp;
                                </div>
                                <div class="location">
                                  <span class="textSmall txtLocation">{{ post.location }}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                    </div>
                    <div class="comments" v-for=",i in post.comments.length > 1 ? 2 : (post.comments.length == 1 ? 1 : 0)">
                      <p class="userName">@{{ userStore.getUserById(post.comments[i].userId).username }}: &nbsp;</p>
                      <p class="comment">{{ post.comments[i].message }}</p>
                    </div>
                    <div class="routerLink" v-if="post.type == 'event'">
                      <p class="viewMore textSmall">
                        <RouterLink :to="{ name: 'eventDetail', params: { eventid: post.id } }">- View More -</RouterLink>
                      </p>
                    </div>
                    <div class="routerLink" v-else>
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
              </v-window-item>
            </v-window>
          </v-sheet>
        </v-col>

        <!-- sidebar -->
        <v-col cols="3">
          <v-sheet class="pa-2 ma-2">
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
import { occurrenceStore } from '../stores/occurrence'
import { eventStore } from '../stores/event'
    
export default {
    components: {
        SideBar, NavBar
    },
    data() {
        return {
            userStore: userStore(),
            occurrenceStore: occurrenceStore(),
            eventStore: eventStore(),
            user: {},
            currentUser: {},
            changeUser: {},
            password: '',
            confirmPassword: '',
            perfilImage: '',
            perfilBgImage: '',
            userFeed: [],
            tab: 'all',
            dialog: false,
            show1: false,
            show2: false,
            rules: {
              min: v => v.length >= 5 || 'Min 5 caracteres'
            },
            rulesEmail: [
              value => (value || '').length <= 100 || 'Max 100 characters',
              
              value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Invalid e-mail.'
              }]
        }
    },
    computed: {
      checkMatchingPasswords() {
        return () => (this.confirmPassword == this.password) || 'Passwords Must Match' 
      }
    },
    methods: {
      async saveSettings() {
        let isValid = await this.$refs['form'].validate()
        console.log(isValid)
        if(isValid.valid){
          this.changeUser.perfilBgImage = this.perfilBgImage
          this.changeUser.perfilImage = this.perfilImage
          this.user = this.changeUser
          this.changeUser.password = this.confirmPassword
          this.userStore.updateUser(this.changeUser)
          this.dialog = false
        }
      },
      resetSettings() {
        this.user = this.currentUser
        this.changeUser = this.currentUser
        this.dialog = false
      },
      feedAll() {
        /* create feed user all */
        this.userFeed = []
        let occurrenceArray = this.occurrenceStore.getOccurrences
        let eventArray = this.eventStore.getEvents
        for (let event of eventArray) {
          if(this.user.id == event.userId) this.userFeed.push(event)
        }
        for (let occurrence of occurrenceArray) {
          if(this.user.id == occurrence.userId) this.userFeed.push(occurrence)
        }
        this.userFeed.sort((a, b) => (b.dateHour.compare + b.dateHour.compare) - (a.dateHour.compare + a.dateHour.compare))
        return this.userFeed
      },
      feedEvents() {
        /* create feed user events */
        this.userFeed = []
        let eventArray = this.eventStore.getEvents
        for (let event of eventArray) {
          if(this.user.id == event.userId) this.userFeed.push(event)
        }
        this.userFeed.sort((a, b) => (b.dateHour.compare + b.dateHour.compare) - (a.dateHour.compare + a.dateHour.compare))
        return this.userFeed
      },
      feedOccurrences() {
        /* create feed user occurence */
        this.userFeed = []
        let occurrenceArray = this.occurrenceStore.getOccurrences
        for (let occurrence of occurrenceArray) {
          if(this.user.id == occurrence.userId) this.userFeed.push(occurrence)
        }
        this.userFeed.sort((a, b) => (b.dateHour.compare + b.dateHour.compare) - (a.dateHour.compare + a.dateHour.compare))
        return this.userFeed
      }
    },
    created() {
        if (!JSON.parse(localStorage.getItem('currentUser'))) {
          this.$router.push({ name: 'signin' })
        }
        this.userStore.getUsers.findIndex(user => {
            if(user.id == this.$route.params.perfilid) this.user = user
        })
        this.userStore.getUsers.findIndex(user => {
            if(user.id == this.$route.params.perfilid) this.user = user
        })
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
        this.changeUser = JSON.parse(localStorage.getItem('currentUser'))
        this.password = this.changeUser.password
        this.confirmPassword = this.changeUser.password
    }
}
</script>

<style lang="scss" scoped>
    @import '../assets/styles/perfil.css';
    @import '../assets/styles/home.css';
    @import '../assets/styles/base.css';
</style>