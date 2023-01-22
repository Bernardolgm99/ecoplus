import { defineStore } from 'pinia'

let activities

if (!JSON.parse(localStorage.getItem('activities'))) {
  activities = [
    {
      id: 0,
      title: 'Activity',
      diagnosis: 'activity in the woods',
      schedule: 'may',
      objectives: 'plant',
      resources: 'wotah',
      participants: [],
      evaluationInd: 'nº 102',
      evalationInst: 'count',
    },
    {
      id: 1,
      title: 'Clean Beach',
      diagnosis: 'activity in the woods',
      schedule: 'may',
      objectives: 'plant',
      resources: 'wotah',
      participants: [],
      evaluationInd: 'nº 102',
      evalationInst: 'count',
    },
  ]
} else {
  activities = JSON.parse(localStorage.getItem('activities'))
}



export const activityStore = defineStore('activity', {
  state: () => ({
    activities: activities
  }),
  getters: {
    getActivityById: (state) =>
      (activityId) => state.activities.find(activity => activity.id == activityId),
    getActivities: (state) => state.activities
  },
  actions: {
    addActivity(title, diagnosis, schedule, objectives, resources, participants, evaluationInd, evaluationInst) {
      this.activities.push({
        id: activities[this.activities.length - 1].id + 1,
        title: title,
        diagnosis: diagnosis,
        schedule: schedule,
        objectives: objectives,
        resources: resources,
        participants: participants,
        evaluationInd: evaluationInd,
        evaluationInst: evaluationInst,
      });
      localStorage.setItem('activities', JSON.stringify(this.activities));
    },
    updateActivities(activities) {
      localStorage.setItem('activities', JSON.stringify(activities));
    },
  }
})