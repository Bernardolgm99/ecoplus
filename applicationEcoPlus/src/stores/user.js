import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => ({
    users: [
      {id: 0, 
        username: 'admin', 
        name: 'admin', 
        email: 'admin', 
        password: 'admin', 
        gender: 'undefined', 
        city: 'undefined', 
        postalcode: 'undefined', 
        birthDate: 'undefined', 
        district: 'undefined', 
        school: 'undefined',
        joined: [{
         eventId: [1, 3, 5, 6],
         activityId: [1, 2, 3, 4]
        }],
        occurrenceId: [2, 5, 6, 7, 4],
        MissionsId: [1, 2, 3]
      },
      {id: 1, 
        username: 'João', 
        name: 'admin', 
        email: 'admin', 
        password: 'admin', 
        gender: 'undefined', 
        city: 'undefined', 
        postalcode: 'undefined', 
        birthDate: 'undefined', 
        district: 'undefined', 
        school: 'undefined',
        joined: [{
            eventId: [1, 3, 5, 6],
            activityId: [1, 2, 3, 4]
          }],
          occurrenceId: [2, 5, 6, 7, 4],
          MissionsId: [2, 3, 4]
          }
      ]
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
      let userPwChecked = state.users.find(user => user.password == userPw)

      if(userNameChecked.id == userPwChecked.id){
        return true 
      } else {
        return false
      }
    },
    getExistingAccount: (state) => (userName, userEmail) => {
      if(!state.users.find(user => user.username == userName) && !state.users.find(user => user.email == userEmail)){
        return true
      }
    },
    getEmailExistence: (state) => (userEmail) => state.users.find(user => user.email == userEmail),
    getUserId: (state) => (userName) => {
      let userNameChecked = state.users.find(user => user.username == userName)

      return userNameChecked.id
    },
    getUserById: (state) =>
    (userId) => state.users.find(user => user.id == userId)
  },
  actions: {
    addUser(username, name, email, birthday, gender, city, district, postalcode, school, password){
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
        school: school
        }
      )
    },
    addOccurrence(occurrenceId){
      this.occurrenceId.push(occurrenceId)
    },
    addJoinedActivity(activityId){
      this.joined.activityId.push(activityId)
    },
    addJoinedEvent(eventId){
      this.joined.eventId.push(eventId)
    }
  },
})