<template>
    <div>
        <h1>Sign Up</h1>
        <h3>Create your account on ecoPlus here!!! :)</h3>
        <br>
        <div >
            <label>Name: </label>
            <input type="text" placeholder="Write your name here" v-model="name">
            <br>
            <label>Email: </label>
            <input type="email" placeholder="Write your email here" v-model="email">
            <br>
            <label>Birthday: </label>
            <input type="date" placeholder="Write your birthdate here" v-model="birthday">
            <br>
            <label name="city">City: </label>
            <select name="city" id="city" v-model="city">
                <option value="Select Option" selected> Select Option</option>
                <option value="Cascais"> Cascais </option>
                <option value="Rio Tinto"> Rio Tinto </option>
            </select>
            <br>
            <label>Postal Code: </label>
            <input type="text" placeholder="Write your postal code here" v-model="postalcode">
            <br>
            <label>Password: </label>
            <input type="password" placeholder="Write your password here" v-model="pw">
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div>
            <label>Username: </label>
            <input type="text" placeholder="Write your username here" v-model="username">  
            <br>
            <label for="gender">Gender: </label>
            <select id="gender" name="gender" v-model="gender">
                    <option value="Select Option" selected> Select Option</option>
                    <option value="male"> male </option>
                    <option value="female"> female </option>
            </select>
            <br>
            <label name="district">District: </label>
            <select name="district" id="district" v-model="district">
                <option value="Select Option" selected> Select Option</option>
                <option value="lisbon"> Lisbon </option>
                <option value="porto"> Porto </option>
            </select>
            <br>
            <label>School: </label>
            <input type="text" placeholder="Write your school name here" v-model="school">
            <br>
            <label>Confirm Password: </label>
            <input type="password" placeholder="Write again you password here" v-model="checkPw">
        </div>
        <div>
            <v-alert prominent type="error" variant="outlined" style="margin-bottom: 20px;" v-if="alert" id="alert">
                <strong>All parameters are required!</strong>
            </v-alert>
            <v-alert prominent type="error" variant="outlined" style="margin-bottom: 20px;" v-if="alertPw" id="alert">
                <strong>Passwords doesn't match!</strong>
            </v-alert>
            <v-alert prominent type="error" variant="outlined" style="margin-bottom: 20px;" v-if="alertEmail" id="alert">
                <strong>Email already exists!</strong>
            </v-alert>
            <v-alert prominent type="error" variant="outlined" style="margin-bottom: 20px;" v-if="alertUsername" id="alert">
                <strong>Username already exists!</strong>
            </v-alert>
            <v-alert density="comfortable" type="success" style="margin-bottom: 20px;"  variant="tonal" v-if="sucess">
                <strong>Welcome Back!</strong>
            </v-alert>
            <button @click="this.$router.push({name: 'signin'})">I already have an account!</button>
            <br>
            <button @click="createAccount">Register</button>
        </div>
    </div>
</template>

<script>

import { userStore } from '../stores/user'

    export default {
        name: 'signup',
        props: ['inputEmailLP'],
        data() {
            return {
                userStore: userStore(),
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
            createAccount() {
                if(this.name != '' && this.username != '' && this.email != '' && this.birthday != '' && this.gender != '' && this.city != '' && this.district != '' && this.postalcode != '' && this.school != '' && this.pw != '' && this.checkPw){
                    if(this.userStore.getExistingAccount(this.username, this.email)){
                        if(this.pw == this.checkPw) {
    
                            this.alertPw = false
                            this.alertEmail = false
                            this.alertUsername = false
                            this.alert = false
                            this.sucess = true

                            this.userStore.addUser(this.username, this.name, this.email, this.birthday, this.gender, this.city, this.district, this.postalcode, this.school, this.pw)
                            
                            this.currentUser = this.userStore.getUserId(this.username)
    
                            localStorage.setItem('currentUser', JSON.stringify(this.userStore.getUserById(this.currentUser)))
    
                            this.$router.push({name: 'home'})
                            
                        } else {
                            this.alertEmail = false
                            this.alertUsername = false
                            this.alert = false
                            this.alertPw = true
                        }
    
                    } else {
    
                        this.emailExist = this.userStore.getEmailExistence(this.email)
    
                        if(this.emailExist){
                            this.alertPw = false
                            this.alertUsername = false
                            this.alert = false
                            this.alertEmail = true
                        }
                        if(!this.emailExist){
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
        created() {

            if(JSON.parse(localStorage.getItem('currentUser'))){
                this.$router.push({name: 'home'})
            }

            this.email = this.$route.query.inputEmailLP
        }
    }
</script>

<style lang="scss" scoped>

</style>