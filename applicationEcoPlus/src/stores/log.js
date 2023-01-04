import { defineStore } from 'pinia'
let today = new Date()

export const logStore = defineStore('log', {
  state: () => ({
    logs: [
      {username: 'Fernando', time: '10h43', date: '22-01-2021',action: 'entrou em uma atividade'}
    ]
  }),
  getters: {
    userLogs: (state) => 
    (getUser) => state.logs.filter(log => log.username == getUser)
  },
  actions: {
    addLog(username, action){
      this.logs.push({
        username: username,
        time: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
        date: today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate(),
        action: action
      })
    }
  }
})