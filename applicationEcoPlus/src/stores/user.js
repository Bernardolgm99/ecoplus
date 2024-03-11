import { defineStore } from 'pinia'
import { cookie } from '../utilities/cookieFunctions'
import axios from 'axios';
import API from '../../config'


export const userStore = defineStore('user', {
  state: () => ({
    users: [],
    user: {},
    userEventsOccurrences: [],
    userEvents: [],
    userOccurrences: [],
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
    getUserEventsOccurrences: state => state.userEventsOccurrences,
    getUserEvents: state => state.userEvents,
    getUserOccurrences: state => state.userOccurrences,
  },
  actions: {

    async createUser(name, username, email, password, schoolDesc, schoolId, birthDate, gender) {

      let user = {
        name: name,
        username: username,
        email: email,
        password: password,
        schoolDesc: schoolDesc,
        schoolId: schoolId,
        birthDate: birthDate,
        genreDesc: gender,
        icone: '/src/assets/perfil/yoda.jpeg'
      }

      await axios.post(`${API}/users`, user)

    },
    async logIn(username, password) {
      try {
        let response = await fetch(API + '/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password
          })

        }).then(response => {
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
    async fetchAllUsers() {
      try {
        const response = await fetch(API + '/users');
        if (response.ok) {
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
    async fetchLoggedUser() {
      try {
        let token = cookie.getCookie('token');
        if (token) {
          let response = await fetch(API + '/users/loggedUser', {
            method: 'GET',
            headers: {
              Authorization: token
            }
          }).then((response) => {
            if (!response.ok) {
              throw new Error('Request failed');
            }
            return response.json();
          }).then(result => { return result })
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
    },
    async updateUser(body, userId) {
      //update request
      try {
        let token = cookie.getCookie('token');
        const response = await fetch(API + '/users/' + userId, {
          method: 'PUT',
          headers: {
            Authorization: token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });
        if (response.ok) {
          let result = await response.json();
          this.user = await this.fetchUserById(userId);
          return result.message;
        }
        else
          alert("HTTP error: " + response.status)
      }
      catch (e) {
        throw Error(e)
      }
    },
    async fetchUserById(userId) {
      try {
        let user = await axios.get(`${API}/users/${userId}`).then((response) => { return response.data; });
        return user.msg
      } catch (err) {
        throw Error(err)
      }
    },
    async fetchUserEvent(userId) {
      try {
        let page = 0, limit = 5, createdAt = "2023-07-01";
        let userEvent = await axios.get(`${API}/users/${userId}/events?page=${page}&limit=${limit}&createdAt=${createdAt}`).then((response) => { return response.data; });
        this.userEvents = userEvent
      } catch (err) {
        throw Error(err)
      }
    },
    async fetchUserOccurrence(userId) {
      try {
        let page = 0, limit = 5, createdAt = "2023-07-01";
        let userOccurrence = await axios.get(`${API}/users/${userId}/occurrences?page=${page}&limit=${limit}&createdAt=${createdAt}`).then((response) => { return response.data; });
        this.userOccurrences = userOccurrence
      } catch (err) {
        throw Error(err)
      }
    },
    async fetchUserEventOccurrence(userId) {
      try {
        let page = 0, limit = 5, createdAt = "2023-07-01";
        let userAll = await axios.get(`${API}/users/${userId}/eventsOccurrences?page=${page}&limit=${limit}&createdAt=${createdAt}`).then((response) => { return response.data; });
        this.userEventsOccurrences = userAll
      } catch (err) {
        throw Error(err)
      }
    },

    async fetchUpdateRoleOrBlock(userId, body) {
      try {
        await axios.patch(`${API}/users/${userId}`, body, {
          headers: {
            Authorization: cookie.getCookie('token')
          }
        })
      } catch (err) {
        throw Error(err)
      };
    },

    async fetchDelete(userId) {
      try {
        await axios.delete(`${API}/users/${userId}`, {
          headers: {
            Authorization: cookie.getCookie('token')
          }
        })
      } catch (err) {
        throw Error(err)
      };
    }
  },
})