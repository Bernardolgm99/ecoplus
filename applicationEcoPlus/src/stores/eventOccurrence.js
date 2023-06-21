import { defineStore } from 'pinia'
import axios from 'axios';
import API from '../../config'
import { cookie } from '../utilities/cookieFunctions';



export const eventOccurrenceStore = defineStore('eventOccurrence', {
  state: () => ({
    eventsOccurrences: [],
    eventsOccurrencesHome: [],
    page: 0,
    limit: 3,
    createdAt: new Date().toISOString()
  }),
  getters: {
    getEventsOccurrences: (state) => state.eventsOccurrences,
    getEventsOccurrencesHome: (state) => state.eventsOccurrencesHome,
  },
  actions: {
    async fetchAllEventsOccurrences(pagination = false, limit = 3) {
      if (limit) this.limit = limit;
      await axios.get(`${API}/eventsOccurrences?limit=${this.limit}&page=${this.page}&createdAt=${this.createdAt}`)
      .then((response) => { 
        this.eventsOccurrences = this.eventsOccurrences.concat(response.data);
        this.createdAt = this.eventsOccurrences[this.eventsOccurrences.length-1].createdAt
      });
    },

    async fetchAllEventsOccurrencesHome(pagination = false, limit = 3) {
      if (limit) this.limit = limit;
      await axios.get(`${API}/eventsOccurrences?limit=${this.limit}&page=${this.page}&createdAt=${this.createdAt}`)
      .then((response) => { 
        this.eventsOccurrencesHome = this.eventsOccurrencesHome.concat(response.data);
        this.createdAt = this.eventsOccurrencesHome[this.eventsOccurrencesHome.length-1].createdAt
      });
    },
  },
})