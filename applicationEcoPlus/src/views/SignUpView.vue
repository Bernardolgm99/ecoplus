<template>
    <v-app>
        <v-container class="d-flex justify-center align-center">
            <div>
                <img lass="img-sign" src="/src/assets/images/image02.png" />
            </div>
            <div class="w-25">
                <h1>Sign Up</h1>
                <h3>Create your account on ecoPlus here!!! :)</h3>
                <div>
                    <div class="d-flex">
                        <v-text-field class="mr-2" clearable label="Name" placeholder="Enter your name"
                            bg-color="lime-lighten-2" v-model="name"></v-text-field>
                        <v-text-field class="ml-2" clearable label="Username" placeholder="Enter your username"
                            bg-color="lime-lighten-2" prepend-inner-icon="mdi-account"
                            v-model="username"></v-text-field>
                    </div>
                    <v-text-field clearable label="Email" placeholder="Enter your email" bg-color="lime-lighten-2"
                        v-model="email" prepend-inner-icon="mdi-email"></v-text-field>
                    <div class="d-flex">
                        <v-text-field class="mr-2" prepend-inner-icon="mdi-calendar-account" label="Birthday"
                            placeholder="dd/mm/yyyy" bg-color="lime-lighten-2" v-model="birthday"></v-text-field>
                        <v-select class="ml-2" prepend-inner-icon="mdi-gender-male-female" id="gender" name="gender"
                            v-model="gender" :items="['male', 'famale', 'other']" bg-color="lime-lighten-2"
                            label="Gender"></v-select>
                    </div>
                    <div class="d-flex">
                        <v-autocomplete class="mr-2" name="city" id="city" :items="this.allCities"
                            bg-color="lime-lighten-2" label="City" v-model="city">
                        </v-autocomplete>
                        <v-autocomplete class="ml-2" name="district" id="district" :items="this.allDistricts" 
                            bg-color="lime-lighten-2" label="District" v-model="district">
                        </v-autocomplete>
                    </div>
                    <div class="d-flex">
                        <v-text-field class="mr-2" clearable label="Postal Code" bg-color="lime-lighten-2"
                            placeholder="Write your postal code here" v-model="postalcode"></v-text-field>
                        <v-autocomplete class="ml-2" clearable label="School" bg-color="lime-lighten-2" 
                            :items="this.allSchools" v-model="school">
                        </v-autocomplete>
                    </div>
                    <div class="d-flex">
                        <v-text-field class="mr-2" :readonly="loading" :rules="[required]" clearable label="Password"
                            bg-color="lime-lighten-2" type="password" placeholder="Write your password here"
                            v-model="pw"></v-text-field>
                        <v-text-field class="ml-2" :readonly="loading" :rules="[required]" clearable label="Confirm Password"
                            bg-color="lime-lighten-2" type="password" placeholder="Write again you password here"
                            v-model="checkPw"></v-text-field>
                    </div>
                </div>
                <div>
                    <v-alert prominent type="error" variant="outlined" style="margin-bottom: 20px;" v-if="alert"
                        id="alert">
                        <strong>All parameters are required!</strong>
                    </v-alert>
                    <v-alert prominent type="error" variant="outlined" style="margin-bottom: 20px;" v-if="alertPw"
                        id="alert">
                        <strong>Passwords doesn't match!</strong>
                    </v-alert>
                    <v-alert prominent type="error" variant="outlined" style="margin-bottom: 20px;" v-if="alertEmail"
                        id="alert">
                        <strong>Email already exists!</strong>
                    </v-alert>
                    <v-alert prominent type="error" variant="outlined" style="margin-bottom: 20px;" v-if="alertUsername"
                        id="alert">
                        <strong>Username already exists!</strong>
                    </v-alert>
                    <v-alert density="comfortable" type="success" style="margin-bottom: 20px;" variant="tonal"
                        v-if="sucess">
                        <strong>Welcome Back!</strong>
                    </v-alert>
                    <div class="d-flex justify-space-between align-center">
                        <a href='signin'>I already have an account!</a>
                        <v-btn rounded="pill" color="lime-lighten-2" flat="true" size="large"
                            style="text-transform: none;" @click="createAccount">Register</v-btn>
                    </div>
                </div>
            </div>
        </v-container>
    </v-app>
