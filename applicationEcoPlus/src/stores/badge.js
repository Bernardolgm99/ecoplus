import { defineStore } from 'pinia'
import API from '../../config'

export const badgeStore = defineStore('badge', {
    state: () => ({
      badges: []
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
        },
        updateBadges(){
            localStorage.setItem('badges', JSON.stringify(this.badges));
        },
        async fetchBadges(){
            try {
                const response = await fetch(API + '/badges');
                if (response.ok) //TRUE if response status code in the range 200-299
                    this.badges = await response.json(); // parse the response as JSON
                else
                    alert("HTTP error: " + response.status)
            }
            catch (e) {
                throw Error(e)
            }
        }
    }
})