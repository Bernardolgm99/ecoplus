<template>
  <v-app id="inspire">
    <v-container class="noContainer">
      <v-row no-gutters>
        <!-- navbar -->
        <v-col cols="3">
          <v-sheet class="pa-2 ma-2">
            <NavBar :user="currentUser" />
          </v-sheet>
        </v-col>

        <v-col>
          <!-- perfil content -->
          <div class="perfilHeader bannerPerfil" :style="{ 'background-image': 'url(' + user.perfilBgImage + ')' }">
            <!-- pop up -->
            <!-- call by btn -->
            <v-dialog v-model="dialog">
              <template v-slot:activator="{ props }">
                <v-btn class="editProfile" v-if="this.user.id == this.currentUser.id" v-bind="props" flat="true"> Edit
                  Profile </v-btn>
              </template>
              <!-- card pop up -->
              <v-card class="bgPopUp">
                <v-card-text>
                  <!-- actual form -->
                  <v-form @submit.prevent="saveSettings()" ref="form">
                    <v-container>
                      <!-- change images -->
                      <v-row>
                        <!-- change icon -->
                        <v-col cols="12" md="4">
                          <div class="changeImgPerfil mx-auto my-1" :style="{ 'background-image': 'url(' + this.user.image + ')' }">
                            <v-file-input v-model="this.image" prepend-icon="undefined" class="file"></v-file-input>
                          </div>
                        </v-col>
                        <!-- change banner -->
                        <v-col cols="12" md="8" class="changeBannerPerfil mb-5" :style="{ 'background-image': 'url(' + this.changeUser.image + ')' }">
                            <v-file-input v-model="this.image" prepend-icon="undefined" class="file"></v-file-input>
                        </v-col>
                      </v-row>
                      <!-- inputs -->
                      <v-row> 
                        <!-- username, changepassword -->
                        <v-col cols="12" md="4">
                          <!-- username -->
                          <v-text-field bg-color="#CCEED6" label="Username" disabled v-model="this.changeUser.username"
                              :placeholder="this.user.username"></v-text-field>
                          <!-- change passwword -->
                          <v-text-field bg-color="#CCEED6" v-model="this.password" :placeholder="this.user.password"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.min, checkMatchingPasswords]" :type="show1 ? 'text' : 'password'"
                            label="Password" hint="At least 5 characters" counter
                            @click:append="show1 = !show1"></v-text-field>
                          <!-- confirm password -->
                          <v-text-field bg-color="#CCEED6" v-model="this.confirmPassword"
                            :placeholder="this.user.password" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.min, checkMatchingPasswords]" :type="show2 ? 'text' : 'password'"
                            label="Confirm Password" hint="At least 5 characters" counter
                            @click:append="show2 = !show2"></v-text-field>
                        </v-col>
                        <!-- change name -->
                        <v-col cols="12" md="8" class="pr-0">
                          <v-row>
                            <!-- email, name && district -->
                            <v-col cols="12" md="5" class="px-0">
                              <!-- change email -->
                              <v-text-field bg-color="#CCEED6" v-model="this.changeUser.email"
                                :placeholder="this.user.email" label="Email" :rules="rulesEmail"></v-text-field>
                              <!-- change name -->
                              <v-text-field bg-color="#CCEED6" label="Complete Name" v-model="this.changeUser.name"
                              :placeholder="this.user.name"></v-text-field>
                              <!-- district -->
                              <v-autocomplete
                              bg-color="#CCEED6"  
                              v-model="changeDistrict"
                              :items="districtsList"
                              label="District"
                              :placeholder="this.school.district"
                              ></v-autocomplete>
                            </v-col>
                            <!-- municipality, school and btns -->
                            <v-col cols="12" md="7">
                              <!-- municipality -->
                              <v-autocomplete
                              bg-color="#CCEED6"
                              v-model="changeMunicipality"
                              :items="municipalitiesList"
                              label="Municipality"
                              :placeholder="this.school.municipalities"
                              ></v-autocomplete>
                              <!-- school -->
                              <v-autocomplete
                                bg-color="#CCEED6"
                                v-model="changeSchool"
                                :items="schoolsList"
                                label="School"
                                :placeholder="this.school.school"
                              ></v-autocomplete>
                                <!-- reset btn -->
                                <div class="d-flex justify-end">
                                  <v-btn class="btnSave btnLeaf my-2" variant="text" type="submit">Save Changes</v-btn>
                                  <v-btn class="btnReset btnLeaf my-2" variant="text" @click="resetSettings()">Cancel</v-btn>
                                </div>
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
              <img :src="user.image" class="imgPerfil">
              <div class="perfilTextElements">
                <p class="perfilName">{{ user.username }}</p>
                <p class="perfilDesc">{{ school.school }}</p>
                <p class="perfilDesc">{{ school.municipality }}, {{ school.district }}, Portugal</p>
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
                  <div class="card">
                    <div class="image" :style="`background: url(${post.image});`">

                      <div v-if="post.IdCreator != undefined" class="topperIconsEvent">
                        <div class="infoCardContent">
                          <div class="postIconBackground">
                            <img class="postIcon" :src="'src/assets/icons/calendar.svg'">
                          </div>
                          <div class="infos">
                            <div class="title">
                              <span class="textMediumLarge">{{ post.name }}</span> &nbsp;
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
                            <img class="postIcon" :src="'src/assets/icons/tool.svg'">
                          </div>
                          <div class="infos">
                            <div class="title">
                              <span class="textMediumLarge">{{ post.name }}</span> &nbsp;
                              <span v-if="post.status == 0">Not Approved</span>
                              <span v-if="post.status == 1">To Do</span>
                              <span v-if="post.status == 2">Done</span>
                            </div>
                            <div class="location">
                              <span class="textSmall txtLocation">{{ post.location }}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </v-window-item>
              <v-window-item value="events">
                <div v-for="post in feedEvents()" class="content">
                  <div class="card">
                    <div class="image" :style="`background: url(${post.image});`">
                      <div v-if="post.IdCreator != undefined" class="topperIconsEvent">
                        <div class="infoCardContent">
                          <div class="postIconBackground">
                            <img class="postIcon" :src="'src/assets/icons/calendar.svg'">
                          </div>
                          <div class="infos">
                            <div class="title">
                              <span class="textMediumLarge">{{ post.name }}</span> &nbsp;
                            </div>
                            <div class="location">
                              <span class="textSmall txtLocation">{{ post.location }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </v-window-item>
              <v-window-item value="occurrences">
                <div v-for="post in feedOccurrences()" class="content">

                  <div class="card">
                    <div class="image" :style="`background: url(${post.image});`">
                      <div class="topperIconsOccurrence">
                        <div class="infoCardContent">
                          <div class="postIconBackground">
                            <img class="postIcon" :src="'src/assets/icons/tool.svg'">
                          </div>
                          <div class="infos">
                            <div class="title">
                              <span class="textMediumLarge">{{ post.name }}</span> &nbsp;
                              <span v-if="post.status == 0">Not Approved</span>
                              <span v-if="post.status == 1">To Do</span>
                              <span v-if="post.status == 2">Done</span>
                            </div>
                            <div class="location">
                              <span class="textSmall txtLocation">{{ post.location }}</span>
                            </div>
                          </div>
                        </div>
                      </div>

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
import { schoolStore } from '../stores/school'
import { cookie } from '../utilities/cookieFunctions'

export default {
  components: {
    SideBar, NavBar
  },
  data() {
    return {
      userStore: userStore(),
      occurrenceStore: occurrenceStore(),
      eventStore: eventStore(),
      schoolStore: schoolStore(),
      user: {},
      school: {},
      currentUser: {},
      /* changeUser: {}, */
      changeDistrict: '',
      changeMunicipality: '',
      changeSchool: '',
      districts: {},
      districtsList: [],
      municipalitiesList: [],
      schoolsList: [],
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
      if (isValid.valid) {
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
      return this.userStore.getUserEventsOccurrences
    },
    feedEvents() {
      /* create feed user events */
      return this.userStore.getUserEvents
    },
    feedOccurrences() {
      /* create feed user occurence */
      return this.userStore.getUserOccurrences
    }
  },
  async created() {
    if (!cookie.getCookie("token")) {
      this.$router.push({ name: 'signin' })
    }
    await this.userStore.fetchAllUsers();
    await this.userStore.fetchLoggedUser();
    await this.schoolStore.fetchAllSchools()
    this.currentUser = this.userStore.getUser;

    await this.userStore.fetchUserEventOccurrence(this.$route.params.perfilid)
    await this.userStore.fetchUserEvent(this.$route.params.perfilid)
    await this.userStore.fetchUserOccurrence(this.$route.params.perfilid)

    this.user = await this.userStore.fetchUserById(this.$route.params.perfilid)
    this.school = await this.schoolStore.fetchSchool(this.user.schoolId);

    this.changeDistrict=this.school.district
    this.changeMunicipality=this.school.municipality
    this.changeSchool=this.school.school
    
    this.schoolStore.getSchools.forEach(obj => {
      const districtName = obj.district;
      const municipalityName = obj.municipality;
      const schoolName = obj.school;
      // Check if the district exists in the main object
      if (!(districtName in this.districts)) {
        this.districts[districtName] = {}; // Create an empty object for the district
      }
      // Check if the municipality exists in the district
      if (!(municipalityName in this.districts[districtName])) {
        this.districts[districtName][municipalityName] = []; // Create an empty array for the municipality
      }
      // Add the school to the municipality's array
      if(!this.districtsList.find(element => element == districtName)) this.districtsList.push(districtName);
      if(!this.municipalitiesList.find(element => element == municipalityName))this.municipalitiesList.push(municipalityName);
      if(!this.schoolsList.find(element => element == schoolName)) this.schoolsList.push(schoolName);
      this.districts[districtName][municipalityName].push(schoolName);
  });
    /* for(let school of ) {
      if(!this.districts.find(element=> element == school.district)) this.districts.push(school.district)
      if(!this.districts.municipalities.find(element=> element == school.municipality)) this.districts.municipalities.push(school.municipality)
      this.schools.push(school.school)
    } */
    console.log(this.districts)
    console.log(this.districtsList)
    console.log(this.municipalitiesList)
    console.log(this.schoolsList)
    this.changeUser = this.userStore.getUser;
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/perfil.css';
@import '../assets/styles/home.css';
@import '../assets/styles/base.css';
</style>