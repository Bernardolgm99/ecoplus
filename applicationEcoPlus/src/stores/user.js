import { defineStore } from 'pinia'
import cookieFunctions from '../utilities/cookieFuntions'
import API from '../../config'

export const userStore = defineStore('user', {
  state: () => ({
    users: /* users */ []
  }),
  getters: {
    getUsers: (state) => state.users,
    getId: (state) => state.id,
    getUsername: (state) => state.username,
    getName: (state) => state.username,
    getEmail: (state) => state.username,
    getPassword: (state) => state.username,
    getSchool: (state) => state.username,
    getJoinedEvents: (state) => state.joined.eventId,
    getJoinedActivities: (state) => state.joined.activityId,
    getOccurrenceIds: (state) => state.occurrenceId,
    /* getUserChecked: (state) => (userName, userPw) => {
      let userNameChecked = state.users.find(user => user.username == userName)
      console.log(userNameChecked)
      if (userNameChecked.password == userPw) {
        return true
      } else {
        return false
      }
    }, */
    getExistingAccount: (state) => (userName, userEmail) => {
      if (!state.users.find(user => user.username == userName) && !state.users.find(user => user.email == userEmail)) {
        return true
      }
    },
    getEmailExistence: (state) => (userEmail) => state.users.find(user => user.email == userEmail),
    getUserId: (state) => (userName) => {
      let userNameChecked = state.users.find(user => user.username == userName)

      return userNameChecked.id
    },
    getUserById: (state) =>
      (userId) => state.users.find(user => user.id == userId),
    getUserMissionState: (state) => (userId) => {
      let user = state.users.find(user => user.id == userId)
      return user.missionsState
    },
    getBadgesState: (state) => (userId) => {
      let userBadge = state.users.find(user => user.id == userId)
      return userBadge.badgesState
    }
  },
  actions: {
    addUser(username, name, email, birthday, gender, city, district, postalcode, school, password) {
      this.users.push({
        id: this.users[this.users.length - 1].id + 1,
        username: username,
        name: name,
        perfilImage: '/src/assets/perfil/yoda.jpeg',
        perfilBgImage: 'https://sm.ign.com/ign_pt/screenshot/default/bumblebee-1280a_kck5.jpg',
        email: email,
        password: password,
        gender: gender,
        city: city,
        postalcode: postalcode,
        birthDate: birthday,
        district: district,
        school: school,
        joined: {
          eventId: [],
          activityId: []
        },
        occurrenceId: [],
        missionsState: [],
        badgesState: [],
        title: 'User',
        blocked: false,
      }
      )

      localStorage.setItem('users', JSON.stringify(this.users))
    },
    updateUser(currentUser) {
      let indexCurrentUser = this.users.findIndex(user => user.id == currentUser.id);
      this.users[indexCurrentUser] = currentUser;
      localStorage.setItem('users', JSON.stringify(this.users))
      localStorage.setItem('currentUser', JSON.stringify(currentUser))
    },
    updateUsers() {
      localStorage.setItem('users', JSON.stringify(this.users))
    },
    addOccurrence(occurrenceId) {
      this.occurrenceId.push(occurrenceId)
    },
    addJoinedActivity(activityId) {
      this.joined.activityId = activityId
    },
    addJoinedEvent(eventId) {
      this.joined.eventId.push(eventId)
    },
    async logIn(username, password){
      try {
        const request = new Request('http://localhost:3000/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password
          })

        });
        
        await fetch(request).then(response => {
          if (!response.ok) {
            throw new Error('Request failed');
          }
          return response.json();
        })
        .then(result => {
          cookieFunctions.createTokenOnCookie(result.accessToken);
        })
        .catch(error => {
          console.error('Error:', error);
        });

      }
      catch (e) {
        throw Error(e)
      }
    },
    async fetchAllUsers(){
      try {
        const response = await fetch(API + '/users');
        if (response.ok) { //TRUE if response status code in the range 200-299
          this.users = await response.json(); // parse the response as JSON
        }
        else
          alert("HTTP error: " + response.status)
      }
      catch (e) {
        throw Error(e)
      }
    }
  },
})