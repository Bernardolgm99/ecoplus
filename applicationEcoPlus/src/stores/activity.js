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
    addActivity(title, diagnosis, schedule, description, objectives, resources, participants, evaluationInd, evaluationInst, image) {
      this.activities.push({
        id: activities[this.activities.length - 1].id + 1,
        title: title,
        diagnosis: diagnosis,
        schedule: schedule,
        description: description,
        objectives: objectives,
        resources: resources,
        participants: participants,
        evaluationInd: evaluationInd,
        evaluationInst: evaluationInst,
        image: image,
        comments: [],
        membersId: [],
      });
    },

    updateActivities() {
      localStorage.setItem('activities', JSON.stringify(this.activities));
    },
    updateActivity(activity) {
      const index = this.activities.findIndex(activityIndex => activityIndex == activity)
      activities[index] = activity;
    },

    async fetchAllActivities() {
      await axios.get(`${API}/activities?limit=${this.limit}&page=${this.page}`)
      .then((response) => { 
        this.activities = this.activities.concat(response.data); 
        this.page += response.data.length;
      });
      console.log(this.activities.length);
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
  }
})