<template>
    <!-- bgImage -->
    <div id="bgImg">
        <!-- <img src="../assets/landingPage/background.jpg" alt="forest with a girl on a swing"> -->
    <!-- nav bar -->
        <div>
            <v-container>
                <v-row id="navBar">
                    <v-col cols="10">
                        <img src="../assets/landingPage/logo_eco_plus.svg" alt="icon Eco Plus" id="logo">
                    </v-col>
                    <v-col cols="2" >
                        <v-row id="entry">
                            <span @click="this.$router.push('/home')" id="signs">Sign In</span>
                            <span class="whiteText">|</span>
                            <span @click="this.$router.push('/home')" id="signs">Log In</span>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    <!-- register now and email input -->
        <v-container class="content">
            <v-col >
                <v-row class="content">
                    <span class="bgWhiteText">REGISTER NOW</span>
                </v-row>
                <v-row id="inputEmail">
                    <v-text-field id="textInput"
                    :rules="rules"
                    hide-details="auto"
                    ></v-text-field>
                    <button class="whiteText" id="btnStarted">Get Started ></button>
                </v-row>
            </v-col>
        </v-container>
    </div>
    <div>
        <!-- content -->
    </div>
</template>

<script>
    export default {
        data: () => ({
            rules: [
              value => !!value || 'Required.',
              value => (value || '').length <= 20 || 'Max 20 characters',
              value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Invalid e-mail.'
              },
            ],
    }),
    }
</script>

<style>
    @import '../assets/styles/landingPage.css';
</style>