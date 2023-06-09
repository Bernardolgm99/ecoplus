<template>
    <v-window-item value="comments">
        <div class="d-flex flex-column align-center">
            <div v-if="!Object.keys(user).length == 0" class="d-flex align-center w-100 px-5">
                <v-textarea label="Comment" rows="1" auto-grow bg-color="grey-lighten-2" color="green"
                    v-model="newComment"></v-textarea>
                <div class="d-flex h-100">
                    <v-btn color="green" class="ms-3 mb-6" icon="mdi-send" size="large" @click="addComment"></v-btn>
                </div>
            </div>
            <div class="d-flex mx-auto w-75" v-for="(comment, index) in comments">
                <div class="d-flex flex-column align-center">
                    <v-btn variant="text" icon="mdi-arrow-up-bold" size="x-large"
                        :color="comment.userRated.rated && comment.userRated.value ? 'green' : 'grey'"
                        @click="like(comment)">
                    </v-btn>
                    <span> {{ comment.rate.like - comment.rate.dislike }} </span>
                    <v-btn variant="text" icon="mdi-arrow-down-bold" size="x-large"
                        :color="comment.userRated.rated && !comment.userRated.value ? 'red' : 'grey'"
                        @click="dislike(comment)">
                    </v-btn>
                </div>
                <div class="d-flex flex-column justify-center w-100">
                    <div class="d-flex justify-space-between align-baseline">
                        <div class="d-flex">
                            <h2 class="mb-1">
                                {{ comment.user.username }}
                            </h2>
                            <span class="ms-2 mt-1">{{ timeAgo(comment.createdAt) }}</span>
                        </div>
                        <div v-if="comment.creator">
                            <div v-if="editMode !== index">
                                <v-btn color="transparent" class="ms-3 mb-6" icon="mdi-pencil" flat="true" size="small"
                                    @click="toggleEditComment(index)"></v-btn>
                                <v-btn color="transparent" class="ms-3 mb-6" icon="mdi-delete" flat="true" size="small"
                                    @click="removeComment(comment)"></v-btn>
                            </div>
                            <div v-else>
                                <v-btn color="red" variant="text" class="ms-3 mb-6" icon="mdi-close" flat="true"
                                    size="small" @click="toggleEditComment(index)"></v-btn>
                                <v-btn color="green" variant="text" class="ms-3 mb-6" icon="mdi-check" flat="true"
                                    size="small" @click="editComment(comment)"></v-btn>
                            </div>
                        </div>
                    </div>
                    <div v-if="editMode !== index" class="d-flex flex-column">
                        <p class="mt-1">
                            {{ comment.description }}
                        </p>
                        <span v-if="comment.edited" class="mt-2 mb-5 align-self-end">(edited)</span>
                    </div>
                    <div v-else>
                        <v-textarea label="Comment" rows="2" auto-grow bg-color="grey-lighten-2" color="green"
                            v-model="editingComment"></v-textarea>
                    </div>
                </div>
            </div>
            <span color="grey" class='align-self-center clickable' @click="viewMore">- view more -</span>
        </div>
    </v-window-item>
</template>

<script>
import { commentStore } from "../stores/comment.js";

export default {
    props: {
        id: {
            type: Number,
        },
        type: {
            type: String,
        },
        user: {
            type: Object,
        }
    },
    data() {
        return {
            commentStore: commentStore(),
            comments: [],
            newComment: "",
            editMode: undefined,
            editingComment: "",
        }
    },
    async created() {
        this.update();
    },
    methods: {
        async like(comment) {
            if (comment.userRated.value === true) {
                //delete
                await this.commentStore.likeComment(comment.id, null);
                this.update(false);
            } else {
                //put
                await this.commentStore.likeComment(comment.id, true);
                this.update(false);
            }
        },

        async dislike(comment) {
            if (comment.userRated.value === false) {
                //delete
                await this.commentStore.likeComment(comment.id, null);
                await this.update(false);
            } else {
                await this.commentStore.likeComment(comment.id, false);
                //put
                await this.update(false);
            }
        },

        async addComment() {
            await this.commentStore.addComment(this.type, this.id, this.newComment);
            this.update(false, 1);
        },

        async removeComment(comment) {
            await this.commentStore.removeComment(comment.id);
            this.update(false, -1);
        },

        toggleEditComment(index) {
            if (index === this.editMode) {
                this.editMode = undefined;
            } else {
                this.editMode = index;
                this.editingComment = this.comments[index].description;
            }
        },

        async editComment(comment) {
            await this.commentStore.editComment(comment.id, this.editingComment);
            this.editMode = undefined;
            this.update(false);
        },

        async viewMore() {
            this.update(true)
        },

        async update(pagination = true, evaluation = 0) {
            await this.commentStore.fetchAllComments(this.type, this.id, pagination, evaluation);
            this.comments = await this.commentStore.getComments;
        },

        timeAgo(dateString) {
            const currentDate = new Date();
            const pastDate = new Date(dateString);
            const timeDiff = currentDate - pastDate;
            const seconds = Math.floor(timeDiff / 1000);

            if (seconds < 60) {
                return seconds + " seconds ago";
            }

            const minutes = Math.floor(seconds / 60);

            if (minutes < 60) {
                return minutes + " minutes ago";
            }

            const hours = Math.floor(minutes / 60);

            if (hours < 24) {
                return hours + " hours ago";
            }

            const days = Math.floor(hours / 24);

            if (days < 30) {
                return days + " days ago";
            }

            const months = Math.floor(days / 30);

            if (months < 12) {
                return months + " months ago";
            }

            const years = Math.floor(months / 12);

            return years + " years ago";
        },
    },
}
</script>

<style lang="scss" scoped></style>