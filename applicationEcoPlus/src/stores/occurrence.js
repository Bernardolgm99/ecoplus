import { defineStore } from 'pinia'

export const occurrenceStore = defineStore('occurrence', {
  state: () => ({
    occurrences: [
      {id: 0,
        userId: 0, 
      title: 'occurrence1 2º date',
        location: 'Vila do Conde, Porto, Portugal',
        image: 'https://sm.ign.com/ign_pt/screenshot/default/bumblebee-1280a_kck5.jpg',
        dateHour: {date: '20220525', hour: '1228'},
        locationDescription: 'Perto do rio',
        description: 'Tem aguinha o rio :)',
        comments: [{id: 0, user: 0, comment: 'Yau', classification: 45}],
        type: 'occurrence'
        },
        {id: 1, 
          userId: 1,
          title: 'occurrence 4º date',
          location: 'Rio Tinto, Porto, Portugal',
          image: 'https://sm.ign.com/ign_pt/screenshot/default/bumblebee-1280a_kck5.jpg',
          dateHour: {date: '20220510', hour: '1045'},
          locationDescription: 'Perto do rio',
          description: 'Tem aguinha o rio :)',
          comments: [{id: 0, user: 1, comment: 'Yau', classification: 45}],
          type: 'occurrence'
        }
    ]
  }),
  getters: {
    getId: (state) => state.id,
    getTitle: (state) => state.title,
    getLocation: (state) => state.location,
    getDateHour: (state) => state.dateHour,
    getLocationDescription: (state) => state.locationDescription,
    getDescription: (state) => state.description,
    getOccurrenceById: (state) =>
    (occurrenceId) => state.occurrences.find(occurrence => occurrence.id == occurrenceId),
    getOccurrences: (state) => state.occurrences,
  },
  actions: {
    addOccurrence(userId, title, location, locationDescription, description){
      this.occurrences.push({
        id: this.occurrences[this.occurrences.length - 1].id + 1,
        userId: userId,
        title: title,
        location: location,
        image: '',
        dateHour: {date: today.getFullYear() + "" + today.getMonth() + "" + today.getDate(),
                   hour: today.getHours() + "" + today.getMinutes() + "" + today.getSeconds()},
        locationDescription: locationDescription,
        descripton: description,
        type: 'occurrence'
        }
      )
    }
  },
})