<template>
    <v-app>
        <v-container class="d-flex align-center">
            <div>
                <img class="img-sign" src="/src/assets/images/image01.png" />
            </div>
            <div>
                <h1>Log In</h1>
                <h3>Start a session to access your activities and make the world better!!! </h3>
                <br>
                <v-text-field prepend-inner-icon="mdi-account" clearable label="Username"
                    placeholder="Enter your username" v-model="username" bg-color="lime-lighten-2"></v-text-field>
                <v-text-field prepend-inner-icon="mdi-lock" v-model="password" :readonly="loading" :rules="[required]"
                    clearable label="Password" placeholder="Enter your password" bg-color="lime-lighten-2"
                    type="password"></v-text-field>
                
                <v-alert prominent type="error" variant="outlined" style="margin-bottom: 20px;" v-if="alert" id="alert">
                    <strong>All parameters are required!</strong>
                </v-alert>
                <v-alert prominent type="error" variant="outlined" style="margin-bottom: 20px;" v-if="alertLogIn"
                    id="alert">
                    <strong>Wrong email or password!</strong>
                </v-alert>

                <v-alert density="comfortable" type="success" style="margin-bottom: 20px;" variant="tonal"
                    v-if="sucess">
                    <strong>Welcome Back!</strong>
                </v-alert>
                
                <div class="d-flex justify-space-between align-center">
                    <a href="/signup">Create an Account</a>
                    <v-btn rounded="pill" color="lime-lighten-2" flat="true" size="large" style="text-transform: none;"
                        @click="checkLogIn">Log In</v-btn>
                </div>
            </div>
        </v-container>
    </v-app>
</template>

<script>

import { userStore } from '../stores/user'

export default {
    data() {
        return {
            userStore: userStore(),
            username: '',
            password: '',
            userId: '',
            alert: false,
            alertLogIn: false,
            sucess: false,
        }
    },
    methods: {
        async checkLogIn() {
            if (this.username != '' && this.password != '') {
                const user = this.userStore.logIn(this.username, this.password) /* this.userStore.getUserChecked(this.username, this.password) */ 
                console.log(user)
                if (user) {
                    this.alert = false
                    this.alertLogIn = false
                    this.sucess = true
                    
                    /* this.userId = this.userStore.getUserId(this.username) */
                    
                    /* localStorage.setItem('currentUser', JSON.stringify(this.userStore.getUserById(this.userId)))
                    if (JSON.parse(localStorage.getItem('currentUser')).title == "Admin") {
                        this.$router.push({ name: 'admin' })
                    } else {
                        this.$router.push({ name: 'home' })
                    }  */
                    /* if( == 'admin'){
                    } else {
                    } */
                    /*
                    */

                }
                if (!user) {
                    this.alert = false
                    this.alertLogIn = true
                }
            } else {
                this.alertLogIn = false
                this.alert = true
            }
        }
    },
    created() {

        if (JSON.parse(localStorage.getItem('currentUser'))) {
            if (JSON.parse(localStorage.getItem('currentUser')).title == "Admin") {
                this.$router.push({ name: 'admin' })
            } else {
                this.$router.push({ name: 'home' })
            }
        }
    }
}
</script>

<style lang="scss">
@import '../assets/styles/sign.css';
</style>