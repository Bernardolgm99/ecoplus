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
                    <v-sheet class="pa-2 border-page bgChange">
                        <!-- content -->
                        <v-container>
                            <div class="d-flex">
                                <ButtonGoBack />
                                <h1>2023 - Plan</h1>
                            </div>
                            <h3> Here is the list of proposed activities for 2023. We hope you all enroll your selves in
                                every
                                last one.</h3>
                            <v-table class="mt-6">
                                <thead>
                                    <tr>
                                        <th scope="col"><b>#</b></th>
                                        <th scope="col">Activities</th>
                                        <th class="text-right" scope="col">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="activity, index in activities" :class="index % 2 == 0 ? 'even' : 'odd'"
                                        :key="activity.id">
                                        <td>
                                            <!-- <input type="checkbox" id="id{{ activity.nome }}" :value="activity.id"
                                                v-model="checkedActivities" /> -->
                                            {{ activity.id }}
                                        </td>
                                        <td>
                                            {{ activity.name }}
                                        </td>
                                        <td class="text-right">
                                            <RouterLink
                                                :to="{ name: 'activityDetail', params: { activityId: activity.id } }">
                                                <v-btn variant="flat" name="detail">Detail</v-btn>
                                            </RouterLink>
                                        </td>
                                    </tr>
                                </tbody>
                            </v-table>
                            <!-- <div class="d-flex justify-space-around mt-4">
                                <v-btn rounded="pill" size="large" style="font-family: Quicksand; text-transform: none;"
                                    flat="true" color="green-darken-4" variant="outlined" @click="reset"> Reset </v-btn>
                                <v-btn rounded="pill" size="large" style="font-family: Quicksand; text-transform: none;"
                                    flat="true" color="green-lighten-1" @click="subscribe"> Subscribe </v-btn>
                            </div> -->
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
import { activityStore } from "../stores/activity.js";
import { userStore } from "../stores/user.js"

export default {
    components: {
        NavBar,
        SideBar,
        ButtonGoBack,
    },

    data() {
        return {
            userStore: userStore(),
            activityStore: activityStore(),
            activities: [],
            user: {},
            checkedActivities: [],
        }
    },
    async created() {
        this.activities = this.activityStore.getActivities;
        if (this.activities.length == 0) {
            await this.activityStore.fetchAllActivities();
            this.activities = this.activityStore.getActivities;
        };
        console.log(this.activities.length)
        await this.userStore.fetchLoggedUser();
        this.user = await this.userStore.getUser;
    },

    methods: {
        reset() {
        },

        subscribe() {
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/details.css';
@import '../assets/styles/base.css';
</style>