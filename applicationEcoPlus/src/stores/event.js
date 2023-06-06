import { defineStore } from 'pinia'
import axios from 'axios';
import API from '../../config'



export const eventStore = defineStore('event', {
  state: () => ({
    events: [],
    event: {},
    page: 0,
    limit: 2
  }),
  getters: {
    getEvents: (state) => state.events,
    getEvent: (state) => state.event
  },
  actions: {
    async fetchAllEvents(pagination = false) {
      await axios.get(`${API}/events?limit=${this.limit}&page=${this.page}`).then((response) => { this.events = this.events.concat(response.data); });
      this.page += this.limit;
    },
    
    async fetchEventId(id) {
      await axios.get(`${API}/events/${id}`).then((response) => { this.event = response.data; });
    },

    addEvent(userId, title, subtitle, image, location, description) {
    },
    updateEvent(event) {
    },
    updateEvents() {
    },
  },
})