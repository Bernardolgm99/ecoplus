import { defineStore } from 'pinia'


let users

if (!JSON.parse(localStorage.getItem('users'))) {
  users = [
    {
      id: 0,
      username: 'admin',
      name: 'admin',
      perfilImage: '/src/assets/perfil/avatar.jpeg',
      email: 'admin', 
      password: 'admin', 
      gender: 'undefined', 
      city: 'undefined', 
      postalcode: 'undefined', 
      birthDate: 'undefined', 
      district: 'undefined', 
      school: 'undefined',
      joined: {
        eventId: [1, 3, 5, 6],
        activityId: [1, 2, 3, 4]
      },
      occurrenceId: [2, 5, 6, 7, 4],
      missionsState: [1, 2, 1],
      title: 'Legend'
    },
    {id: 1, 
      username: 'João', 
      name: 'admin', 
      perfilImage: '/src/assets/perfil/yoda.jpeg',
      email: 'admin', 
      password: 'admin', 
      gender: 'undefined', 
      city: 'undefined', 
      postalcode: 'undefined', 
      birthDate: 'undefined', 
      district: 'undefined', 
      school: 'undefined',
      joined: {
        eventId: [1, 3, 5, 6],
        activityId: [1, 2, 3, 4]
      },
      occurrenceId: [2, 5, 6, 7, 4],
      missionsState: [1, 0, 1],
      title: 'Newbie'
    }
  ]
  localStorage.setItem('users', JSON.stringify(users))
} else {
  users = JSON.parse(localStorage.getItem('users'))
}



export const userStore = defineStore('user', {
  state: () => ({
    users: users
  }),
  getters: {
    getId: (state) => state.id,
    getUsername: (state) => state.username,
    getName: (state) => state.username,
    getEmail: (state) => state.username,
    getPassword: (state) => state.username,
    getSchool: (state) => state.username,
    getJoinedEvents: (state) => state.joined.eventId,
    getJoinedActivities: (state) => state.joined.activityId,
    getOccurrenceIds: (state) => state.occurrenceId,
    getUserChecked: (state) => (userName, userPw) => {
      let userNameChecked = state.users.find(user => user.username == userName)

      if (userNameChecked.password == userPw) {
        return true
      } else {
        return false
      }
    },
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
    getUsers: (state) => state.users,
    getUserMissionState: (state) => (userId) => {
      let user = state.users.find(user => user.id == userId)
      return user.missionsState
    }
  },
  actions: {
    addUser(username, name, email, birthday, gender, city, district, postalcode, school, password) {
      this.users.push({
        id: this.users[this.users.length - 1].id + 1,
        username: username,
        name: name,
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
        title: 'Newbie'
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
    addOccurrence(occurrenceId) {
      this.occurrenceId.push(occurrenceId)
    },
    addJoinedActivity(activityId) {
      this.joined.activityId = activityId
    },
    addJoinedEvent(eventId) {
      this.joined.eventId.push(eventId)
    }
  },
})