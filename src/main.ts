import { createApp } from 'vue'
import App from './App.vue'
import PingForm from './components/PingForm.vue'
import NotFound from './components/NotFound.vue'
import AgentManagement from './components/AgentManagement.vue'
import {createRouter, createWebHashHistory} from 'vue-router'

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
      component: NotFound,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
