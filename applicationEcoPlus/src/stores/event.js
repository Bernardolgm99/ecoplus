import { defineStore } from 'pinia'

export const eventStore = defineStore('event', {
  state: () => ({
    events: [
      {id: 0, 
      title: 'Event',
      subtitle: 'Event in the woods', 
      location: 'Porto - Portugal', 
      description: 'Recolher lixo', 
      membersId:[0, 1, 2, 4, 8],
      comments: [{id: 0, user: 0, comment: 'Yau', classification: 45}]
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
    (eventId) => state.events.find(event => event.id == eventId)
  },
  actions: {
    addEvent(title, subtitle, location, description, members, comments){
      this.users.push({
        id: this.users[this.users.length - 1].id + 1,
        title: title,
        subtitle: subtitle,
        location: location,
        description: description,
        members: members,
        comments: comments,
        }
      )
    }
  },
})