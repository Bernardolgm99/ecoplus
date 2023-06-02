import { defineStore } from 'pinia'
import axios from 'axios';
import API from '../../config'



export const eventStore = defineStore('event', {
  state: () => ({
    events: [],
    event: {},
    page: 0
  }),
  getters: {
    getEvents: (state) => state.events,
    getEvent: (state) => state.event
  },
  actions: {
    async fetchAllEvents() {
      await axios.get(`${API}/events?limit=2&page=${this.page}`).then((response) => { this.events = response.data; });
      this.page += 1;
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