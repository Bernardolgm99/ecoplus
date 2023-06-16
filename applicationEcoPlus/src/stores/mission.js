import { defineStore } from 'pinia'
import { cookie } from '../utilities/cookieFunctions'
import API from '../../config'

export const missionStore = defineStore('mission', {
  state: () => ({
    userMissions: []
  }),
  getters: {
    getMissions: (state) => state.userMissions,
    getMissionById: (state) =>
      (missionId) => state.userMissions.find(element => element.id == missionId)
  },
  actions: {
    async fetchMissions(userId) {
      try {
        let token = cookie.getCookie('token');
        if (token) {
          let response = await fetch(API + '/users/' + userId + '/missions', {
            method: 'GET'
          }).then((response) => {
            if (!response.ok) {
              throw new Error('Request failed');
            }
            return response.json();
          }).then(result => {
            this.userMissions = result
            return result
          })
            .catch(error => { console.error('Error:', error); })

        } else {
          console.log("not logged in")
          return false;
        }
      }
      catch (e) {
        throw Error(e)
      }
    }
  }
})