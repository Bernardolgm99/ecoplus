import { defineStore } from 'pinia'

export const eventStore = defineStore('event', {
  state: () => ({
    events: [
      {id: 0, 
      userId: 0,
      title: 'Event1 3º date',
      subtitle: 'Event in the woods',
      image: 'https://sm.ign.com/ign_pt/screenshot/default/bumblebee-1280a_kck5.jpg', 
      dateHour: 2200000000,
      location: 'Custoias - Portugal', 
      description: 'Recolher lixo', 
      membersId:[0, 1, 2, 4, 8],
      comments: [{id: 0, user: 1, comment: 'Yau', classification: 45}],
      type: 'event'
      },
      {id: 1, 
      title: 'Event2 1º date',
      subtitle: 'Event in the woods',
      image: 'https://sm.ign.com/ign_pt/screenshot/default/bumblebee-1280a_kck5.jpg', 
      dateHour: 2300000000,
      location: 'Senhora da Hora - Portugal', 
      description: 'Recolher lixo', 
      membersId:[0, 1, 2, 4, 8],
      comments: [{id: 0, user: 0, comment: 'Yau', classification: 45}],
      type: 'event'
      }
    ]
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
    addEvent(userId, title, subtitle, image, location, description, members, comments){
      let today = new Date()
      this.events.push({
        id: this.events[this.events.length - 1].id + 1,
        userId: userId,
        title: title,
        subtitle: subtitle,
        image: image,
        dateHour: today.getTime(),
        location: location,
        description: description,
        members: members,
        comments: comments,
        type: 'event'
        }
      )
    }
  },
})