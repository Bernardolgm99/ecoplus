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
                          <div class="changeImgPerfil mx-auto my-1"
                            :style="{ 'background-image': 'url(' + this.user.icon + ')' }">
                            <v-file-input v-model="this.icon" prepend-icon="undefined" class="file"></v-file-input>
                          </div>
                        </v-col>
                        <!-- change banner -->
                        <v-col cols="12" md="8" class="changeBannerPerfil mb-5"
                          :style="{ 'background-image': 'url(' + this.user.image + ')' }">
                          <v-file-input v-model="this.image" prepend-icon="undefined" class="file"></v-file-input>
                        </v-col>
                      </v-row>
                      <!-- inputs -->
                      <v-row>
                        <!-- username, changepassword -->
                        <v-col cols="12" md="4">
                          <!-- change name -->
                          <v-text-field bg-color="#CCEED6" label="  Name" v-model="this.user.name" readonly
                            :placeholder="this.changeUser.name"></v-text-field>
                          <!-- change email -->
                          <v-text-field bg-color="#CCEED6" v-model="this.user.email" :placeholder="this.changeUser.email"
                            label="Email" :rules="rules.email"></v-text-field>
                          <!-- change passwword -->
                          <v-text-field bg-color="#CCEED6" v-model="this.password"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="rules.password"
                            :type="show1 ? 'text' : 'password'" label="Password" counter
                            @click:append="show1 = !show1"></v-text-field>
                          <!-- confirm password -->
                          <v-text-field bg-color="#CCEED6" v-model="this.confirmPassword"
                            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :rules="rules.matchPasswords"
                            :type="show2 ? 'text' : 'password'" label="Confirm Password" counter
                            @click:append="show2 = !show2"></v-text-field>
                        </v-col>
                        <!-- change name -->
                        <v-col cols="12" md="8" class="pr-0">
                          <v-row>
                            <!-- email, name -->
                            <v-col cols="12" md="5" class="px-0">
                              <!-- username -->
                              <v-text-field bg-color="#CCEED6" label="Username" v-model="this.user.username"
                                :placeholder="this.user.username" :rules="username"></v-text-field>
                              <!-- Contact -->
                              <v-text-field bg-color="#CCEED6" v-model="this.user.contact" :rules="rules.contact"
                                label="Contact Info"></v-text-field>
                              <!-- change BirthDay -->
                              <v-text-field type="date" bg-color="#CCEED6" v-model="selectedDate"
                                label="Birthday"></v-text-field>
                              <!-- change gender -->
                              <v-autocomplete bg-color="#CCEED6" v-model="this.user.genreDesc"
                                :items="['Male', 'Female', 'Other']" label="Gender"
                                :placeholder="this.changeUser.genreDesc"></v-autocomplete>
                            </v-col>
                            <!-- municipality, school and btns -->
                            <v-col cols="12" md="7">
                              <!-- district -->
                              <v-autocomplete bg-color="#CCEED6" v-model="selectedDistrict"
                                :items="Object.keys(this.districts)" label="District"
                                :placeholder="this.school.district"></v-autocomplete>
                              <!-- municipality -->
                              <v-autocomplete bg-color="#CCEED6" v-model="selectedMunicipality"
                                :items="Object.keys(this.districts[selectedDistrict])" label="Municipality"
                                :placeholder="this.school.municipalities"></v-autocomplete>
                              <!-- school -->
                              <v-autocomplete bg-color="#CCEED6" v-model="selectedSchool"
                                :items="this.districts[selectedDistrict][selectedMunicipality]" label="School"
                                :placeholder="this.school.school"></v-autocomplete>
                              <!-- reset btn -->
                              <div class="d-flex justify-end">
                                <v-btn class="btnSave btnLeaf my-2" variant="text" type="submit">Save Changes</v-btn>
                                <v-btn class="btnReset btnLeaf my-2" variant="text"
                                  @click="resetSettings()">Cancel</v-btn>
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
                            <img class="postIcon" :src="'../src/assets/icons/calendar.svg'">
                          </div>
                          <div class="infos">
                            <div class="title">
                              <span class="textMediumLarge">{{ post.name }}</span> &nbsp;
                            </div>
                            <div class="location">
                              <span class="textSmall txtLocation text">{{ post.location }}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div v-else class="topperIconsOccurrence">
                        <div class="infoCardContent">
                          <div class="postIconBackground">
                            <img class="postIcon" :src="'../src/assets/icons/tool.svg'">
                          </div>
                          <div class="infos">
                            <div class="title">
                              <span class="textMediumLarge">{{ post.name }}</span> &nbsp;
                              <span v-if="post.status == 0">Not Approved</span>
                              <span v-if="post.status == 1">To Do</span>
                              <span v-if="post.status == 2">Done</span>
                            </div>
                            <div class="location">
                              <span class="textSmall txtLocation text">{{ post.location }}</span>
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
                            <img class="postIcon" :src="'../src/assets/icons/calendar.svg'">
                          </div>
                          <div class="infos">
                            <div class="title">
                              <span class="textMediumLarge">{{ post.name }}</span> &nbsp;
                            </div>
                            <div class="location">
                              <span class="textSmall txtLocation text">{{ post.location }}</span>
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
                            <img class="postIcon" :src="'../src/assets/icons/tool.svg'">
                          </div>
                          <div class="infos">
                            <div class="title">
                              <span class="textMediumLarge">{{ post.name }}</span> &nbsp;
                              <span v-if="post.status == 0">Not Approved</span>
                              <span v-if="post.status == 1">To Do</span>
                              <span v-if="post.status == 2">Done</span>
                            </div>
                            <div class="location">
                              <span class="textSmall text txtLocation">{{ post.location }}</span>
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
      districts: {},
      selectedDistrict: '',
      selectedMunicipality: '',
      selectedSchool: '',
      password: '',
      confirmPassword: '',
      perfilImage: '',
      perfilBgImage: '',
      userFeed: [],
      tab: 'all',
      dialog: false,
      show1: false,
      show2: false,
      selectedDate: '',
      rules: {
        password: [
          (v) => !v || (!!v && v.length >= 5) || 'Password must be at least 5 characters',
          (v) => !v || (!!v && /\d/.test(v)) || 'Password must contain at least 1 number',
          (v) => !v || (!!v && /[a-zA-Z]/.test(v)) || 'Password must contain at least 1 letter',
          (v) => !v || (!!v && /^[a-zA-Z0-9]+$/.test(v)) || 'Password can only contain letters and numbers',
          (v) => v && !/\s/.test(v) || 'Password cannot contain spaces',
        ],
        matchPasswords: [
          (v) => !this.password || (!!v && v.length > 0) || 'Confirm password is required',
          (v) => !v || v === this.password || 'Passwords do not match'
        ],
        email: [
          (v) => v && !/\s/.test(v) || 'Password cannot contain spaces',
          (v) => (v || '').length <= 100 || 'Max 100 characters',
          (v) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(v) || 'Invalid e-mail.'
          }],
        contact: [
          (v) => v && !/\s/.test(v) || 'Password cannot contain spaces',
          (v) => !v || (!!v && /^\d{9}$/.test(v)) || 'Input must be 9 digits',
        ],
        username: [
          (v) => v && !/\s/.test(v) || 'Password cannot contain spaces',
        ]
      }
    }
  },
  methods: {
    async saveSettings() {
      let isValid = await this.$refs['form'].validate()
      if (isValid.valid) {
        let updateUser = {}
        /* check if values are different */
        if (this.changeUser.username != this.user.username) updateUser['username'] = this.user.username   //working
        if (this.changeUser.email != this.user.email) updateUser['email'] = this.user.email               //working
        if (this.password != '') updateUser['password'] = this.password                                   //working
        if (this.selectedSchool != this.school.school) {                                                  //working
          let schoolId = this.schoolStore.getSchoolByName(this.selectedSchool)
          updateUser['schoolId'] = schoolId
        }
        if (this.changeUser.contact != this.user.contact) updateUser['contact'] = this.user.contact       //working
        if (this.changeUser.genreDesc != this.user.genreDesc) {                                           //working
          if (this.user.genreDesc == 'Female') updateUser['genreDesc'] = "F"
          else if (this.user.genreDesc == 'Male') updateUser['genreDesc'] = "M"
          else updateUser['genreDesc'] = "OTHER"
        }
        if (this.changeUser.birthDate != this.user.birthDate) updateUser['birthDate'] = this.selectedDate //
        if (this.changeUser.image != this.user.image) updateUser['image'] = this.user.image               //work in progress
        if (this.changeUser.icon != this.user.icon) updateUser['icon'] = this.user.icon                   //work in progress
        /* update */
        if (Object.keys(updateUser).length != 0) {
          await this.userStore.updateUser(updateUser, this.user.id)
        }

        await this.userStore.fetchAllUsers();
        this.user = this.userStore.getUser
        if (this.user.genreDesc == 'M') this.user.genreDesc = 'Male'
        else if(this.user.genreDesc == 'F') this.user.genreDesc = 'Female'
        else this.user.genreDesc = 'Other'
        /* close dialog box */
        this.dialog = false
      }
    },
    resetSettings() {
      this.selectedDistrict = this.school.district
      this.selectedMunicipality = this.school.municipality
      this.selectedSchool = this.school.school
      this.password = ''
      this.confirmPassword = ''
      this.selectedDate = this.user.birthDate.substr(0, 10)
      this.user = this.userStore.getUser
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

    this.changeDistrict = this.school.district
    this.changeMunicipality = this.school.municipality
    this.changeSchool = this.school.school

    this.schoolStore.getSchools.forEach(obj => {
      if (!(obj.district in this.districts)) this.districts[obj.district] = {};
      if (!(obj.municipality in this.districts[obj.district])) this.districts[obj.district][obj.municipality] = []; // Create an empty array for the municipality
      this.districts[obj.district][obj.municipality].push(obj.school);
    });
    this.selectedDistrict = this.school.district
    this.selectedMunicipality = this.school.municipality
    this.selectedSchool = this.school.school
    this.selectedDate = this.user.birthDate.substr(0, 10)

    if (this.user.genreDesc == 'M') this.user.genreDesc = 'Male'
    else if (this.user.genreDesc == 'F') this.user.genreDesc = 'Female'
    else this.user.genreDesc = 'Other'

    if (this.user.id == this.$route.params.perfilid) this.changeUser = this.userStore.getUser;

    if (this.currentUser.genreDesc == 'M') this.currentUser.genreDesc = 'Male'
    else if (this.currentUser.genreDesc == 'F') this.currentUser.genreDesc = 'Female'
    else this.currentUser.genreDesc = 'Other'
  },
  watch: {
    selectedDistrict: {
      handler(newValue) {
        if (newValue != this.school.district) this.selectedMunicipality = '', this.selectedSchool = '';
      }
    },
    selectedMunicipality: {
      handler(newValue) {
        if (newValue != this.school.municipality && this.selectedMunicipality != '') {
          if (this.districts[this.selectedDistrict][this.selectedMunicipality].length == 1) this.selectedSchool = this.districts[this.selectedDistrict][this.selectedMunicipality][0]
          else this.selectedSchool = '';
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/perfil.css';
@import '../assets/styles/home.css';
@import '../assets/styles/base.css';
</style>