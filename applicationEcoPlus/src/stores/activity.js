import { defineStore } from 'pinia'
import axios from 'axios';
import API from '../../config'
import { cookie } from '../utilities/cookieFunctions';



export const activityStore = defineStore('activity', {
  state: () => ({
    activities: [],
    activity:{},
    page: 0,
    limit: 100
  }),
  getters: {
    getActivities: (state) => state.activities,
    getActivity: (state) => state.activity,
  },
  actions: {
    async fetchAllActivities() {
      await axios.get(`${API}/activities?limit=${this.limit}&page=${this.page}`)
      .then((response) => { 
        this.activities = this.activities.concat(response.data); 
        this.page += response.data.length;
      });
    },

    async fetchActivityId(id) {
      await axios.get(`${API}/activities/${id}`).then((response) => { this.activity = response.data; });
    },

    async subscribe(activityId, areadySubscribed) {
      if (!areadySubscribed) {
        await axios.post(`${API}/activities/${activityId}/users`, {}, {
          headers: {
            Authorization: cookie.getCookie("token")
          }
        }).then((response) => {
          this.activity = response.data
        })
      }
      else {
        await axios.delete(`${API}/activities/${activityId}/users`, {
          headers: {
            Authorization: cookie.getCookie("token")
          }
        }).then((response) => {
          this.activity = response.data
        })
      }
    },

    async fetchDelete(activityId) {
      await axios.delete(`${API}/activities/${activityId}`, {
        headers: {
          Authorization: cookie.getCookie("token")
        }
      })
    }
  }
})