import { defineStore } from 'pinia'
import { cookie } from '../utilities/cookieFunctions'
import axios from 'axios';
import API from '../../config'


export const suggestionStore = defineStore('suggestion', {
  state: () => ({
    suggestions: []
  }),
  getters: {
    getSuggestions: async (state) => await state.suggestions
  },
  actions: {
    async addSuggestion(suggestion) {
      return await axios.post(`${API}/suggestions`, suggestion, {
        headers: {
          Authorization: cookie.getCookie("token")
        }
      }).then(response => { if (response.data) return true; else return false; });
    },

    async fetchAllSuggestions() {
      await axios.get(`${API}/suggestions`, {
        headers: { Authorization: cookie.getCookie("token") }
      }).then(result => { this.suggestions = result.data; })
    }
  }
})