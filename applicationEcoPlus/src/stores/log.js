import { defineStore } from 'pinia'
let today = new Date()

export const logStore = defineStore('log', {
  state: () => ({
    logs: [
      {userId: 0, 
      time: '10h43', 
      date: '22-01-2021',
      action: 'entrou em uma atividade'}
    ]
  }),
  getters: {
    logs: (state) => state.logs,
    userLogs: (state) => 
    (getUser) => state.logs.filter(log => log.username == getUser)
  },
  actions: {
    addLog(userId, action){
      this.logs.push({
        userId: userId,
        time: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
        date: today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate(),
        action: action
      })
    }
  }
})