<template>
    <v-app>
        <v-container>
            <v-row no-gutters>
                <v-col cols="3">
                    <v-sheet class="pa-2 ma-2">
                        <!-- navbar -->
                        <NavBar />
                    </v-sheet>
                </v-col>
                <v-col>
                    <v-sheet class="pa-2 ma-2" style="background-color: blue">

                        <div>
                            <img :src="event.image" />
                        </div>
                        <div>
                            <ButtonGoBack />
                            <h1>
                                {{ event.title }}
                            </h1>
                            <div>
                                <h2> {{ event.subtitle }} </h2>
                                <button @click="subscribe">{{
                                (this.members.findIndex(member => member.id == this.user.id) == -1) ? "Join Event" :
                                    "Out Event"
                                }}</button>
                            </div>
                            <hr>
                            <p>
                                {{ event.description }}
                            </p>
                            <div>
                                <v-card>
                                    <v-tabs v-model="tab" bg-color="primary">
                                        <v-tab value="moreDetails">More details</v-tab>
                                        <v-tab value="comments">Comments</v-tab>
                                        <v-tab value="members">Members</v-tab>
                                    </v-tabs>
                                    <v-card-text>
                                        <v-window v-model="tab">
                                            <v-window-item value="moreDetails">
                                                <div>FILES</div>
                                                <div>MAPS</div>
                                            </v-window-item>
                                            <v-window-item value="comments">
                                                <input type="text" v-model="newComment" />
                                                <button @click="addComment">Add Comment</button>
                                                <div v-for="comment in comments">
                                                    <div>
                                                        <button @click="like(comment)"> Like </button>
                                                        <span> {{
                                                            comment.likesDislikes.likes.length -
                                                                comment.likesDislikes.dislikes.length
                                                        }} </span>
                                                        <button @click="dislike(comment)"> Dislike </button>
                                                    </div>
                                                    <div>
                                                        {{ userStore.getUserById(comment.userId).username }}
                                                        {{ comment.message }}
                                                    </div>
                                                </div>
                                            </v-window-item>
                                            <v-window-item value="members">
                                                <div v-for="member in members">
                                                    <img :src="member.perfilImage" />
                                                    <div>
                                                        {{ member.username }}
                                                        {{ member.title }}
                                                    </div>
                                                </div>
                                            </v-window-item>
                                        </v-window>
                                    </v-card-text>
                                </v-card>
                            </div>
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
import ButtonGoBack from "../components/ButtonGoBack.vue";
import { eventStore } from "../stores/event.js";
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
        userStore: userStore(),
        users: [],
        user: {},
        event: {},
        comments: [],
        newComment: "",
        members: [],
    }),
    created() {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.event = this.eventStore.getEventById(this.$route.params.eventid);
        this.users = this.userStore.getUsers;
        this.comments = this.event.comments;
        for (const memberId in this.event.membersId) {
            this.members.push(this.users.find(user => user.id == memberId));
        }
        console.log(this.comments);
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
            this.comments.splice(0, 0, {
                messageId: this.comments[0].messageId + 1,
                userId: this.user.id,
                message: this.newComment,
                likesDislikes: { likes: [], dislikes: [] },
            });
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
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/base.css';
img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}
</style>