<template>
    <v-app>
        <v-container>
            <v-row no-gutters>
                <v-col cols="2">
                    <v-sheet class="pa-2 ma-2">
                        <!-- navbar -->
                        <NavBar />
                    </v-sheet>
                </v-col>
                <v-col>
                    <v-sheet class="pa-2 ma-2" style="background-color: blue">
                        <!-- content -->
                        <h1>20XX - Plan</h1>
                        <h3>Here is the list of proposed activities for 20XX. We hope you all enroll your selves in
                            every
                            last one.</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Activities</th>
                                    <th scope="col">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="activity in activities" :key="activity.id">
                                    <td>
                                        <input type="checkbox" id="id{{ activity.title }}" :value="activity.id"
                                            v-model="checkedActivities" />
                                    </td>
                                    <td>
                                        {{ activity.title }}
                                    </td>
                                    <td>
                                        <RouterLink
                                            :to="{ name: 'activityDetail', params: { activityId: activity.id } }">
                                            <button type="button" name="detail">Detail</button>
                                        </RouterLink>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button @click="reset"> Reset </button>
                            <button @click="subscribe"> Subscribe </button>
                        </div>
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
import { activityStore } from "../stores/activity.js";
import { userStore } from "../stores/user"

export default {
    components: {
        NavBar,
        SideBar,
    },
    data() {
        return {
            userStore: userStore(),
            activityStore: activityStore(),
            user: {},
            activities: [],
            checkedActivities: [],
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
                if (!(activity.participants.indexOf(this.user.id) != -1) && this.user.joined.activityId.indexOf(activity.id) != -1) {
                    activity.participants.push(this.user.id);
                };
                if (activity.participants.indexOf(this.user.id) != -1 && !(this.user.joined.activityId.indexOf(activity.id) != -1)) {
                    activity.participants.splice(this.user.joined.activityId.indexOf(activity.id), 1);
                };
            }
            this.activityStore.updateActivities(this.activities)
        }
    },
    created() {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.activities = this.activityStore.getActivities;
        this.checkedActivities = this.user.joined.activityId;
    }
}
</script>

<style lang="scss" scoped>

</style>