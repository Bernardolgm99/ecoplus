import { defineStore } from 'pinia'

export const badgeStore = defineStore('badge', {
    state: () => ({
      badges: [
        {id: 1, name: 'Encontra Ocurências', desc: 'Procura pela tua escola e reporta ocurências', img: '/src/assets', quantity: 5},
        {id: 2, name: 'Encontra Ocurências', desc: 'Procura pela tua escola e reporta ocurências', img: '/src/assets', quantity: 10},
        {id: 3, name: 'Encontra Ocurências', desc: 'Procura pela tua escola e reporta ocurências', img: '/src/assets', quantity: 15},
        {id: 4, name: 'Inscreve te em Atividades', desc: 'Inscrevete em Atividades no plano deste ano', img: '/src/assets/gadgesIcons/', quantity: 1},
        {id: 5, name: 'Inscreve te em Atividades', desc: 'Inscrevete em Atividades no plano deste ano', img: '/src/assets/gadgesIcons/', quantity: 3},
        {id: 6, name: 'Inscreve te em Atividades', desc: 'Inscrevete em Atividades no plano deste ano', img: '/src/assets/gadgesIcons/', quantity: 5},
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