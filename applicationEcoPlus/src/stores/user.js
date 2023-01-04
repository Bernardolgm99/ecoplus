import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => ({
    users: [
      {id: 0, usarname: 'admin', name: 'admin', email: 'admin', password: 'admin', gender: 'undefined', address: 'undefined', postalcode: 'undefined', 
       birthDate: 'undefined', contact: 'undefined', school: 'undefined'}]
  }),
  getters: {
    getId: (state) => state.id,
    getUsername: (state) => state.username,
    getName: (state) => state.username,
    getEmail: (state) => state.username,
    getPassword: (state) => state.username,
    getSchool: (state) => state.username,
    getUserById: (state) =>
    (userId) => state.users.find(user => user.id == userId)
  },
  actions: {
    addUser(username, name, email, password, gender, address, postalcode, birthDate, contact, school){
      this.users.push({
        id: this.users[this.users.length - 1].id + 1,
        username: username,
        name: name,
        email: email,
        password: password,
        gender: gender,
        address: address,
        postalcode: postalcode,
        birthDate: birthDate,
        contact: contact,
        school: school
        }
      )
    }
  },
})