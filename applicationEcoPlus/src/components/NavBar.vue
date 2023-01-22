<template>
    <div id="bg">
        sou a navBar
        <div id="icon">
            <v-icon>{{ ecoIcon }}</v-icon>
        </div>
        <div id="topperLinks">
            <div id="home" class="topperRow">
                <RouterLink :to="{name: 'home'}">Home</RouterLink>
            </div>
            <div id="occurrences" class="topperRow">
                <RouterLink :to="{name: 'occurrences'}">Occurrences</RouterLink>
            </div>
            <div id="events" class="topperRow">
                <RouterLink :to="{name: 'events'}">Events</RouterLink>
            </div>
        </div>
        <div id="bottomLinks">
            <div id="activities" class="bottomRow">
                <RouterLink :to="{name: 'activities'}">Activities</RouterLink>
            </div>
            <div id="suggestions" class="bottomRow">
                <RouterLink :to="{name: 'suggestions'}">Suggestions</RouterLink>
            </div>
        </div>
        <div id="post">
            <RouterLink :to="{name: 'post'}">Post Occurrence</RouterLink>
        </div>
        <div id="perfil">
            <RouterLink :to="{name: 'perfil', params:{perfilid: user.id}}">{{user.username }}</RouterLink>
            
            {{ user.title }}
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ecoIcon: '@/assets/icons/logo.svg',
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