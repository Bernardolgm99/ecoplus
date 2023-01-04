import { defineStore } from 'pinia'

export const sugestionStore = defineStore('sugestion', {
  state: () => ({
    sugestions: [
      {id: 0, 
      title: 'sugestion',
        userId: 0,
        description: 'meter bancos em cima de árvores para ver melhor o pôr do sol :3',
        location: 'School'
        }
    ]
  }),
  getters: {
    getId: (state) => state.id,
    getTitle: (state) => state.title,
    getLocation: (state) => state.location,
    getUserId: (state) => state.userId,
    getDescription: (state) => state.description,
    getSugestionById: (state) =>
    (sugestionId) => state.sugestions.find(sugestion => sugestion.id == sugestionId)
  },
  actions: {
    addSugestion(title, userId, location = "Dentro do Recinto Escolar", description){
      this.users.push({
        id: this.users[this.users.length - 1].id + 1,
        title: title,
        userId: userId,
        location: location,
        descripton: description
        }
      )
    }
  },
})