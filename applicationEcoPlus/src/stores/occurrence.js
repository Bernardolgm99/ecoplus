import { defineStore } from 'pinia'
import axios from 'axios';
import API from '../../config'
import { cookie } from '../utilities/cookieFunctions'

export const occurrenceStore = defineStore('occurrence', {
  state: () => ({
    occurrences: [],
    occurrence: {},
    page: 0,
    limit: 3
  }),
  getters: {
    getOccurrences: (state) => state.occurrences,
    getOccurrence: (state) => state.occurrence
  },
  actions: {
    async fetchOccurrenceId(id) {
      await axios.get(`${API}/occurrences/${id}`).then((response) => { this.occurrence = response.data; });
    },

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
        await axios.get(`${API}/occurrences?limit=${this.limit}&page=${this.page}`)
        .then((response) => { 
          this.occurrences = this.occurrences.concat(response.data); 
          this.page += response.data.length;
        });
      }
      catch (e) {
        throw Error(e)
      }
    },
  },
})