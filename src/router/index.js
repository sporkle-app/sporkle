import { createRouter, createWebHashHistory } from 'vue-router';

import AboutApp from '@/components/views/AboutApp.vue';
import AppHome from '@/components/views/AppHome.vue';
import AppSettings from '@/components/views/AppSettings.vue';
import ProjectSettings from '@/components/views/ProjectSettings.vue';

const history = createWebHashHistory();
const routes = [
  {
    path: '/',
    component: AppHome
  },
  {
    path: '/settings',
    component: AppSettings
  },
  {
    path: '/project/:id',
    component: ProjectSettings
  },
  {
    path: '/about',
    component: AboutApp
  }
];

const router = createRouter({
  history,
  routes
});

export default router;
