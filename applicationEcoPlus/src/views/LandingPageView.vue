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
                            <span @click="this.$router.push('/signin')" id="signs">Sign In</span>
                            <span class="whiteText">|</span>
                            <span @click="this.$router.push('/signup')" id="signs">Log In</span>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    <!-- register now and email input -->
        <v-container class="content">
            <v-col>
                <v-row class="content">
                    <span class="bgWhiteText">REGISTER NOW</span>
                </v-row>
                <v-row id="inputEmail">
                    <v-text-field id="textInput"
                    :rules="rules"
                    v-model="inputEmail"
                    hide-details="auto"
                    persistent-hint
                    outlined
                    ></v-text-field>
                    <button @click="this.$router.push('/signup')" class="whiteText" id="btnStarted">Get Started ></button>
                </v-row>
            </v-col>
        </v-container>
    </div>
    <div id="textContent">
        <div class="textContentInit">
            <p>Welcome to <strong>Eco+</strong></p>
            <p>We inspire to create a <strong>helpful tool</strong> to <strong>Eco-Escolas</strong> and develop a <strong>helping and caring community.</strong></p>
        </div>
        <v-container>
            <v-row class="textContentWhite">
                <v-col cols="7" class="textWhite">
                    <p>We came to existence trough a proposal to <strong>Eco-Escolas. 
                       Eco+ consists</strong> in a <strong>web application to assist</strong> members of <strong>Eco-Escolas</strong>, youngsters and older folks,
                       to enrol themselves in activities. Trough our app you can also <strong>report 
                       occurrences and propose to become a member of Eco-Escolas.</strong></p>
                </v-col>
                <v-col cols="5">
                    <img src="../assets/landingPage/imageFirst.png" alt="Person at a computer">
                </v-col>
            </v-row>
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
              value => (value || '').length <= 100 || 'Max 100 characters',
              value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Invalid e-mail.'
              },
            ],
            inputEmail: '',
        }),
    }
</script>

<style>
    @import '../assets/styles/landingPage.css';
</style>