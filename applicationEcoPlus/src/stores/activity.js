import { defineStore } from 'pinia'

let activities

if (!JSON.parse(localStorage.getItem('activities'))) {
  activities = [
    {
      id: 0,
      title: 'Plant Trees',
      diagnosis: 'Activity in the woods',
      schedule: 'May',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vulputate purus mi, placerat egestas magna posuere sed. In egestas lorem ac ante cursus, eu feugiat tellus tempor. Proin ac ante mi. Maecenas interdum, eros nec lobortis mollis, neque ipsum rhoncus libero, quis euismod nibh diam eget massa. Cras tempor, purus quis tempus scelerisque, lectus elit condimentum libero, nec vehicula justo odio quis mi. Nunc non enim faucibus augue mattis tempus sit amet vitae turpis. Sed euismod id enim quis condimentum.',
      objectives: 'Plant trees in the center of city.',
      resources: 'Water and Shovel',
      participants: 'Students and Teachers',
      evaluationInd: 'nº 102',
      evalationInst: 'Count',
      image: '/src/assets/images/example1.jpg',
      comments: [{messageId: 0, userId: 1, message: "Um bom dia para ser da ecoEscolas!!!", likesDislikes: { likes: [0, 1], dislikes: [] } }],
      membersId: [0,1], //ID of the member
    },
    {
      id: 1,
      title: 'Clear Beach',
      diagnosis: 'Activity in beach',
      schedule: 'July',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vulputate purus mi, placerat egestas magna posuere sed. In egestas lorem ac ante cursus, eu feugiat tellus tempor. Proin ac ante mi. Maecenas interdum, eros nec lobortis mollis, neque ipsum rhoncus libero, quis euismod nibh diam eget massa. Cras tempor, purus quis tempus scelerisque, lectus elit condimentum libero, nec vehicula justo odio quis mi. Nunc non enim faucibus augue mattis tempus sit amet vitae turpis. Sed euismod id enim quis condimentum.',
      objectives: 'Plant trees in the center of city.',
      resources: 'None',
      participants: 'Students',
      evaluationInd: 'nº 102',
      evalationInst: 'Count',
      image: '/src/assets/images/example2.jpg',
      comments: [{messageId: 0, userId: 2, message: "First!!!", likesDislikes: { likes: [], dislikes: [0,1] } }],
      membersId: [1], //ID of the member
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
    getActivities: (state) => state.activities,
    getMembers: (state) => state.activities.map(activity => activity.membersId),
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