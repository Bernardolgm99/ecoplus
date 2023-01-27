import { defineStore } from 'pinia'

let events

if (!JSON.parse(localStorage.getItem('events'))) {
  events = [
    {
      id: 0,
      userId: 0,
      title: 'Save the world',
      subtitle: 'Food collection of homeless people',
      image: '/src/assets/images/example1.jpg',
      dateHour: { compare: 1674515139743, date: '' },
      location: 'Custoias - Portugal',
      description: 'Nam eu quam augue. Suspendisse potenti. Donec blandit condimentum nibh quis rutrum. Donec nunc augue, imperdiet sit amet molestie ultricies, tempus vitae arcu. Aliquam quis nisi at ante varius rhoncus ut ac risus. Aenean sed odio consequat, sollicitudin risus sed, finibus turpis. Maecenas faucibus ipsum sed mi rhoncus, a tempor arcu cursus. Aenean urna augue, viverra ultricies diam ut, gravida viverra ligula. Nulla nec ipsum semper, vestibulum turpis vitae, pretium quam. Duis sed luctus libero. Donec semper pharetra massa, at scelerisque eros posuere nec. Duis nec iaculis lorem, eget fermentum magna.',
      membersId: [1, 2, 3, 0],
      comments: [{ messageId: 0, userId: 0, message: 'Let\'s go help, peoples', likesDislikes: { likes: [0, 1, 2, 3], dislikes: [] } }
        , { messageId: 1, userId: 2, message: 'For what?', likesDislikes: { likes: [], dislikes: [0, 1] } }],
      type: 'event'
    },
    {
      id: 1,
      userId: 1,
      title: 'Ecologic Games',
      subtitle: 'Pratice sport is healthy!!!',
      image: '/src/assets/images/example4.jpg',
      dateHour: { compare: 1674515139743, date: '' },
      location: 'Custoias - Portugal',
      description: 'Aenean pulvinar libero eget lectus aliquam, ut malesuada tellus volutpat. Quisque risus massa, imperdiet ut pulvinar vitae, imperdiet eget tortor. Cras molestie dolor sed augue facilisis, nec rhoncus quam ornare. In blandit libero diam, at tempor lectus ultricies sed. Suspendisse odio nisi, porta vitae condimentum eget, dictum a augue. Praesent id sem sodales tellus gravida semper. Aliquam erat volutpat.',
      membersId: [3, 0],
      comments: [{ messageId: 0, userId: 0, message: 'I would like to play!!', likesDislikes: { likes: [0, 1, 2, 3], dislikes: [] } }
        , { messageId: 1, userId: 0, message: 'I\'ll film it', likesDislikes: { likes: [1, 2], dislikes: [] } }],
      type: 'event'
    },
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
    getMembers: (state) => state.events.map(event => event.membersId),
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
        image: `/src/assets/images/${image}`,
        dateHour: {
          compare: today.getTime(),
          date: (new Date).toString().split(' ')
        },
        location: location,
        description: description,
        membersId: [],
        comments: [],
        type: 'event'
      })
      localStorage.setItem('events', JSON.stringify(this.events));
    },
    updateEvent(event) {
      const index = this.events.findIndex(eventIndex => eventIndex == event)
      events[index] = event;
      localStorage.setItem('events', JSON.stringify(events));
    },
    updateEvents() {
      localStorage.setItem('events', JSON.stringify(this.events));
    },
  },
})