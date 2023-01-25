import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import router from './router'

/* import './assets/main.css' */

const app = createApp(App)

app.use(createPinia())
app.use(router)


// Vuetify
import 'vuetify/styles';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
	components,
	directives,
});

app.use(vuetify).mount('#app');