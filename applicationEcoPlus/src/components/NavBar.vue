<template>
    <div id="bg" class="textBig">
        <div id="top">
            <div id="icon">
                <img id="logoIcon" @click="this.$router.push" src="/src/assets/icons/logo.svg" />
            </div>
            <div id="topperLinks">
                <div id="home" class="topperRow">
                    <div id="firstIcon">
                        <img id="homeIcon" src="/src/assets/icons/home.svg" />
                    </div>
                    <div id="firstLink">
                        <RouterLink :to="{ name: 'home' }">Home</RouterLink>
                    </div>
                </div>
                <div id="occurrences" class="topperRow">
                    <div id="secondIcon">
                        <img id="occurrenceIcon" src="/src/assets/icons/tool.svg" />
                    </div>
                    <div id="secondLink">
                        <RouterLink :to="{ name: 'occurrences' }">Occurrences</RouterLink>
                    </div>
                </div>
                <div id="events" class="topperRow">
                    <div id="thirdIcon">
                        <img id="eventIcon" src="/src/assets/icons/calendar.svg" />
                    </div>
                    <div id="thirdLink">
                        <RouterLink :to="{ name: 'events' }">Events</RouterLink>
                    </div>
                </div>
            </div>
            <div id="trace">
                <hr>
            </div>
            <div id="bottomLinks">
                <div id="activities" class="bottomRow">
                    <div id="forthIcon">
                        <img id="activityIcon" src="/src/assets/icons/pin.svg" />
                    </div>
                    <div id="forthLink">
                        <RouterLink :to="{ name: 'activities' }">Activities</RouterLink>
                    </div>
                </div>
                <div id="suggestions" class="bottomRow">
                    <div id="fifthIcon">
                        <img id="suggestionIcon" src="/src/assets/icons/file.svg" />
                    </div>
                    <div id="fifthLink">
                        <RouterLink :to="{ name: 'suggestions' }">Suggestions</RouterLink>
                    </div>
                </div>
            </div>
            <div id="post" class="text-center">
                <div id="sixth">
                    <v-btn id="postOccurrence" rounded color="primary" dark
                        @click="this.$router.push('/postOccurrence')">
                        <div id="sixthIcon">
                            <img id="postIcon" src="/src/assets/icons/cam.svg" />
                        </div>
                        <div id="postTxt">
                            Post Occurrence
                        </div>
                    </v-btn>
                </div>
            </div>
        </div>
        <div class="d-flex justify-space-between align-center">
            <div id="bot">
                <div id="perfil" class="textMediumLarge d-flex" @click="navigateToPerfil()">
                    <div id="perfilIcon">
                        <v-img id="perfil" :src="this.userIcon"></v-img>
                    </div>
                    <div id="perfilInfos">
                        <div>{{ user.username }}
                        </div>
                        {{ user.role }}
                    </div>
                </div>
            </div>
            <div class="ml-6">
                <v-btn class="out" icon="mdi-exit-to-app" size="large" flat="true" color="transparent"
                    @click="funcLogOut">
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import { userStore } from '../stores/user';
import { cookie } from '../utilities/cookieFunctions'

export default {
    props: {
        user: {
            type: Object,
        },
    },
    
    data() {
        return {
            userStore: userStore(),
            ecoIcon: '/src/assets/icons/logo.svg',
            homeIcon: '/src/assets/icons/home.svg',
            occurrenceIcon: '/src/assets/icons/tool.svg',
            eventIcon: '/src/assets/icons/calendar.svg',
            activityIcon: '/src/assets/icons/pin.svg',
            suggestionIcon: '/src/assets/icons/file.svg',
            postIcon: '/src/assets/icons/cam.svg',
            userIcon: ''
        }
    },

    methods: {
        funcLogOut() {
            cookie.deleteCookie("token");
            this.$router.push({ name: 'signin'});
        },
        navigateToPerfil() {
            this.$router.push({ name: 'perfil', params: { perfilid: this.user.id } });
        }
    },
    created() {
        setTimeout(() => {
            if (this.user.icone) {
                this.userIcon = 'data:image/webp;jpg;png;jpeg;base64,' + this.user.icone
            } else {
                this.userIcon = '/src/assets/perfil/yoda.jpeg'
            };  
            console.log(this.userIcon);
        }, 1500);
        
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/navBar.css';
</style>