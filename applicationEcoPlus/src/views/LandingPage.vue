<template>
    <!-- bgImage -->
    <div id="bgImg">
        <img src="../assets/landingPage/background.jpg" alt="forest with a girl on a swing">
    </div>
    <!-- nav bar -->
    <div>
        <v-container>
            <v-row>
                <v-col cols="10">
                    <img src="../assets/landingPage/logo_eco_plus.svg" alt="icon Eco Plus" id="logo">
                </v-col>
                <v-col cols="2" >
                    <v-row id="entry">
                        <span @click="this.$router.push('/home')" id="signs">Sign In</span>
                        <span id="whiteText">|</span>
                        <span @click="this.$router.push('/home')" id="signs">Log In</span>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style>
    @import '../assets/styles/landingPage.css';
</style>