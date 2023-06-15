import { defineStore } from 'pinia'

export const missionStore = defineStore('mission', {
  state: () => ({
    mission: []
  }),
  getters: {
    getIcon: (state) => {
      let random = Math.floor(Math.random() * state.mission.icons.length);
      state.mission.imgNum = state.mission.icons[random]
    },
    getMissions: (state) => state.mission.missions,
    getMissionById: (state) =>
    (missionId) => state.mission.missions.find(mission => mission.id == missionId)
  },
  actions: {
    addMission(name, quantity, description, duration) {
        this.missions.push({
            id: this.missions[this.missions.length - 1].id + 1,
            name: name,
            qantity: quantity,
            description: description,
            duration: duration
        })
    },
    async fetchMissions(userId) {
      try {
        let token = cookie.getCookie('token');
        if (token) {
          let response = await fetch(API + '/users/' + userId + '/missions', {
            method: 'GET',
            headers: {
              Authorization: token
            }
          }).then((response) => {
            if (!response.ok) {
              throw new Error('Request failed');
            }
            return response.json();
          }).then(result => { return result })
            .catch(error => {
              console.error('Error:', error);
            })
          this.user = response.msg;
          return response.msg
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