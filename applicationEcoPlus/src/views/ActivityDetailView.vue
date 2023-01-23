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
                            <img :src="activity.image" />
                        </div>
                        <div>
                            <ButtonGoBack />
                            <h1>
                                {{ activity.title }}
                            </h1>
                            <div>
                                <h2>Diagnosis: </h2>
                                <span> {{ activity.diagnosis }} </span>
                                <button @click="subscribe">{{
                                (this.members.findIndex(member => member.id == this.user.id) == -1) ? "Join Event" :
                                    "Out Event"
                                }}</button>
                            </div>
                            <hr>
                            <div>
                                <h2>Schedule: </h2>
                                <span> {{ activity.schedule }}</span>
                            </div>
                            <p>
                                {{ activity.description }}
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
                                                <h3>
                                                    Objectives:
                                                </h3>
                                                <p>
                                                    {{ activity.objectives }}
                                                </p>
                                                <h3>
                                                    Resources:
                                                </h3>
                                                <p>
                                                    {{ activity.resouces }}
                                                </p>
                                                <h3>
                                                    Participants:
                                                </h3>
                                                <p>
                                                    {{ activity.participants }}
                                                </p>
                                                <h3>
                                                    Evalution(Indicators):
                                                </h3>
                                                <p>
                                                    {{ activity.evalutionInd }}
                                                </p>
                                                <h3>
                                                    Evalution(Instruments):
                                                </h3>
                                                <p>
                                                    {{ activity.evalutionInst }}
                                                </p>
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
                                                        {{ comment.name }}
                                                        {{ comment.message }}
                                                    </div>
                                                </div>
                                            </v-window-item>
                                            <v-window-item value="members">
                                                <div v-for="member in members">
                                                    <!-- <img :src="member.src" /> -->
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
import { activityStore } from "../stores/activity.js";
import { userStore } from "../stores/user"

export default {
    components: {
        NavBar,
        SideBar,
        ButtonGoBack,
    },
    data: () => ({
        tab: null,
        activityStore: activityStore(),
        userStore: userStore(),
        users: [],
        user: {},
        activity: {},
        comments: [],
        newComment: "",
        members: [],
    }),
    created() {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.activity = this.activityStore.getActivityById(this.$route.params.activityId);
        this.users = this.userStore.getUsers;
        this.comments = this.activity.comments;
        for (const memberId in this.activity.membersId) {
            this.members.push(this.users.find(user => user.id == memberId));
        }

    },
    methods: {
        like(comment) {
            if (!(comment.likesDislikes.likes.indexOf(this.user.id) != -1)) {
                comment.likesDislikes.likes.push(this.user.id);
                if ((comment.likesDislikes.dislikes.indexOf(this.user.id) != -1)) {
                    comment.likesDislikes.dislikes.splice(comment.likesDislikes.dislikes.indexOf(this.user.id), 1)
                }
            } else {
                comment.likesDislikes.likes.splice(comment.likesDislikes.likes.indexOf(this.user.id), 1)
            }
            const index = this.comments.findIndex(commentIndex => commentIndex.id == comment.id)
            this.comments[index] = comment
            this.update()
        },

        dislike(comment) {
            if (!(comment.likesDislikes.dislikes.indexOf(this.user.id) != -1)) {
                comment.likesDislikes.dislikes.push(this.user.id);
                if ((comment.likesDislikes.likes.indexOf(this.user.id) != -1)) {
                    comment.likesDislikes.likes.splice(comment.likesDislikes.likes.indexOf(this.user.id), 1)
                }
            } else {
                comment.likesDislikes.dislikes.splice(comment.likesDislikes.dislikes.indexOf(this.user.id), 1)
            }
            const index = this.comments.findIndex(commentIndex => commentIndex.id == comment.id)
            this.comments[index] = comment
            this.update()
        },

        addComment() {
            this.comments.splice(0,0,{
                messageId: this.comments[0].messageId + 1,
                name: this.user.username,
                message: this.newComment,
                likesDislikes: { likes: [], dislikes: [] },
            });
            this.newComment = "";
            this.update();
        },

        subscribe() {
            if (this.members.findIndex(member => member.id == this.user.id) == -1) {
                this.user.joined.activityId.push(this.activity.id)
                this.userStore.updateUser(this.user)
                this.members.push(this.user);
            } else {
                this.user.joined.activityId.splice(this.user.joined.activityId.indexOf(this.activity.id), 1)
                this.userStore.updateUser(this.user)
                this.members.splice(this.members.findIndex(member => member.id == this.user.id), 1);
            }
            this.update();
        },

        update() {
            console.log(this.members)
            this.activity.membersId = this.members.map(member => member.id)
            this.activity.comments = this.comments;
            this.activityStore.updateActivity(this.activity);
        }
    }
}
</script>

<style lang="scss" scoped>
    img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }
</style>