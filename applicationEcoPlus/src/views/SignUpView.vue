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
            }
        },
        methods: {
            createAccount() {
                if(this.userStore.getExistingAccount(this.username, this.email)){
                    if(this.pw == this.checkPw) {

                        this.userStore.addUser(this.username, this.name, this.email, this.birthday, this.gender, this.city, this.district, this.postalcode, this.school, this.pw)
                        
                        this.currentUser = this.userStore.getUserId(this.username)

                        localStorage.setItem('currentUser', JSON.stringify(this.userStore.getUserById(this.currentUser)))

                        alert('Account created')
                        
                    } else {
                        alert(`Passwords doesn't match`)
                    }

                } else {

                    this.emailExist = this.userStore.getEmailExistence(this.email)

                    if(this.emailExist){
                        alert('Email already exists')
                    }
                    if(!this.emailExist){
                        alert('Username already exists')
                    }
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