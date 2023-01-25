<template>
  <v-container>
    <div class="d-flex justify-space-between">
      <h2>
        Welcome {{ user.name }} !!!
      </h2>
      <v-btn class="mx-2" @click="exitAdmin" color="blue" icon="mdi-exit"> </v-btn>
    </div>
  </v-container>

  <!-- USERS -->
  <v-container>
    <h1>Users</h1>
    <v-table fixed-header height="300px">
      <thead>
        <tr>
          <th class="text-left">
            ID
          </th>
          <th class="text-left">
            Username
          </th>
          <th class="text-left">
            Title
          </th>
          <th class="text-center">
            Block
          </th>
          <th class="text-center">
            Ban
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in userStore.getUsers" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.username }}</td>
          <td>
            <v-select v-model="item.title" @update:modelValue="changeUserTitle" style="max-width: 200px" label="Select"
              :items="userTitle" :hint="'Title'" persistent-hint return-object single-line variant="solo"></v-select>
          </td>
          <td class="text-center">
            <v-btn v-if="item.blocked" @click="blockUser(item)" class="mx-2" color="" icon="mdi-lock"></v-btn>
            <v-btn v-else class="mx-2" @click="blockUser(item)" color="warning" icon="mdi-lock"></v-btn>
          </td>
          <td class="text-center">
            <v-btn class="mx-2" @click="deleteUser(item)" color="error" icon="mdi-cancel"></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>

  <!-- OCCURRENCES -->
  <v-container class="mt-6">
    <h1>Occurrences</h1>
    <v-table fixed-header height="300px">
      <thead>
        <tr>
          <th class="text-left">
            ID
          </th>
          <th class="text-left">
            Title
          </th>
          <th class="text-left">
            Img
          </th>
          <th class="text-left">
            Stage
          </th>
          <th class="text-center">
            Delete
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in occurrenceStore.getOccurrences" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td><img height="50" :src="item.image" /></td>
          <td>
            <v-select v-model="item.stage" @update:modelValue="changeStageOccurrence" style="max-width: 200px"
              label="Select" :items="['To Do', 'Doing', 'Done']" :hint="'Situation of occurrence'" persistent-hint
              return-object single-line variant="solo"></v-select>
          </td>
          <td class="text-center">
            <v-btn class="mx-2" @click="deleteOccurrence(item)" color="error" icon="mdi-cancel"></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>

  <!-- EVENTS -->
  <v-container class="mt-6">
    <div class="d-flex">
      <h1>Events</h1>
      <v-btn class="mx-2" @click="modalCreateEvent = true" color="primary" icon="mdi-plus"></v-btn>
    </div>
    <v-table fixed-header height="300px">
      <thead>
        <tr>
          <th class="text-left">
            ID
          </th>
          <th class="text-left">
            Title
          </th>
          <th class="text-left">
            Img
          </th>
          <th class="text-center">
            Member List
          </th>
          <th class="text-center">
            Edit
          </th>
          <th class="text-center">
            Delete
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in eventStore.getEvents" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td><img height="50" :src="item.image" /></td>
          <td class="text-center">
            <v-btn class="mx-2" @click="downloadArrayAsCSV(item, 'event' + item.title)" color="purple"
              icon="mdi-download"></v-btn>
          </td>
          <td class="text-center">
            <v-btn class="mx-2" @click="toEditEvent(item)" color="secondary" icon="mdi-pencil"></v-btn>
          </td>
          <td class="text-center">
            <v-btn class="mx-2" @click="deleteEvent(item)" color="error" icon="mdi-cancel"></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
  <!-- ADD EVENT -->
  <v-row justify="center">
    <v-dialog v-model="modalCreateEvent" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">Create Event</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="newEvent.title" label="Title" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="newEvent.subtitle" label="Subtitle" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="newEvent.location" label="Location" required></v-text-field>
                </v-col>
              </v-col>
              <v-col cols="6">
                <v-col cols="12">
                  <v-textarea v-model="newEvent.description" label="Description" required></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-file-input v-model="newEvent.image" label="Image" required></v-file-input>
                </v-col>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="resetCreateEvent">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="createEvent">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  <!-- EDIT EVENT -->
  <v-row justify="center">
    <v-dialog v-model="modalEditEvent" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Event</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editEvent.title" label="Title" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editEvent.subtitle" label="Subtitle" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editEvent.location" label="Location" required></v-text-field>
                </v-col>
              </v-col>
              <v-col cols="6">
                <v-col cols="12">
                  <v-textarea v-model="editEvent.description" label="Description" required></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-file-input v-model="editEvent.image" label="Image" required></v-file-input>
                </v-col>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="modalEditEvent = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="editingEvent">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

  <!-- ACTIVITY -->
  <v-container class="mt-6">
    <div class="d-flex">
      <h1>Activity</h1>
      <v-btn class="mx-2" @click="modalCreateActivity = true" color="primary" icon="mdi-plus"></v-btn>
    </div>
    <v-table fixed-header height="300px">
      <thead>
        <tr>
          <th class="text-left">
            ID
          </th>
          <th class="text-left">
            Title
          </th>
          <th class="text-left">
            Img
          </th>
          <th class="text-center">
            Member List
          </th>
          <th class="text-center">
            Edit
          </th>
          <th class="text-center">
            Delete
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in activityStore.getActivities" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td><img height="50" :src="item.image" /></td>
          <td class="text-center">
            <v-btn class="mx-2" @click="downloadArrayAsCSV(item, 'activity' + item.title)" color="purple"
              icon="mdi-download"></v-btn>
          </td>
          <td class="text-center">
            <v-btn class="mx-2" @click="toEditActivity(item)" color="secondary" icon="mdi-pencil"></v-btn>
          </td>
          <td class="text-center">
            <v-btn class="mx-2" @click="deleteActivity(item)" color="error" icon="mdi-cancel"></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
  <!-- ADD ACTIVITY -->
  <v-row justify="center">
    <v-dialog v-model="modalCreateActivity" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">Create Activity</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="newActivity.title" label="Title" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="newActivity.diagnosis" label="Diagnosis" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="newActivity.schedule" label="Schedule" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="newActivity.objectives" label="Objectives" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="newActivity.resources" label="Resources" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="newActivity.participants" label="Participants" required></v-text-field>
                </v-col>
              </v-col>
              <v-col cols="6">
                <v-col cols="12">
                  <v-textarea v-model="newActivity.description" label="Description" required></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-file-input v-model="newActivity.image" label="Image" required></v-file-input>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="newActivity.evaluationInd" label="Evaluation Ind." required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="newActivity.evaluationInst" label="Evaluation Inst." required></v-text-field>
                </v-col>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="resetCreateActivity">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="createActivity">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  <!-- EDIT ACTIVITY -->
  <v-row justify="center">
    <v-dialog v-model="modalEditActivity" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Activity</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editActivity.title" label="Title" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editActivity.diagnosis" label="Diagnosis" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editActivity.schedule" label="Schedule" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editActivity.objectives" label="Objectives" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editActivity.resources" label="Resources" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editActivity.participants" label="Participants" required></v-text-field>
                </v-col>
              </v-col>
              <v-col cols="6">
                <v-col cols="12">
                  <v-textarea v-model="editActivity.description" label="Description" required></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-file-input v-model="editActivity.image" label="Image" required></v-file-input>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editActivity.evaluationInd" label="Evaluation Ind." required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editActivity.evaluationInst" label="Evaluation Inst." required></v-text-field>
                </v-col>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="modalEditActivity = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="editingActivity">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

  <!-- BADGES -->
  <v-container class="mt-6">
    <div class="d-flex">
      <h1>Badges</h1>
      <v-btn class="mx-2" @click="deleteUser(item)" color="primary" icon="mdi-plus"></v-btn>
    </div>
    <v-table fixed-header height="300px">
      <thead>
        <tr>
          <th class="text-left">
            ID
          </th>
          <th class="text-left">
            Title
          </th>
          <th class="text-left">
            Img
          </th>
          <th class="text-center">
            Edit
          </th>
          <th class="text-center">
            Delete
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in badgeStore.getBadges" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td><img height="50" :src="item.image" /></td>
          <td class="text-center">
            <v-btn class="mx-2" @click="deleteUser(item)" color="secondary" icon="mdi-pencil"></v-btn>
          </td>
          <td class="text-center">
            <v-btn class="mx-2" @click="deleteBadge(item)" color="error" icon="mdi-cancel"></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>
