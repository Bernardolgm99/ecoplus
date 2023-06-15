import { defineStore } from 'pinia'
import axios from 'axios';
import API from '../../config'
import { cookie } from '../utilities/cookieFunctions';



export const eventOccurrenceStore = defineStore('eventOccurrence', {
  state: () => ({
    eventsOccurrences: [],
    page: 0,
    limit: 3
  }),
  getters: {
    getEventsOccurrences: (state) => state.eventsOccurrences,
  },
  actions: {
    async fetchAllEventsOccurrences(pagination = false) {
      console.log("teste", this.page, this.limit)
      await axios.get(`${API}/eventsOccurrences?limit=${this.limit}&page=${this.page}`).then((response) => { this.eventsOccurrences = this.eventsOccurrences.concat(response.data); });
      console.log(this.eventsOccurrences);
      this.page += this.limit;
    },
  },
})