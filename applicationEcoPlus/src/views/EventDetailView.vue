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
                    <v-sheet class="pa-2 border-page">
                        <div>
                            <img class="img-thumbnail" :src="event.image" />
                        </div>
                        <v-container>
                            <div class="d-flex mt-2 mb-12">
                                <ButtonGoBack />
                                <h1>
                                    {{ event.title }}
                                </h1>
                            </div>
                            <div class="d-flex justify-space-between align-center mb-2">
                                <h2> {{ event.subtitle }} </h2>
                                <v-btn size="large" rounded="pill" style="font-family: Quicksand; text-transform: none;"
                                    flat="true" v-if="(this.members.findIndex(member => member.id == this.user.id) == -1)"
                                    class="mr-2 ms-auto mt-1 btnJoin" color="green-lighten-1" @click="subscribe">
                                    Join Event
                                </v-btn>
                                <v-btn size="large" rounded="pill" style="font-family: Quicksand; text-transform: none;"
                                    flat="true" v-else class="mr-2 ms-auto mt-1 btnOut" color="green-darken-4"
                                    @click="subscribe">
                                    Out Event
                                </v-btn>
                            </div>
                            <hr>
                            <p class="my-2">
                                {{ event.description }}
                            </p>
                            <div>
                                <v-card>
                                    <v-tabs fixed-tabs v-model="tab" bg-color="transparent">
                                        <!-- <v-tab value="moreDetails">More details</v-tab> -->
                                        <v-tab value="comments">Comments</v-tab>
                                        <v-tab value="members">Members</v-tab>
                                    </v-tabs>
                                    <v-card-text>
                                        <v-window v-model="tab">
                                            <!-- <v-window-item value="moreDetails">
                                                <div>FILES</div>
                                                <div>MAPS</div>
                                            </v-window-item> -->
                                            <Comments :id="path.id" :type="path.type" />
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
import { eventStore } from "../stores/event.js";
import { userStore } from "../stores/user";

export default {
    components: {
        NavBar,
        SideBar,
        ButtonGoBack,
        Comments,
    },

    data: () => ({
        tab: null,
        eventStore: eventStore(),
        userStore: userStore(),
        user: {},
        event: {},
        members: [],
        path: {},
    }),

    async created() {
        this.path = {
            id: this.$router.currentRoute._value.params.eventid,
            type: this.$router.currentRoute._value.fullPath.split('/')[1]
        }
        await this.eventStore.fetchEventId(this.$router.currentRoute._value.params.eventid)
        this.event = this.eventStore.getEvent;
    },

    methods: {
        subscribe() {
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/base.css';
@import '../assets/styles/details.css';
</style>