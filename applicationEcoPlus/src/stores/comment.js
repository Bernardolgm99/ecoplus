import { defineStore } from 'pinia'
import axios from 'axios';
import API from '../../config'
import { cookie } from '../utilities/cookieFunctions';

export const commentStore = defineStore('comment', {
    state: () => ({
        comments: [],
        comment: {},
        page: -5,
        limit: 5
    }),
    getters: {
        getComments: async (state) => await state.comments,
        getComment: async (state) => await state.comment
    },
    actions: {
        async fetchAllComments(type, typeId, pagination = true, evaluation = 0) {
            if (pagination) {
                this.page += this.limit;
                if(this.page < 0) this.page = 0;
                await axios.get(`${API}/${type}/${typeId}/comments?page=${this.page}&limit=${this.limit}`, {
                    headers: {
                        Authorization: cookie.getCookie("token")
                    }
                }).then((response) => { this.comments = this.comments.concat(response.data); });
            } else {
                this.page += evaluation;
                await axios.get(`${API}/${type}/${typeId}/comments?page=0&limit=${this.page + this.limit}`, {
                    headers: {
                        Authorization: cookie.getCookie("token")
                    }
                }).then((response) => { this.comments = response.data; });
            }
        },

        async fetchCommentId(id) {
            await axios.get(`${API}/comments/${id}`).then((response) => { this.comment = response.data; });
        },

        async addComment(type, typeId, comment) {
            await axios.post(`${API}/${type}/${typeId}/comments`, { description: comment }, {
                headers: {
                    Authorization: cookie.getCookie("token")
                }
            })
        },

        async likeComment(id, like) {
            if (like === null) {
                await axios.delete(`${API}/comments/${id}/rating`, {
                    headers: {
                        Authorization: cookie.getCookie("token")
                    }
                })
            } else {
                await axios.put(`${API}/comments/${id}/rating`, { rating: like }, {
                    headers: {
                        Authorization: cookie.getCookie("token")
                    }
                })
            }
        },

        async removeComment(id) {
            await axios.delete(`${API}/comments/${id}`, {
                headers: {
                    Authorization: cookie.getCookie("token")
                }
            })
        },

        async editComment(id, editedComment) {
            await axios.put(`${API}/comments/${id}`, { description: editedComment }, {
                headers: {
                    Authorization: cookie.getCookie("token")
                }
            })
        }
    },
})