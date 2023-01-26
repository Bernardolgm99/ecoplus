<template>
    <v-app>
        <v-container class="noContainer height100">
            <v-row no-gutters class="height100">
                <v-col cols="3">
                    <v-sheet class="pa-2 ma-2">
                        <!-- navbar -->
                        <NavBar />
                    </v-sheet>
                </v-col>
                <v-col>
                    <v-sheet class="pa-2 border-page bgChange" >
                        <!-- content -->
                        <v-container>
                            <div class="d-flex">
                                <ButtonGoBack />
                                <h1>20XX - Plan</h1>
                            </div>
                            <h3> Here is the list of proposed activities for 20XX. We hope you all enroll your selves in
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
                                            <input type="checkbox" id="id{{ activity.title }}" :value="activity.id"
                                                v-model="checkedActivities" />
                                        </td>
                                        <td>
                                            {{ activity.title }}
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
                            <div class="d-flex justify-space-around mt-4">
                                <v-btn rounded="pill" size="large" style="font-family: Quicksand; text-transform: none;" flat="true" color="green-darken-4" variant="outlined" @click="reset"> Reset </v-btn>
                                <v-btn rounded="pill" size="large" style="font-family: Quicksand; text-transform: none;" flat="true" color="green-lighten-1" @click="subscribe"> Subscribe </v-btn>
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
import { activityStore } from "../stores/activity.js";
import { eventStore } from "../stores/event.js";
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
            eventStore: eventStore(),
            activityStore: activityStore(),
            user: {},
            activities: [],
            checkedActivities: [],
        }
    },
    created(){
        if (!JSON.parse(localStorage.getItem('currentUser'))) {
        this.$router.push({ name: 'signin' })
        }
    },

    methods: {
        reset() {
            this.checkedActivities = this.user.joined.activityId
        },

        subscribe() {
            this.checkedActivities.sort();
            this.user.joined.activityId = this.checkedActivities;
            this.userStore.updateUser(this.user);
            for (const activity of this.activities) {
                if (!(activity.membersId.indexOf(this.user.id) != -1) && this.user.joined.activityId.indexOf(activity.id) != -1) {
                    activity.membersId.push(this.user.id);
                };
                if (activity.membersId.indexOf(this.user.id) != -1 && !(this.user.joined.activityId.indexOf(activity.id) != -1)) {
                    activity.membersId.splice(this.user.joined.activityId.indexOf(activity.id), 1);
                };
            }
            this.activityStore.updateActivities(this.activities)
            this.verifyBadge();
        },

        verifyBadge() {
            let count = 0
            this.eventStore.getMembers.forEach(user => { user.forEach(id => { if (id == this.user.id) count++ }) })
            this.activityStore.getMembers.forEach(user => { user.forEach(id => { if (id == this.user.id) count++ }) })
            if (count > 0) {
                if (this.user.badgesState.indexOf(3) == -1) {
                    this.user.badgesState.push(3);
                    this.userStore.updateUser(this.user);
                } else if (count > 2) {
                    if (this.user.badgesState.indexOf(4) == -1) {
                        this.user.badgesState.push(4);
                        this.userStore.updateUser(this.user);
                    } else if (count > 9) {
                        if (this.user.badgesState.indexOf(5) == -1) {
                            this.user.badgesState.push(5);
                            this.userStore.updateUser(this.user);
                        }
                    }
                }
            }
            console.log(count);
        }
    },

    created() {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.activities = this.activityStore.getActivities;
        this.checkedActivities = this.user.joined.activityId;
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/details.css';
@import '../assets/styles/base.css';
</style>