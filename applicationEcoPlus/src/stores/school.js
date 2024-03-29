import { defineStore } from 'pinia'
import axios from 'axios';
import API from '../../config'

export const schoolStore = defineStore('schools', {
  state: () => ({
    schools: [],
  }),
  getters: {
    getSchools: (state) => state.schools,
    getSchoolByName: (state) => (schoolName) => state.schools.find(element => element.school == schoolName).id
  },
  actions: {
    async fetchAllSchools() {
        this.schools = await axios.get(`${API}/schools`).then((response) => { return response.data; });
        return this.schools;
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