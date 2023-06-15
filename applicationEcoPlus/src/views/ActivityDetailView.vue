<template>
    <v-app>
        <v-container class="noContainer height100">
            <v-row no-gutters class="height100">
                <v-col cols="3">
                    <v-sheet class="pa-2 ma-2">
                        <!-- navbar -->
                        <NavBar :user="user" />
                    </v-sheet>
                </v-col>
                <v-col>
                    <v-sheet class="pa-2 border-page">
                        <!-- content -->
                        <img class="img-thumbnail" :src="activity.image" />
                        <v-container>
                            <div>
                                <div class="d-flex mt-2 mb-12">
                                    <ButtonGoBack />
                                    <h1>
                                        {{ activity.name }}
                                    </h1>
                                </div>
                                <div class="d-flex justify-space-between align-center mb-2">
                                    <h2 class="align-self-start">Diagnosis: </h2>
                                    <span class="pt-1 ml-2"> {{ activity.diagnosis }} </span>
                                    <div v-if="!Object.keys(user).length == 0">
                                        <v-btn size="large" rounded="pill"
                                            style="font-family: Quicksand; text-transform: none;" flat="true"
                                            v-if="(this.members.findIndex(sub => sub.username == this.user.username) == -1)"
                                            class="mr-2 ms-auto mt-1 btnJoin" color="green-lighten-1"
                                            @click="subscribe(false)">
                                            Join Activity
                                        </v-btn>

                                        <v-btn size="large" rounded="pill"
                                            style="font-family: Quicksand; text-transform: none;" flat="true" v-else
                                            class="mr-2 ms-auto mt-1 btnOut" color="green-darken-4"
                                            @click="subscribe(true)">
                                            Out Activity
                                        </v-btn>
                                    </div>
                                </div>
                                <hr class="mb-2">
                                <div class="d-flex mb-4">
                                    <h2>Schedule: </h2>
                                    <span class="pt-1 ml-2"> {{ date.start.toLocaleDateString('en-GB') }} to {{
                                        date.end.toLocaleDateString('en-GB') }}</span>
                                </div>
                                <p class="mb-4">
                                    {{ activity.description }}
                                </p>
                                <div>
                                    <v-card flat="true">
                                        <v-tabs fixed-tabs v-model="tab" bg-color="transparent">
                                            <v-tab value="moreDetails">More details</v-tab>
                                            <v-tab value="comments">Comments</v-tab>
                                            <v-tab value="members">Members</v-tab>
                                        </v-tabs>
                                        <v-card-text>
                                            <v-window v-model="tab">
                                                <v-window-item value="moreDetails">
                                                    <h2>
                                                        Objectives:
                                                    </h2>
                                                    <v-container>
                                                        <p class="pl-6">
                                                            {{ activity.objectives }}
                                                        </p>
                                                    </v-container>
                                                    <h2>
                                                        Resources:
                                                    </h2>
                                                    <v-container>
                                                        <p class="pl-6">
                                                            {{ activity.resouces }}
                                                        </p>
                                                    </v-container>
                                                    <div class="d-flex mb-6">
                                                        <h2>
                                                            Location:
                                                        </h2>
                                                        <p class="pl-2">
                                                            {{ activity.location }}
                                                        </p>
                                                    </div>
                                                    <div class="d-flex mb-6">
                                                        <h2>
                                                            Evalution(Indicators):
                                                        </h2>
                                                        <p class="pl-2">
                                                            {{ activity.evalution_ind }}
                                                        </p>
                                                    </div>
                                                    <div class="d-flex mb-6">
                                                        <h2>
                                                            Evalution(Instruments):
                                                        </h2>
                                                        <p class="pl-2">
                                                            {{ activity.evalution_inst }}
                                                        </p>
                                                    </div>
                                                    <!-- WORK IN PROGRESS-->
                                                    <!-- <div>FILES</div> -->
                                                    <!-- <div>MAPS</div> -->
                                                </v-window-item>
                                                <v-window-item value="comments">
                                                    <Comments :id="path.id" :type="path.type" :user="user" />
                                                </v-window-item>
                                                <v-window-item value="members">
                                                    <div class="d-flex flex-column align-center" v-for="member in members">
                                                        <RouterLink class="w-100" RouterLink style="color: black;"
                                                            :to="{ name: 'perfil', params: { perfilid: userStore.getUserId(member.username) } }">
                                                            <div class="members d-flex mx-auto">
                                                                <img class="img-members" :src="member.perfilImage" />
                                                                <div class="ml-6 d-flex flex-column justify-center">
                                                                    <h2 class="mb-1">
                                                                        {{ member.username }}
                                                                    </h2>
                                                                    <h3 class="mt-1">
                                                                        {{ member.title }}
                                                                    </h3>
                                                                </div>
                                                            </div>
                                                        </RouterLink>
                                                        <div v-if="member != members[members.length - 1]"
                                                            class="spacing my-3 mx-auto"></div>
                                                    </div>
                                                </v-window-item>
                                            </v-window>
                                        </v-card-text>
                                    </v-card>
                                </div>
                            </div>
                        </v-container>
                    </v-sheet>
                </v-col>
                <v-col cols="3">
                    <v-sheet class="pa-2 ma-2">
                        <!-- sidebar -->
                        <SideBar />
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import SideBar from "../components/SideBar.vue";
import ButtonGoBack from "../components/ButtonGoBack.vue";
import Comments from "../components/Comments.vue";
import { activityStore } from "../stores/activity.js";
import { userStore } from "../stores/user"

export default {
    components: {
        NavBar,
        SideBar,
        ButtonGoBack,
        Comments,
    },

    data: () => ({
        tab: null,
        activityStore: activityStore(),
        userStore: userStore(),
        user: {},
        activity: {},
        members: [],
        path: {},
        date: {
            start: new Date(),
            end: new Date()
        },
    }),

    async created() {
        this.path = {
            id: this.$router.currentRoute._value.params.activityId,
            type: this.$router.currentRoute._value.fullPath.split('/')[1]
        }
        this.user = await this.userStore.getUser;
        if (this.user) {
            await this.userStore.fetchLoggedUser();
            this.user = await this.userStore.getUser;
        }
        await this.activityStore.fetchActivityId(this.path.id);
        this.activity = await this.activityStore.getActivity
        this.members = this.activity.users;
        console.log(this.activity.users[0].username);

        this.date.start = new Date(this.activity.start)
        this.date.end = new Date(this.activity.end)
    },

    methods: {
        async subscribe(areadySubscribed) {
            await this.activityStore.subscribe(this.path.id, areadySubscribed);
            if (areadySubscribed) this.members.splice(this.members.findIndex(sub => sub.username == this.user.username), 1);
            else this.members.push(this.user);
        },
    }
}
</script>

<style lang="scss" scoped>@import '../assets/styles/base.css';
@import '../assets/styles/details.css';</style>