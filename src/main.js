import { createApp } from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';

import Pagination from './components/Pagination.vue';
import App from './App.vue';
import router from './router';
import { date, currency } from './methods/filters';

const app = createApp(App).use(router);

app.config.globalProperties.$filters = {
  date,
  currency,
};

app.use(VueAxios, axios);
app.component('Loading', Loading);
app.component('Pagination', Pagination);

app.mount('#app');
