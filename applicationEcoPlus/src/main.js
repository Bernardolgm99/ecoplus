import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import router from './router'

/* import './assets/main.css' */

const app = createApp(App)

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
	navigator.serviceWorker
	  .register("../serviceWorker.js")
	  .then(res => console.log("service worker registered"))
	  .catch(err => console.log("service worker not registered", err));
  });
}

app.use(createPinia())
app.use(router)


// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
	components,
	directives,
});

app.use(vuetify).mount('#app');
