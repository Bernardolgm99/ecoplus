import { defineStore } from 'pinia'
import API from '../../config'

export const occurrenceStore = defineStore('occurrence', {
  state: () => ({
    occurrences: []
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
    getOccurrence: (state) => state.occurrences,
  },
  actions: {
    addOccurrence(userId, title, image, location, locationDescription, description) {
      let today = new Date()
      this.occurrences.push({
        id: this.occurrences[this.occurrences.length - 1].id + 1,
        userId: userId,
        title: title,
        location: location,
        image: image,
        dateHour: {
          compare: today.getTime(),
          date: (new Date).toString().split(' ')
        },
        locationDescription: locationDescription,
        description: description,
        comments: [],
        type: 'occurrence',
        stage: 'To Do',
      }
      )
      localStorage.setItem('occurrences', JSON.stringify(this.occurrences))
    },
    updateOccurrences() {
      localStorage.setItem('occurrences', JSON.stringify(this.occurrences))
    },
    async fetchOccurrences(){ 
      try {
        const response = await fetch(API + '/occurrences');
        if (response.ok) { //TRUE if response status code in the range 200-299
          this.occurrences = await response.json(); // parse the response as JSON
        }
        else
          alert("HTTP error: " + response.status)
      }
      catch (e) {
        throw Error(e)
      }
    }
  },
})