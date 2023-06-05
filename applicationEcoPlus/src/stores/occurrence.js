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
    getOccurrences: (state) => state.occurrences,
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
    async fetchOccurrences(token){ 
      try {
        const request = new Request(API + '/occurrences', {
          method: 'GET',
          headers: {
            Authorization: token
          }
        });
        let response = await fetch(request)
        .then((response) => {return response.json()})
        .then(result => {return result})
        .catch(error => {
          console.error('Error:', error);
        })
        this.occurrences = response;
      }
      catch (e) {
        throw Error(e)
      }
    }
  },
})