import { defineStore } from 'pinia'

export const missionStore = defineStore('mission', {
  state: () => ({
    missions: [
      {id: 0, name: 'Arranjar folhas', quantity: 2, description: 'É o que é', duration:'unkown'}]
  }),
  getters: {
    getMissionById: (state) =>
    (missionId) => state.missions.find(mission => mission.id == missionId)
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
    }
  }
})