</template>

<script>

import { userStore } from '../stores/user'
import { schoolStore } from '../stores/school'

export default{
    name: 'signup',
    props: ['inputEmailLP'],
    data() {
        return {
            userStore: userStore(),
            schoolStore: schoolStore(),
            name: '',
            username: '',
            email: '',
            birthday: '',
            gender: '',
            city: '',
            district: '',
            postalcode: '',
            school: '',
            pw: '',
            checkPw: '',
            allDistricts: [],
            allCities: [],
            allSchools: [],
            schoolData: '',
            emailExist: false,
            currentUser: '',
            alert: false,
            alertPw: false,
            alertEmail: false,
            alertUsername: false,
            sucess: false
        }
    },
    methods: {
        async createAccount() {
            if (this.birthday.split('/').length == 3 && this.birthday.split('/')[0] < 32 && this.birthday.split('/')[1] < 13)
                this.birthday.split('/').reverse().join('-');
            else {
                this.alert = true;
                return;
            }

            if (this.name != '' && this.username != '' && this.email != '' && this.birthday != '' && this.gender != '' && this.city != '' && this.district != '' && this.postalcode != '' && this.school != '' && this.pw != '' && this.checkPw) {
                if (this.userStore.getExistingAccount(this.username, this.email)) {
                    if (this.pw == this.checkPw) {

                        this.alertPw = false
                        this.alertEmail = false
                        this.alertUsername = false
                        this.alert = false
                        this.sucess = true

                        // this.userStore.addUser(this.username, this.name, this.email, this.birthday, this.gender, this.city, this.district, this.postalcode, this.school, this.pw)

                        if(this.gender == 'male') this.gender = 'M'
                        if(this.gender == 'female') this.gender = 'F'
                        if(this.gender == 'other') this.gender = 'OTHER'

                        await this.userStore.createUser(this.name, this.username, this.email, this.pw, this.school, 
                                                            await this.schoolStore.getSchoolByName(this.school), this.birthday)

                        // this.currentUser = this.userStore.getUserId(this.username)

                        localStorage.setItem('currentUser', JSON.stringify(this.userStore.getUserById(this.currentUser)))

                        this.$router.push({ name: 'signin' })

                    } else {
                        this.alertEmail = false
                        this.alertUsername = false
                        this.alert = false
                        this.alertPw = true
                    }

                } else {

                    this.emailExist = this.userStore.getEmailExistence(this.email)

                    if (this.emailExist) {
                        this.alertPw = false
                        this.alertUsername = false
                        this.alert = false
                        this.alertEmail = true
                    }
                    if (!this.emailExist) {
                        this.alertPw = false
                        this.alertEmail = false
                        this.alert = false
                        this.alertUsername = true
                    }
                }
            } else {
                this.alertPw = false
                this.alertEmail = false
                this.alertUsername = false
                this.alert = true
            }
        },
    },
    async created() {

        this.schoolData = await this.schoolStore.fetchAllSchools()

        this.schoolData.forEach(data => {
            if(!this.allDistricts.find(district => district == data.district)){
                this.allDistricts.push(data.district)
            }
            if(!this.allCities.find(municipality => municipality == data.municipality)){
                this.allCities.push(data.municipality)
            }
            if(!this.allSchools.find(school => school == data.school)){
                this.allSchools.push(data.school)
            }
        })

        if (JSON.parse(localStorage.getItem('currentUser'))) {
            this.$router.push({ name: 'home' })
        }

        this.email = this.$route.query.inputEmailLP
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/sign.css';
</style>