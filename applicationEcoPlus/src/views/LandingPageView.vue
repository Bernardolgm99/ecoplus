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
                            <span @click="this.$router.push('/signin')" class="whiteText hover">Sign In</span>
                            <span class="whiteText">|</span>
                            <span @click="this.$router.push('/signup')" class="whiteText hover">Log In</span>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    <!-- register now and email input -->
        <v-container class="contentBgImg">
            <v-col>
                <v-row class="contentBgImg">
                    <span id="bgText" class="textTitle whiteText">REGISTER NOW</span>
                </v-row>
                <v-form @submit.prevent="sendSignUp" ref="input">
                    <v-row id="inputEmail">
                        <v-text-field id="textInput" class="rounded-t-xl"
                        type="email"
                        :rules="rules"
                        v-model="inputEmail"
                        placeholder="example@gmail.com"
                        hide-details="auto"
                        persistent-hint
                        outlined
                        ></v-text-field>
                        <v-btn type="submit" id="btnStarted" class="whiteText textMediumLarge">Get Started ></v-btn>
                    </v-row> 
                </v-form>
            </v-col>
        </v-container>
    </div>
    <!-- information text and image content -->
    <div>
        <div id="textContentInit" class="bgGreen orderColumnCenter textMedium">
            <p>Welcome to <strong>Eco+</strong></p>
            <p>We inspire to create a <strong>helpful tool</strong> to <strong>Eco-Escolas</strong> and develop a <strong>helping and caring community.</strong></p>
        </div>
    <!-- firstColumn -->
        <div class="rowContent alignContentCenter textMedium">
        <v-container>
            <v-row>
                <v-col cols="7" class="alignContentCenter">
                    <p>We came to existence trough a proposal to <strong>Eco-Escolas. 
                       Eco+ consists</strong> in a <strong>web application to assist</strong> members of <strong>Eco-Escolas</strong>, youngsters and older folks,
                       to enrol themselves in activities. Trough our app you can also <strong>report 
                       occurrences and propose to become a member of Eco-Escolas.</strong></p>
                </v-col>
                <v-col cols="5"  class="alignContentCenter">
                    <img src="../assets/landingPage/imageFirst.png" alt="Person at a computer">
                </v-col>
            </v-row>
        </v-container>
        </div>
    <!-- secondColumn -->
        <div class="bgGreen rowContent alignContentCenter textMedium">
        <v-container>
            <v-row>
                <v-col cols="5"  class="alignContentCenter">
                    <img src="../assets/landingPage/imageSecond.png" alt="Person in nature">
                </v-col>
                <v-col cols="7" class="alignContentCenter">
                    <p>We aspire to educate people to be <strong>more mindful</strong> of the planet we live in. We want to <strong>protect the planet</strong> any way we can. 
                       Throughout Eco-Escolas activities, you will <strong>clean beaches, plant trees and everything between.</strong></p>
                </v-col>
            </v-row>
        </v-container>
        </div>
    <!-- thridColumn -->
        <div class="rowContent alignContentCenter textMedium">
        <v-container>
            <v-row class="textContentWhite">
                <v-col cols="7" class="alignContentCenter">
                    <p>You can <strong>join from everywhere</strong> and <strong>participate in the events</strong> and <strong>activities near you, present at you school.</strong> 
                        For you to better understand the different places possible for the diverse number of activities at your disposal,
                        we <strong>added detailed maps of every location.</strong></p>
                </v-col>
                <v-col cols="5" class="alignContentCenter">
                    <img src="../assets/landingPage/imageThird.png" alt="Nature location">
                </v-col>
            </v-row>
        </v-container>
        </div>
    <!-- fourthColumn -->
        <div class="bgGreen rowContent alignContentCenter textMedium">
        <v-container>
            <v-row>
                <v-col cols="5" class="alignContentCenter">
                    <img src="../assets/landingPage/imageFourth.png" alt="Lamp idea in a computer display">
                </v-col>
                <v-col cols="7" class="alignContentCenter">
                    <p>To envolve you to the fullest, we added some <strong>new and innovative content.</strong> 
                        Now, you will have <strong>missions</strong> and can compete with others by <strong>submitting occurrences, 
                        completing missions, earning badges</strong> and <strong>much more.</strong></p>
                </v-col>
            </v-row>
        </v-container>
        </div>    
    <!-- join now image -->
        <v-container id="bgImgJoinNow" class="alignContentCenter">
            <v-btn @click="this.$router.push('/signup')" id="btnJoinNow" class="whiteText textBig ">Join Now</v-btn>
        </v-container>
    </div>
    <Footer></Footer>
</template>

<script>
    import Footer from '../components/Footer.vue'
    export default {
        components: {
            Footer,
        },
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
        methods: {
            async sendSignUp() {
                let isValid = await this.$refs['input'].validate()
                if(isValid.valid){
                    this.$router.push({name: 'signup' , query: { inputEmailLP: this.inputEmail }})
                }
            },
        },
    }
</script>

<style>
    @import '../assets/styles/landingPage.css';
    @import '../assets/styles/basecss.css';
</style>