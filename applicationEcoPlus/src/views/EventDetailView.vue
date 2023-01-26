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
                                <v-btn size="large" rounded="pill" style="font-family: Quicksand; text-transform: none;" flat="true" v-if="(this.members.findIndex(member => member.id == this.user.id) == -1)"
                                    class="mr-2 ms-auto mt-1 btnJoin" color="green-lighten-1" @click="subscribe">
                                    Join Event
                                </v-btn>
                                <v-btn size="large" rounded="pill" style="font-family: Quicksand; text-transform: none;" flat="true" v-else class="mr-2 ms-auto mt-1 btnOut" color="green-darken-4"
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
                                            <v-window-item value="comments">
                                                <v-textarea label="Comment" rows="1" auto-grow bg-color="grey-lighten-2"
                                                    color="green" v-model="newComment"></v-textarea>
                                                <v-btn color="green" @click="addComment">Sent</v-btn>
                                                <div class="d-flex" v-for="comment in comments">
                                                    <div class="d-flex flex-column align-center">
                                                        <v-btn variant="text" icon="mdi-arrow-up-bold" size="x-large"
                                                            :color="comment.likesDislikes.likes.indexOf(this.user.id) != -1 ? 'green' : 'gray'"
                                                            @click="like(comment)">
                                                        </v-btn>
                                                        <span> {{
                                                            comment.likesDislikes.likes.length -
                                                                comment.likesDislikes.dislikes.length
                                                        }} </span>
                                                        <v-btn variant="text" icon="mdi-arrow-down-bold" size="x-large"
                                                            :color="comment.likesDislikes.dislikes.indexOf(this.user.id) != -1 ? 'red' : 'gray'"
                                                            @click="dislike(comment)">
                                                        </v-btn>
                                                    </div>
                                                    <div class="d-flex flex-column justify-center">
                                                        <RouterLink style="color: black;"
                                                            :to="{ name: 'perfil', params: { perfilid: userStore.getUserById(comment.userId).id } }">
                                                            <h2 class="mb-1">
                                                                {{ userStore.getUserById(comment.userId).username }}
                                                            </h2>
                                                        </RouterLink>
                                                        <p class="mt-1">
                                                            {{ comment.message }}
                                                        </p>
                                                    </div>
                                                </div>
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
import { eventStore } from "../stores/event.js";
import { activityStore } from "../stores/activity.js";
import { userStore } from "../stores/user";

export default {
    components: {
        NavBar,
        SideBar,
        ButtonGoBack,
    },

    data: () => ({
        tab: null,
        eventStore: eventStore(),
        activityStore: activityStore(),
        userStore: userStore(),
        users: [],
        user: {},
        event: {},
        comments: [],
        newComment: "",
        members: [],
    }),

    created() {
        if (!JSON.parse(localStorage.getItem('currentUser'))) {
            this.$router.push({ name: 'signin' })
        }
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.event = this.eventStore.getEventById(this.$route.params.eventid);
        this.users = this.userStore.getUsers;
        this.comments = this.event.comments;
        for (const memberId of this.event.membersId) {
            this.members.push(this.users.find(user => user.id == memberId));
        }
        console.log(this.eventStore.getMembers);
        let count = 0
        this.eventStore.getMembers.forEach(user => { user.forEach(id => { if (id == this.user.id) count++ }) })
        console.log(count)

    },

    methods: {
        like(comment) {
            console.log(comment);
            if (!(comment.likesDislikes.likes.indexOf(this.user.id) != -1)) {
                comment.likesDislikes.likes.push(this.user.id);
                if ((comment.likesDislikes.dislikes.indexOf(this.user.id) != -1)) {
                    comment.likesDislikes.dislikes.splice(comment.likesDislikes.dislikes.indexOf(this.user.id), 1);
                }
            } else {
                comment.likesDislikes.likes.splice(comment.likesDislikes.likes.indexOf(this.user.id), 1);
            }
            const index = this.comments.findIndex(commentIndex => commentIndex.messageId == comment.messageId);
            this.comments[index] = comment;
            this.update();
        },

        dislike(comment) {
            console.log(comment);
            if (!(comment.likesDislikes.dislikes.indexOf(this.user.id) != -1)) {
                comment.likesDislikes.dislikes.push(this.user.id);
                if ((comment.likesDislikes.likes.indexOf(this.user.id) != -1)) {
                    comment.likesDislikes.likes.splice(comment.likesDislikes.likes.indexOf(this.user.id), 1);
                }
            } else {
                comment.likesDislikes.dislikes.splice(comment.likesDislikes.dislikes.indexOf(this.user.id), 1);
            }
            console.log(this.comments)
            const index = this.comments.findIndex(commentIndex => commentIndex.messageId == comment.messageId);
            this.comments[index] = comment;
            this.update();
        },

        addComment() {
            if (this.comments.length > 0) {
                this.comments.splice(0, 0, {
                    messageId: this.comments[0].messageId + 1,
                    userId: this.user.id,
                    message: this.newComment,
                    likesDislikes: { likes: [], dislikes: [] },
                });
            }
            else {
                this.comments.push({
                    messageId: 0,
                    userId: this.user.id,
                    message: this.newComment,
                    likesDislikes: { likes: [], dislikes: [] },
                });
            }
            this.newComment = "";
            this.update();
        },

        subscribe() {
            if (this.members.findIndex(member => member.id == this.user.id) == -1) {
                this.user.joined.eventId.push(this.event.id);
                this.userStore.updateUser(this.user);
                this.members.push(this.user);
            } else {
                this.user.joined.eventId.splice(this.user.joined.eventId.indexOf(this.event.id), 1);
                this.userStore.updateUser(this.user);
                this.members.splice(this.members.findIndex(member => member.id == this.user.id), 1);
            }
            this.update();
        },

        update() {
            this.event.membersId = this.members.map(member => member.id);
            this.event.comments = this.comments;
            this.eventStore.updateEvent(this.event);
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
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/base.css';
@import '../assets/styles/details.css';
</style>