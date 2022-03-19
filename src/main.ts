import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import App from './App.vue';
import AgentManagement from './components/AgentManagement.vue';
import DefaultPage from './components/DefaultPage.vue';
import NotFound from './components/NotFound.vue';
import PingForm from './components/PingForm.vue';

const routes = [
  {
    path: '/ping',
    component: PingForm,
  },
  {
    path: '/agent',
    component: AgentManagement,
  },
  {
    path: '/',
    component: DefaultPage,
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
