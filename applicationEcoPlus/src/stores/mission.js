import { defineStore } from 'pinia'

export const missionStore = defineStore('mission', {
  state: () => ({
    missions: [
      {id: 0, 
        name: 'Go to Campos2', 
        quantity: 2,
        description: 'Go to Campos2 and submit your location', 
        duration:'weekly'},
      {id: 1, 
        name: 'Report 3 Occurence/s', 
        quantity: 3, 
        description: 'Find and report occurence', 
        duration:'monthly'},
      {id: 2, 
        name: 'Participate in 1 Event/s', 
        quantity: 1, 
        description: 'Go to the events page and enroll in a event', 
        duration:'monthly'},
    ],
    icons: ['../assets/missionIcons/',
    '../assets/missionIcons/',
    '../assets/missionIcons/',
    '../assets/missionIcons/',
    '../assets/missionIcons/'],
    titles: ['Quests','Recent Posts','Badges','Ranking']
  }),
  getters: {
    getTitles: (state) => state.titles,
    getIcon: (state) => {
      let random = Math.floor(Math.random() * state.icons.length);
      return state.icons[random]
    },
    getMissions: (state) => state.missions,
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