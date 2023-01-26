<template>
    <div>
        <h1>Log In</h1>
        <h3>Start a session to access your activities and make the world better!!! </h3>
        <br>
        <label>Username: </label>
        <input type="text" placeholder="Username" v-model="username">
        <br>
        <label>Password: </label>
        <input type="password" placeholder="Password" v-model="password">
        <br>
        <v-alert prominent type="error" variant="outlined" style="margin-bottom: 20px;" v-if="alert" id="alert">
            <strong>All parameters are required!</strong>
        </v-alert>
        <v-alert prominent type="error" variant="outlined" style="margin-bottom: 20px;" v-if="alertLogIn" id="alert">
            <strong>Wrong email or password!</strong>
        </v-alert>
        <v-alert density="comfortable" type="success" style="margin-bottom: 20px;"  variant="tonal" v-if="sucess">
            <strong>Welcome Back!</strong>
        </v-alert>
        <br>
        <button @click="this.$router.push({ name: 'signup' })">Create an Account</button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button @click="checkLogIn">Log In</button>
    </div>
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
        checkLogIn() {
            if(this.username != '' && this.password != ''){
                if (this.userStore.getUserChecked(this.username, this.password)) {

                    this.alert = false
                    this.alertLogIn = false
                    this.sucess = true

                    this.userId = this.userStore.getUserId(this.username)
                    localStorage.setItem('currentUser', JSON.stringify(this.userStore.getUserById(this.userId)))
                    this.$router.push({ name: 'home' })

                }
                if (!this.userStore.getUserChecked(this.username, this.password)) {

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

<style lang="scss" scoped>

</style>