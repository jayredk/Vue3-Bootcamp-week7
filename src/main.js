import { createApp } from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';

import Pagination from './components/Pagination.vue';
import App from './App.vue';
import router from './router';

const app = createApp(App).use(router);

app.use(VueAxios, axios);
app.component('Loading', Loading);
app.component('Pagination', Pagination);

app.mount('#app');
