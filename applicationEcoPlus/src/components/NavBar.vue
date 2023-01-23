<template>
    <div id="bg" class="textBig">
        <div id="top">
            <v-button @click="this.$router.push">
                <div id="icon">
                    <v-img id="logoIcon" :src="ecoIcon"></v-img>
                </div>
            </v-button>
            <div id="topperLinks">
                    <div id="home" class="topperRow">
                        <div id="firstIcon">
                            <v-img id="homeIcon" :src="homeIcon"></v-img>
                        </div>
                        <div id="firstLink">
                            <RouterLink :to="{name: 'home'}">Home</RouterLink>
                        </div>
                    </div>
                <div id="occurrences" class="topperRow">
                    <div id="secondIcon">
                        <v-img id="occurrenceIcon" :src="occurrenceIcon"></v-img>
                    </div>
                    <div id="secondLink">
                        <RouterLink :to="{name: 'occurrences'}">Occurrences</RouterLink>
                    </div>
                </div>
                <div id="events" class="topperRow">
                    <div id="thirdIcon">
                        <v-img id="eventIcon" :src="eventIcon"></v-img>
                    </div>
                    <div id="thirdLink">
                        <RouterLink :to="{name: 'events'}">Events</RouterLink>
                    </div>
                </div>
            </div>
            <div id="trace">
                <hr>
            </div>
            <div id="bottomLinks">
                <div id="activities" class="bottomRow">
                    <div id="forthIcon">
                        <v-img id="activityIcon" :src="activityIcon"></v-img>
                    </div>
                    <div id="forthLink">
                        <RouterLink :to="{name: 'activities'}">Activities</RouterLink>
                    </div>
                </div>
                <div id="suggestions" class="bottomRow">
                    <div id="fifthIcon">
                        <v-img id="suggestionIcon" :src="suggestionIcon"></v-img>
                    </div>
                    <div id="fifthLink">
                        <RouterLink :to="{name: 'suggestions'}">Suggestions</RouterLink>
                    </div>
                </div>
            </div>
            <div id="post" class="text-center">
                <div id="sixth">
                    <v-btn id="postOccurrence" rounded color="primary" dark @click="this.$router.push('/postOccurrence')">
                        <div id="sixthIcon">
                            <v-img id="postIcon" :src="postIcon"></v-img>
                        </div>
                        Post Occurrence 
                    </v-btn>
                </div>
            </div>
        </div>
        <div id="bot">
            <div id="perfil" class="textMediumLarge">
                <div id="perfilIcon">
                    <v-button @click="this.$router.push({name: 'perfil', params: {perfilid: user.id}})">
                        <v-img id="perfil" :src="user.perfilImage"></v-img>
                    </v-button>
                </div>
                <div id="perfilInfos">
                    <RouterLink :to="{name: 'perfil', params:{perfilid: user.id}}">{{user.username }}</RouterLink>
                    {{ user.title }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ecoIcon: '/src/assets/icons/logo.svg',
                homeIcon: '/src/assets/icons/home.svg',
                occurrenceIcon: '/src/assets/icons/tool.svg',
                eventIcon: '/src/assets/icons/calendar.svg',
                activityIcon: '/src/assets/icons/pin.svg',
                suggestionIcon: '/src/assets/icons/file.svg',
                postIcon: '/src/assets/icons/cam.svg',
                user: {}
            }
        },
        created() {
            this.user = JSON.parse(localStorage.getItem('currentUser'))
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/styles/navBar.css';
</style>