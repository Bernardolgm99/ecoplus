import { defineStore } from 'pinia'

let occurrences

if (!JSON.parse(localStorage.getItem('occurrences'))) {
  occurrences = [
    {
      id: 0,
      userId: 0,
      title: 'occurrence1 2º date',
      location: 'Vila do Conde, Porto, Portugal',
      image: 'https://sm.ign.com/ign_pt/screenshot/default/bumblebee-1280a_kck5.jpg',
      dateHour: {compare: 1674515139744, date:''},
      locationDescription: 'Perto do rio',
      description: 'Tem aguinha o rio :)',
      comments: [{ messageId: 0, userId: 0, message: 'Yau', classification: 45 }],
      type: 'occurrence'
    },
    {
      id: 1,
      userId: 1,
      title: 'occurrence 4º date',
      location: 'Rio Tinto, Porto, Portugal',
      image: 'https://sm.ign.com/ign_pt/screenshot/default/bumblebee-1280a_kck5.jpg',
      dateHour: {compare: 1674515139742, date: ''},
      locationDescription: 'Perto do rio',
      description: 'Tem aguinha o rio :)',
      comments: [{ messageId: 0, userId: 1, message: 'Yau', classification: 45 }],
      type: 'occurrence'
    }
  ]
  localStorage.setItem('occurrences', JSON.stringify(occurrences))
} else {
  occurrences = JSON.parse(localStorage.getItem('occurrences'))
}

export const occurrenceStore = defineStore('occurrence', {
  state: () => ({
    occurrences: occurrences
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
    getOccurrences: (state) => state.occurrences,
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
        dateHour: {compare: today.getTime(),
                   date: (new Date).toString().split(' ')},
        locationDescription: locationDescription,
        descripton: description,
        comments: [],
        type: 'occurrence'
      }
      )
      localStorage.setItem('occurrences', JSON.stringify(this.occurrences))
    }
  },
})