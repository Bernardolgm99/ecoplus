import { defineStore } from 'pinia'
import axios from 'axios';
import API from '../../config'
import { cookie } from '../utilities/cookieFunctions';



export const eventOccurrenceStore = defineStore('eventOccurrence', {
  state: () => ({
    eventsOccurrences: [],
    page: 0,
    limit: 3,
    createdAt: new Date().toISOString()
  }),
  getters: {
    getEventsOccurrences: (state) => state.eventsOccurrences,
  },
  actions: {
    async fetchAllEventsOccurrences(pagination = false) {
      await axios.get(`${API}/eventsOccurrences?limit=${this.limit}&page=${this.page}&createdAt=${this.createdAt}`)
      .then((response) => { 
        this.eventsOccurrences = this.eventsOccurrences.concat(response.data);
        this.createdAt = this.eventsOccurrences[this.eventsOccurrences.length-1].createdAt
      });
    },
  },
})