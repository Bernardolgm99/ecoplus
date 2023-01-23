import { defineStore } from 'pinia'


let mission

if(!JSON.parse(localStorage.getItem('mission'))) {
  mission =  { missions: [
    {id: 0, 
      name: 'Go to Campos2', 
      quantity: 1,
      description: 'Go to Campos2 and submit your location', 
      duration:'weekly',
      img: '/src/assets/icons/missionIcons/apple.png'
    },
    {id: 1, 
      name: 'Report 3 Occurence/s', 
      quantity: 3, 
      description: 'Find and report occurence', 
      duration:'monthly',
      img: '/src/assets/icons/missionIcons/tree.png'
    },
    {id: 2, 
      name: 'Participate in 1 Event/s', 
      quantity: 1, 
      description: 'Go to the events page and enroll in a event', 
      duration:'monthly',
      img: '/src/assets/icons/missionIcons/herb.png'
    }],
    icons: ['/src/assets/icons/missionIcons/apple.png',
      '/src/assets/icons/missionIcons/fallen-leaf.png',
      '/src/assets/icons/missionIcons/herb.png',
      '/src/assets/icons/missionIcons/tree.png',
      '/src/assets/icons/missionIcons/recycle.png',
      '/src/assets/icons/missionIcons/sun.png']
    }
} else {
  mission = JSON.parse(localStorage.getItem('mission'))
}

localStorage.setItem('mission', JSON.stringify(mission))

export const missionStore = defineStore('mission', {
  state: () => ({
    mission: mission
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
    }  
  }
})