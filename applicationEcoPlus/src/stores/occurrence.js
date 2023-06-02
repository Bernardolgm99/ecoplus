import { defineStore } from 'pinia'
import axios from "axios"

let occurrences

if (!JSON.parse(localStorage.getItem('occurrences'))) {
  occurrences = [
    {
      id: 0,
      userId: 0,
      title: 'Trash in front of the ESMAD',
      location: 'Vila do Conde, Portugal',
      image: '/src/assets/images/example3.jpg',
      dateHour: { compare: 1674515139744, date: '' },
      locationDescription: 'Neer to the bridge',
      description: 'Amount of shoes and plastic',
      comments: [{ messageId: 0, userId: 0, message: 'I gonna call the town hall', likesDislikes: { likes: [0, 2], dislikes: [1] } }],
      type: 'occurrence',
      stage: 'Doing',
    },
    {
      id: 1,
      userId: 1,
      title: 'occurrence 4º date',
      location: 'Rio Tinto, Porto, Portugal',
      image: '/src/assets/images/sink.jpg',
      dateHour: { compare: 1674515139742, date: '' },
      locationDescription: 'Second floor of Block B',
      description: 'It\'s broked like a week a go',
      comments: [],
      type: 'occurrence',
      stage: 'Done',
    },
  ]
  localStorage.setItem('occurrences', JSON.stringify(occurrences))
} else {
  occurrences = JSON.parse(localStorage.getItem('occurrences'))
}

export const occurrenceStore = defineStore('occurrence', {
  state: () => ({
    occurrences: /* occurrences */ []
  }),
  getters: {
    getId: (state) => state.id,
    getTitle: (state) => state.title,
    getLocation: (state) => state.location,
    getDateHour: (state) => state.dateHour,
    getLocationDescription: (state) => state.locationDescription,
    getDescription: (state) => state.description,
    getOccurrenceById: (state) =>
      (occurrenceId) => state.occurrences.find(occurrence => occurrence.id == occurrenceId),
    getOccurrence: (state) => state.occurrences,
  },
  actions: {
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
    updateOccurrences() {
      localStorage.setItem('occurrences', JSON.stringify(this.occurrences))
    },
    async fetchOccurrences(){ 
      console.log("start fetch");
      
      try {
        const response = await fetch('http://localhost:3000/occurrences');
        if (response.ok) { //TRUE if response status code in the range 200-299
          this.occurrences = await response.json(); // parse the response as JSON
        }
        else
          alert("HTTP error: " + response.status)
      }
      catch (e) {
        throw Error(e)
      }
      console.log('end fetch');
    }
  },
})