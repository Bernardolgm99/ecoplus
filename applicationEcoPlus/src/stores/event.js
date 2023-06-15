import { defineStore } from 'pinia'
import axios from 'axios';
import API from '../../config'
import { cookie } from '../utilities/cookieFunctions';



export const eventStore = defineStore('event', {
  state: () => ({
    events: [],
    event: {},
    page: 0,
    limit: 3
  }),
  getters: {
    getEvents: (state) => state.events,
    getEvent: (state) => state.event
  },
  actions: {
    async fetchAllEvents() {
      await axios.get(`${API}/events?limit=${this.limit}&page=${this.page}`)
      .then((response) => { 
        this.events = this.events.concat(response.data); 
        this.page += response.data.length;
      });
    },

    async fetchEventId(id) {
      await axios.get(`${API}/events/${id}`).then((response) => { this.event = response.data; });
    },

    addEvent(userId, title, subtitle, image, location, description) {
    },

    async subscribe(eventId, areadySubscribed) {
      if (!areadySubscribed) {
        await axios.post(`${API}/events/${eventId}/users`, {}, {
          headers: {
            Authorization: cookie.getCookie("token")
          }
        }).then((response) => {
          this.event = response.data
        })
      }
      else {
        await axios.delete(`${API}/events/${eventId}/users`, {
          headers: {
            Authorization: cookie.getCookie("token")
          }
        }).then((response) => {
          this.event = response.data
        })
      }
    },

    updateEvent(event) {
    },
    updateEvents() {
    },
  },
})