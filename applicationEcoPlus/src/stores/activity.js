import { defineStore } from 'pinia'

let activities

if (!JSON.parse(localStorage.getItem('activities'))) {
  activities = [
    {
      id: 0,
      title: 'Activity',
      diagnosis: 'activity in the woods',
      schedule: 'may',
      description: 'The trees are not being watered and the lack of water is  notorious, so our goal is to install a drinking fountain on each tree.',
      objectives: 'plant',
      resources: 'wotah',
      participants: 'Students',
      evaluationInd: 'nº 102',
      evalationInst: 'count',
      image: '/src/assets/images/example(1).jpg',
      comments: [{messageId: 0, userId: 1, message: "Um bom dia para ser da ecoEscolas!!!", likesDislikes: { likes: [0, 2], dislikes: [1] } }],
      membersId: [0, 2], //ID of the member
    },
    {
      id: 1,
      title: 'Beach',
      diagnosis: 'activity in the woods',
      schedule: 'may',
      description: 'The trees are not being watered and the lack of water is  notorious, so our goal is to install a drinking fountain on each tree.',
      objectives: 'plant',
      resources: 'wotah',
      participants: 'Students',
      evaluationInd: 'nº 102',
      evalationInst: 'count',
      image: '/src/assets/images/example(1).jpg',
      comments: [{messageId: 0, userId: 0, message: "Um bom dia para ser da ecoEscolas!!!", likesDislikes: { likes: [0, 2], dislikes: [1] } }],
      membersId: [0, 1], 
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
    addActivity(title, diagnosis, schedule, description, objectives, resources, participants, evaluationInd, evaluationInst, image) {
      this.activities.push({
        id: activities[this.activities.length - 1].id + 1,
        title: title,
        diagnosis: diagnosis,
        schedule: schedule,
        description: description,
        objectives: objectives,
        resources: resources,
        participants: participants,
        evaluationInd: evaluationInd,
        evaluationInst: evaluationInst,
        image: image,
        comments: [],
        membersId: [],
      });
      localStorage.setItem('activities', JSON.stringify(this.activities));
    },
    updateActivities() {
      localStorage.setItem('activities', JSON.stringify(this.activities));
    },
    updateActivity(activity) {
      const index = this.activities.findIndex(activityIndex => activityIndex == activity)
      activities[index] = activity;
      localStorage.setItem('activities', JSON.stringify(activities));
    }
  }
})