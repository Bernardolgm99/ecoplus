import { defineStore } from 'pinia'

let suggestions

if(!JSON.parse(localStorage.getItem('suggestions'))){
  suggestions = [
    {id: 0, 
    title: 'sugestion',
      userId: 0,
      description: 'meter bancos em cima de árvores para ver melhor o pôr do sol :3',
      location: 'School'
      }
  ]
} else {
  suggestions = JSON.parse(localStorage.getItem('suggestions'))
}

export const suggestionStore = defineStore('suggestion', {
  state: () => ({
    suggestions: suggestions
  }),
  getters: {
    getId: (state) => state.id,
    getTitle: (state) => state.title,
    getLocation: (state) => state.location,
    getUserId: (state) => state.userId,
    getDescription: (state) => state.description,
    getSugestionById: (state) =>
    (suggestionId) => state.suggestions.find(suggestion => suggestion.id == suggestionId)
  },
  actions: {
    addSuggestion(title, userId, description, location = "Dentro do Recinto Escolar"){
      this.suggestions.push({
        id: this.suggestions[this.suggestions.length - 1].id + 1,
        title: title,
        userId: userId,
        descripton: description,
        location: location
        }
      )
      localStorage.setItem('suggestions', JSON.stringify(this.suggestions))
    }
  },
})