import { defineStore } from 'pinia'

let users

if (!JSON.parse(localStorage.getItem('users'))) {
  users = [
    {
      id: 0,
      username: 'admin',
      title: 'Legend',
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
      badgesState: [0, 1, 2, 3, 6, 9]
    },
    {id: 1, 
      username: 'João', 
      title: 'Newbie',
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
      username: 'Antonio', 
      title: 'Newbie',
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
      occurrenceId: [5],
      missionsState: [1, 0, 1],
      badgesState: [3, 4, 5, 6]
    },
    {id: 3, 
      username: 'miguel', 
      title: 'Newbie',
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
      occurrenceId: [2],
      missionsState: [1, 0, 1],
      badgesState: [3, 4, 5]
    },
    {id: 4, 
      username: 'joana', 
      title: 'Newbie',
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
      title: 'Newbie',
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
      title: 'Newbie',
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
      title: 'Newbie',
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
      title: 'Newbie',
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
      title: 'Newbie',
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
      title: 'Newbie',
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
      title: 'Newbie',
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
    getUsers: (state) => state.users,
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