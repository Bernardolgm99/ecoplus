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
    async fetchCreateOccurrence(name, description, locationDescription, location, image){

      // Needed to upload an image
      // This code can be used as an example to upload an image with the code in PostOccurrenceView from 115 to 145
      const formData = new FormData();
      formData.append('name', name)
      formData.append('description', description)
      formData.append('locationDescription', locationDescription)
      formData.append('location', location)
      formData.append('image', image)

      const occurrence = {
        name: name,
        description: description,
        locationDescription: locationDescription,
        location: location,
        image: image
      }

      await axios.post(`${API}/occurrences`, occurrence, {
                                                          headers: {
                                                            Authorization: cookie.getCookie('token'),
                                                            'Content-Type': 'multipart/form-data'
                                                          }
                                                        })

    },
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

    async fetchUpdateOccurrences(occurrenceId, status) {
      await axios.patch(`${API}/occurrences/${occurrenceId}`, status, {
        headers: {
          Authorization: cookie.getCookie('token')
        }
      })
    },

    async fetchOccurrences(limit = 3) {
      try {
        if (limit) this.limit = limit;
        await axios.get(`${API}/occurrences?limit=${this.limit}&page=${this.page}`, {
          headers: { Authorization: cookie.getCookie('token') }
        })
          .then((response) => {
            this.occurrences = this.occurrences.concat(response.data);
            this.page += response.data.length;
          });
      }
      catch (e) {
        throw Error(e)
      }
    },

    async fetchDelete(occurrenceId) {
      await axios.delete(`${API}/occurrences/${occurrenceId}`, {
        headers: {
          Authorization: cookie.getCookie('token')
        }
      })
    }

  },
})