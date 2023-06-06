import { defineStore } from 'pinia'
import API from '../../config'
import { cookie } from '../utilities/cookieFunctions'

export const occurrenceStore = defineStore('occurrence', {
  state: () => ({
    occurrences: [],
    occurrence: {},
    page: 0,
    limit: 2
  }),
  getters: {
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
    async fetchOccurrences(){ 
      let token = cookie.getCookie('token')
      try {
        const request = new Request(`${API}/occurrences?limit=${this.limit}&page=${this.page}`, {
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
        this.occurrences = this.occurrences.concat(response);
        this.page += this.limit;
      }
      catch (e) {
        throw Error(e)
      }
    }
  },
})