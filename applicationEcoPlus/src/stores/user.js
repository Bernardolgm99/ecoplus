import { defineStore } from 'pinia'

let user

if(!JSON.parse(localStorage.getItem('users'))) {
  user = [
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
      MissionsState: [1, 2, 1],
      title: 'Legend'
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
        MissionsState: [0, 1, 0],
        title: 'Newbie'
        }
    ]
} else {
  user = JSON.parse(localStorage.getItem('users'))
}

export const userStore = defineStore('user', {
  state: () => ({
    users: user
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

      if(userNameChecked.password == userPw){
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
    (userId) => state.users.find(user => user.id == userId),
    getUserMissionState: (state) => (userId) => {
      let user = state.users.find(user => user.id == userId)
      console.log(user)
      return user.MissionsState
    }
  },
  actions: {
    addUser(username, name, email, birthday, gender, city, district, postalcode, school, password, title="Newbie"){
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

      const userArray = JSON.parse(localStorage.getItem('users'))
      
      userArray.push(this.users[this.users.length - 1])

      localStorage.setItem('users', JSON.stringify(userArray))

      this.updateUsers()

    },
    updateUsers(){
      this.users = JSON.parse(localStorage.getItem('users'))
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