<script>
import { activityStore } from '../stores/activity'
import { badgeStore } from '../stores/badge'
import { eventStore } from '../stores/event'
import { logStore } from '../stores/log'
import { missionStore } from '../stores/mission'
import { occurrenceStore } from '../stores/occurrence'
import { userStore } from '../stores/user'

export default {
  data() {
    return {
      activityStore: activityStore(),
      badgeStore: badgeStore(),
      eventStore: eventStore(),
      logStore: logStore(),
      missionStore: missionStore(),
      occurrenceStore: occurrenceStore(),
      userStore: userStore(),
      user: JSON.parse(localStorage.getItem('currentUser')),
      userTitle: ['Admin', 'User', 'EcoEscolas'],
      modalCreateEvent: false,
      modalCreateActivity: false,
      modalEditEvent: false,
      modalEditActivity: false,
      newEvent: {
        title: '',
        subtitle: '',
        image: '',
        location: '',
        description: '',
        members: [],
        comments: [],
        type: 'event',
      },
      newActivity: {
        title: '',
        diagnosis: '',
        schedule: '',
        objectives: '',
        resources: '',
        participants: '',
        evaluationInd: '',
        evaluationInst: '',
        description: '',
        image: '',
        members: [],
        comments: [],
        type: 'activity',
      },
      editEvent: {
        userId: '',
        title: '',
        subtitle: '',
        image: '',
        location: '',
        description: '',
        members: [],
        comments: [],
        type: 'event',
      },
      editActivity: {
        title: '',
        diagnosis: '',
        schedule: '',
        objectives: '',
        resources: '',
        participants: '',
        evaluationInd: '',
        evaluationInst: '',
        description: '',
        image: '',
        members: [],
        comments: [],
        type: 'activity',
      },
    }
  },

  created() {
    if (JSON.parse(localStorage.getItem('currentUser')).title != 'Admin') {
      this.$router.push({ name: 'home' })
    }
  },

  methods: {

    exitAdmin() {
      localStorage.removeItem('currentUser')
      this.$router.push({ name: 'landingPage' })
    },

    blockUser(item) {
      let user = this.userStore.getUserById(item.id)
      if (user.blocked) {
        user.blocked = false
        this.userStore.updateUsers()
      } else {
        user.blocked = true
        this.userStore.updateUsers()
      }
    },

    deleteUser(item) {
      let index = this.userStore.getUsers.findIndex(user => user.id == item.id)
      this.userStore.getUsers.splice(index, 1)
      this.userStore.updateUsers()
    },

    changeUserTitle() {
      this.userStore.updateUsers()
    },

    changeStageOccurrence() {
      this.occurrenceStore.updateOccurrences()
    },

    deleteOccurrence(item) {
      let index = this.occurrenceStore.getOccurrences.findIndex(occurrence => occurrence.id == item.id)
      this.occurrenceStore.getOccurrences.splice(index, 1)
      this.occurrenceStore.updateOccurrences()
    },

    createEvent() {
      for (const prop in this.newEvent) {
        if (!(this.newEvent.hasOwnProperty(prop) && this.newEvent[prop])) {
          alert(`${prop} property is empty or does not exist`);
          return
        }
      }
      this.eventStore.addEvent(this.user.id, this.newEvent.title, this.newEvent.subtitle, this.newEvent.image, this.newEvent.location, this.newEvent.description)
      alert("Event created")
      this.resetCreateEvent()
    },

    toEditEvent(event) {
      for (let key in event) {
        this.editEvent[key] = event[key];
      }
      this.editEvent.image = ""
      console.log(this.editEvent);
      this.modalEditEvent = true;
    },

    editingEvent() {
      let event = this.eventStore.getEventById(this.editEvent.id)
      let updateEvent = { ...this.editEvent }
      if (!updateEvent.image) updateEvent.image = event.image
      for (const prop in updateEvent) {
        if (!(updateEvent.hasOwnProperty(prop) && updateEvent[prop])) {
          if (updateEvent.userId != 0) {
            alert(`Plause field the input of ${prop}!!!`);
            return
          }
        }
      }
      for (let key in event) {
        event[key] = updateEvent[key];
      }
      this.eventStore.updateEvents()
      alert("Event updated")
      this.modalEditEvent = false
    },

    resetCreateEvent() {
      this.newEvent.title = ''
      this.newEvent.subtitle = ''
      this.newEvent.image = ''
      this.newEvent.location = ''
      this.newEvent.description = ''
      this.modalCreateEvent = false
    },

    createActivity() {
      for (const prop in this.newActivity) {
        if (!(this.newActivity.hasOwnProperty(prop) && this.newActivity[prop])) {
          alert(`${prop} property is empty or does not exist`);
          return
        }
      }
      this.activityStore.addActivity(this.newActivity.title, this.newActivity.diagnosis, this.newActivity.schedule, this.newActivity.description, this.newActivity.objectives, this.newActivity.resources, this.newActivity.participants, this.newActivity.evaluationInd, this.newActivity.evaluationInst, this.newActivity.image)
      alert("Activity created")
      this.resetCreateActivity()
    },

    toEditActivity(activity) {
      for (let key in activity) {
        this.editActivity[key] = activity[key];
      }
      this.editActivity.image = ""
      this.modalEditActivity = true;
    },

    editingActivity() {
      let activity = this.activityStore.getActivityById(this.editActivity.id)
      let updateActivity = { ...this.editActivity }
      if (!updateActivity.image) updateActivity.image = activity.image
      for (const prop in updateActivity) {
        if (!(updateActivity.hasOwnProperty(prop) && updateActivity[prop])) {
          if (updateActivity.userId != 0) {
            alert(`Plause field the input of ${prop}!!!`);
            return
          }
        }
      }
      for (let key in activity) {
        activity[key] = updateActivity[key];
      }
      this.activityStore.updateActivities()
      alert("Activity updated")
      this.modalEditActivity = false
    },

    resetCreateActivity() {
      this.newActivity.title = '',
      this.newActivity.diagnosis = '',
      this.newActivity.schedule = '',
      this.newActivity.objectives = '',
      this.newActivity.resources = '',
      this.newActivity.participants = '',
      this.newActivity.evaluationInd = '',
      this.newActivity.evaluationInst = '',
      this.newActivity.description = '',
      this.newActivity.image = '',
      this.modalCreateActivity = false
    },

    deleteEvent(item) {
      let index = this.eventStore.getEvents.findIndex(event => event.id == item.id)
      this.eventStore.getEvents.splice(index, 1)
      this.eventStore.updateEvents()
    },

    deleteBadge(item) {
      let index = this.badgeStore.getBadges.findIndex(badge => badge.id == item.id)
      this.badgeStore.getBadges.splice(index, 1)
      this.badgeStore.updateBadges()
    },

    deleteActivity(item) {
      let index = this.activityStore.getActivities.findIndex(activity => activity.id == item.id)
      this.activityStore.getActivities.splice(index, 1)
      this.activityStore.updateActivities()
    },

    downloadArrayAsCSV(array, filename) {
      let users = []
      let arrayUsers = []
      let header = ['username', 'name', 'email', 'city', 'school', 'gender', 'title']
      arrayUsers.push(header)
      for (const member of array.membersId) {
        users.push(this.userStore.getUserById(member))
      }
      for (const member of users) {
        arrayUsers.push(Object.values((Object.assign({}, { username: member.username, name: member.name, email: member.email, city: member.city, school: member.school, gender: member.gender, title: member.title }))))
      }
      const csvContent = arrayUsers.map(e => e.join(",")).join("\n");
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      document.body.appendChild(link); // Required for FF
      link.click();
    },
  }
}

//************************************************ REMAINING SUGGESTIONS AND MISSIONS ************************************************
</script>

<style lang="scss" scoped>

</style>