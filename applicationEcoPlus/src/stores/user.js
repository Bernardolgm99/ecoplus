import { defineStore } from 'pinia'
import { cookie } from '../utilities/cookieFunctions'
import API from '../../config'

export const userStore = defineStore('user', {
  state: () => ({
    users: [],
    user:{},
  }),
  getters: {
    getUsers: (state) => state.users,
    getUser: (state) => state.user,
    getId: (state) => state.id,
    getUsername: (state) => state.username,
    getName: (state) => state.username,
    getEmail: (state) => state.username,
    getPassword: (state) => state.username,
    getSchool: (state) => state.username,
    getJoinedEvents: (state) => state.joined.eventId,
    getJoinedActivities: (state) => state.joined.activityId,
    getOccurrenceIds: (state) => state.occurrenceId,
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
    getUserById: (state) => (userId) => state.users.find(user => user.id == userId),
    getUserMissionState: (state) => (userId) => {
      let user = state.users.find(user => user.id == userId)
      return user.missionsState
    },
    getBadgesState: (state) => (userId) => {
      let userBadge = state.users.find(user => user.id == userId)
      console.log(userBadge)
      return userBadge.badges
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
        
        let response = await fetch(request).then(response => {
          if (!response.ok) {
            throw new Error('Request failed');
          }
          return response.json();
        })
        .then(result => {
          cookie.createTokenOnCookie(result.accessToken);
          return true;
        })
        .catch(error => {
          console.error('Error:', error);
        });
        return response;
      }
      catch (e) {
        throw Error(e)
      }
    },
    async fetchAllUsers(){
      try {
        const response = await fetch(API + '/users');
        if (response.ok) { //TRUE if response status code in the range 200-299
          let result = await response.json(); // parse the response as JSON
          this.users = result.message
        }
        else
          alert("HTTP error: " + response.status)
      }
      catch (e) {
        throw Error(e)
      }
    },
    async fetchLoggedUser(){
      try {
        let token = cookie.getCookie('token');
        if (token) {
          const request = new Request(API + '/users/loggedUser', {
            method: 'GET',
            headers: {
              Authorization: token
            }
          });
          let response = await fetch(request).then((response) => {
            if (!response.ok) {
              throw new Error('Request failed');
            }
            return response.json();
          }).then(result => {return result})
          .catch(error => {
            console.error('Error:', error);
          })
          this.user = response.msg;
          return response.msg
        } else {
          console.log("not logged in")
          return false;
        }
      }
      catch (e) {
        throw Error(e)
      }
    }
  },
})