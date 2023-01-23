import { defineStore } from 'pinia'

export const badgeStore = defineStore('badge', {
    state: () => ({
      badges: [
        {id: 0, name: 'Publique Ocorrências', desc: 'Procura pela tua escola e reporta 5 ocurências', img: '/src/assets/icons/badgesIcons/findOccurrenceTier1.svg', quantity: 5, type: 'occurrence'},
        {id: 1, name: 'Publique Ocorrências', desc: 'Procura pela tua escola e reporta 10 ocurências', img: '/src/assets/icons/badgesIcons/findOccurrenceTier2.svg', quantity: 10, type: 'occurrence'},
        {id: 2, name: 'Publique Ocorrências', desc: 'Procura pela tua escola e reporta 25 ocurências', img: '/src/assets/icons/badgesIcons/findOccurrenceTier3.svg', quantity: 25, type: 'occurrence'},
        {id: 3, name: 'Inscreve te em Eventos', desc: 'Inscrevete em 1 Eventos', img: '/src/assets/icons/badgesIcons/participateEventTier1.svg', quantity: 1, type: 'events'},
        {id: 4, name: 'Inscreve te em Eventos', desc: 'Inscrevete em 3 Eventos', img: '/src/assets/icons/badgesIcons/participateEventTier2.svg', quantity: 3, type: 'events'},
        {id: 5, name: 'Inscreve te em Eventos', desc: 'Inscrevete em 10 Eventos', img: '/src/assets/icons/badgesIcons/participateEventTier3.svg', quantity: 10, type: 'events'},
        {id: 6, name: 'Inscreve te em Atividades', desc: 'Inscrevete em 3 Atividades no plano deste ano', img: '/src/assets/icons/badgesIcons/participateActivityTier1.svg', quantity: 3, type: 'activity'},
        {id: 7, name: 'Inscreve te em Atividades', desc: 'Inscrevete em 5 Atividades no plano deste ano', img: '/src/assets/icons/badgesIcons/participateActivityTier2.svg', quantity: 5, type: 'activity'},
        {id: 8, name: 'Inscreve te em Atividades', desc: 'Inscrevete em 10 Atividades no plano deste ano', img: '/src/assets/icons/badgesIcons/participateActivityTier3.svg', quantity: 10, type: 'activity'},
        {id: 9, name: 'Crie Comentários', desc: 'Cria 25 comentários, seja em atividades, eventos ou ocorrências', img: '/src/assets/icons/badgesIcons/makeCommentsTier1.svg', quantity: 25, type: 'other'},
        {id: 10, name: 'Crie Comentários', desc: 'Cria 50 comentários, seja em atividades, eventos ou ocorrências', img: '/src/assets/icons/badgesIcons/makeCommentsTier2.svg', quantity: 50, type: 'other'}
    ]
    }),
    getters: {
        getBadgeById: (state) =>
        (badgeId) => state.badges.find(badge => badge.id == badgeId),
        getBadges: (state) => state.badges
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