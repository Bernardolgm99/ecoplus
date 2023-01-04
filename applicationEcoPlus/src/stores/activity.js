import { defineStore } from 'pinia'

export const activityStore = defineStore('activity', {
  state: () => ({
    activities: [
      {id: 0, 
      title: 'Activity',
      diagnosis: 'activity in the woods', 
      schedule: 'may',
      objectives: 'plant',
      resources: 'wotah',
      participants: [{participantId: 0}, {participantId: 1}],
      evaluationInd: 'nº 102',
      evalationInst: 'count'  
        }
    ]
  }),
  getters: {
    getId: (state) => state.id,
    getTitle: (state) => state.title,
    getDiagnosis: (state) => state.diagnosis,
    getSchedule: (state) => state.schedule,
    getObjecties: (state) => state.objectives,
    getResources: (state) => state.resources,
    getParticipants: (state) => state.participants,
    getEvaluationInd: (state) => state.evaluationInd,
    getEvaluationInst: (state) => state.evaluationInst,
    getActivityById: (state) =>
    (activityId) => state.activities.find(activity => activity.id == activityId)
  },
  actions: {
    addActivity(title, diagnosis, schedule, objectives, resources, participants, evaluationInd, evaluationInst){
      this.users.push({
        id: this.users[this.users.length - 1].id + 1,
        title: title,
        diagnosis: diagnosis,
        schedule: schedule,
        objectives: objectives,
        resources: resources,
        participants: participants,
        evaluationInd: evaluationInd,
        evaluationInst: evaluationInst
        }
      )
    }
  },
})