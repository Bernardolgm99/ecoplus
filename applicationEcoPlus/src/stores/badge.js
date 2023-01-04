import { defineStore } from 'pinia'

export const badgeStore = defineStore('badge', {
    state: () => ({
      badges: [
        {id: 1, name: 'Encontra Ocurências', desc: 'Procura pela tua escola e reporta ocurências', img: './assets', quantity: '5', aquired: true},
        {id: 2, name: 'Encontra Ocurências', desc: 'Procura pela tua escola e reporta ocurências', img: './assets', quantity: '10', aquired: true},
        {id: 3, name: 'Encontra Ocurências', desc: 'Procura pela tua escola e reporta ocurências', img: './assets', quantity: '15',aquired: false},
        {id: 4, name: 'Inscreve te em Atividades', desc: 'Inscrevete em Atividades no plano deste ano', img: './assets', quantity: '1', aquired: true},
        {id: 5, name: 'Inscreve te em Atividades', desc: 'Inscrevete em Atividades no plano deste ano', img: './assets', quantity: '3', aquired: false},
        {id: 6, name: 'Inscreve te em Atividades', desc: 'Inscrevete em Atividades no plano deste ano', img: './assets', quantity: '5', aquired: false},
    ]
    }),
    getters: {
        getBadgeById: (state) =>
        (badgeId) => state.badges.find(badge => badge.id == badgeId)
    },
    actions: {
        addBadge(name, image, description) {
            this.badges.push({
                id: this.badges[this.badges.length - 1].id + 1,
                name: name,
                image: image,
                description: description
            })
        }
    }
})