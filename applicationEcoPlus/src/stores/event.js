import { defineStore } from 'pinia'

let events

if (!JSON.parse(localStorage.getItem('events'))) {
  events = [
    {
      id: 0,
      userId: 0,
      title: 'Event1 3º date',
      subtitle: 'Event in the woods',
      image: 'https://sm.ign.com/ign_pt/screenshot/default/bumblebee-1280a_kck5.jpg',
      dateHour: {compare: 1674515139743, date:''},
      location: 'Custoias - Portugal',
      description: 'Recolher lixo',
      membersId: [0, 1],
      comments: [{ messageId: 0, userId: 0, message: 'Yau', likesDislikes: { likes: [], dislikes: [] } }],
      type: 'event'
    },
    {
      id: 1,
      userId: 0,
      title: 'Event2 1º date',
      subtitle: 'Event in the woods',
      image: 'https://sm.ign.com/ign_pt/screenshot/default/bumblebee-1280a_kck5.jpg',
      dateHour: {compare: 1674515139745, date:''},
      location: 'Senhora da Hora - Portugal',
      description: 'Recolher lixo',
      membersId: [0, 1],
      comments: [{ messageId: 0, userId: 1, message: 'Yau meu pau', likesDislikes: { likes: [0, 2], dislikes: [1] } }],
      type: 'event'
    }
  ]
  localStorage.setItem('events', JSON.stringify(events))
} else {
  events = JSON.parse(localStorage.getItem('events'));
}



export const eventStore = defineStore('event', {
  state: () => ({
    events: events
  }),
  getters: {
    getId: (state) => state.id,
    getTitle: (state) => state.title,
    getSubtitle: (state) => state.subtitle,
    getLocation: (state) => state.location,
    getDescription: (state) => state.description,
    getMembers: (state) => state.members,
    getComments: (state) => state.comments,
    getEventById: (state) =>
      (eventId) => state.events.find(event => event.id == eventId),
    getEvents: (state) => state.events
  },
  actions: {
    addEvent(userId, title, subtitle, image, location, description) {
      let today = new Date()
      this.events.push({
        id: this.events[this.events.length - 1].id + 1,
        userId: userId,
        title: title,
        subtitle: subtitle,
        image: image,
        dateHour: {compare: today.getTime(),
                   date: (new Date).toString().split(' ')},
        location: location,
        description: description,
        members: [],
        comments: [],
        type: 'event'
      })
    },
    updateEvent(event) {
      console.log("oi");
      const index = this.events.findIndex(eventIndex => eventIndex == event)
      events[index] = event;
      localStorage.setItem('events', JSON.stringify(events));
    }
  },
})