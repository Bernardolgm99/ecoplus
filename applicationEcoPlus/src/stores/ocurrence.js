import { defineStore } from 'pinia'

export const occurrenceStore = defineStore('occurrence', {
  state: () => ({
    occurrences: [
      {id: 0, 
      title: 'occurrence',
        location: 'Vila do Conde, Porto, Portugal',
        dateHour: {date: '12/12/2022', hour: '16:48'},
        locationDescription: 'Perto do rio',
        description: 'Tem aguinha o rio :)'
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
    (occurrenceId) => state.occurrences.find(occurrence => occurrence.id == occurrenceId)
  },
  actions: {
    addOccurrence(title, location, dateHour, locationDescription, description){
      this.users.push({
        id: this.users[this.users.length - 1].id + 1,
        title: title,
        location: location,
        dateHour: dateHour,
        locationDescription: locationDescription,
        descripton: description
        }
      )
    }
  },
})