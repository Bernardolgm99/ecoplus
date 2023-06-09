import { defineStore } from 'pinia'
import axios from 'axios';
import API from '../../config'

export const schoolStore = defineStore('schools', {
  state: () => ({
    schools: [],
  }),
  getters: {
    getSchools: (state) => state.schools,
  },
  actions: {
    async fetchAllSchools() {
        await axios.get(`${API}/schools`).then((response) => { this.schools = response.data; });
    },
    async fetchSchool(id) {
        try {
            let response = await axios.get(`${API}/schools/${id}`).then((response) => { return response.data; });
            return response;
        }
        catch (err) {
            console.log(err);
        }
    }
  },
})