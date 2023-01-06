<template>
    <div>
        <h1>SIGN IN</h1>
        <h3>Start a session to access your activities and make the world better!!! </h3>
        <br>
        <label>Username: </label>
        <input type="text" placeholder="Username" v-model="username">
        <br>
        <label>Password: </label>
        <input type="text" placeholder="Password" v-model="password">
        <br>
        <br>
        <button @click="this.$router.push({name: 'signup'})">Create an Account</button> 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button @click="checkLogIn">Sign In</button>
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
            }
        },
        methods: {
            checkLogIn() {
                if(this.userStore.getUserChecked(this.username, this.password)){

                    alert('Sign In Success')

                    this.userId = this.userStore.getUserId(this.username)
                    localStorage.setItem('currentUser', JSON.stringify(this.userStore.getUserById(this.userId)))
                    this.$router.push({name: 'home'}) 

                }
                if(!this.userStore.getUserChecked(this.username, this.password)){
                    alert('Wrong username or password')
                }
            }
        }, 
        created() {

            if(JSON.parse(localStorage.getItem('currentUser'))){
                this.$router.push({name: 'home'})
            }

        }
    }
</script>

<style lang="scss" scoped>

</style>