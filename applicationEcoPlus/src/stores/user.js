import { defineStore } from 'pinia'

let users

if (!JSON.parse(localStorage.getItem('users'))) {
  users = [
    {
      id: 0,
      username: 'admin',
      title: 'Admin',
      blocked: false,
      name: 'admin',
      perfilImage: '/src/assets/perfil/avatar.jpeg',
      perfilBgImage: 'https://sm.ign.com/ign_pt/screenshot/default/bumblebee-1280a_kck5.jpg',
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
      badgesState: []
    },
    {id: 1, 
      username: 'João', 
      title: 'User',
      blocked: false,
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
      badgesState: [3, 4, 5, 6, 9]
    },
    {id: 2, 
      username: 'Admin', 
      title: 'Admin',
      blocked: false,
      name: 'admin', 
      perfilImage: '/src/assets/perfil/yoda.jpeg',
      email: 'admin', 
      password: 'Esmad_2223', 
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
      occurrenceId: [5],
      missionsState: [1, 0, 1],
      badgesState: [3, 4, 5, 6]
    },
    {id: 3, 
      username: 'User', 
      title: 'User',
      blocked: false,
      name: 'User', 
      perfilImage: '/src/assets/perfil/yoda.jpeg',
      email: 'admin', 
      password: 'Esmad_2223', 
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
      occurrenceId: [2],
      missionsState: [1, 0, 1],
      badgesState: [3, 4, 5]
    },
    {id: 4, 
      username: 'joana', 
      title: 'User',
      blocked: false,
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
      occurrenceId: [2, 5, 6, 7, 4, 1],
      missionsState: [1, 0, 1],
      badgesState: [3, 4]
    },
    {id: 5, 
      username: 'Maria', 
      title: 'User',
      blocked: false,
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
      occurrenceId: [2, 5, 6, 7],
      missionsState: [1, 0, 1],
      badgesState: [3, 4, 5, 6, 9]
    },
    {id: 6, 
      username: 'frederico', 
      title: 'User',
      blocked: false,
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
      occurrenceId: [2, 5],
      missionsState: [1, 0, 1],
      badgesState: [3, 4, 5, 6, 9]
    },
    {id: 7, 
      username: 'Bessa', 
      title: 'User',
      blocked: false,
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
      occurrenceId: [2, 5, 6, 7],
      missionsState: [1, 0, 1],
      badgesState: [3, 4, 5, 6, 9]
    },
    {id: 8, 
      username: 'julio', 
      title: 'User',
      blocked: false,
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
      occurrenceId: [2, 5, 6, 7, 4, 0],
      missionsState: [1, 0, 1],
      badgesState: [3, 4, 5, 6, 9]
    },
    {id: 9, 
      username: 'catarina', 
      title: 'User',
      blocked: false,
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
      badgesState: [3, 4, 5, 6, 9]
    },
    {id: 10, 
      username: 'catia', 
      title: 'User',
      blocked: false,
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
      badgesState: [3, 4, 5, 6, 9]
    },
    {id: 11, 
      username: 'bernardo', 
      title: 'User',
      blocked: false,
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
      badgesState: [3, 4, 5, 6, 9]
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
    }
  },
})