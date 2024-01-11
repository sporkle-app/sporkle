import { createRouter, createWebHashHistory } from 'vue-router';

import AboutApp from '@/views/AboutApp.vue';
import AppSettings from '@/views/AppSettings.vue';
import CommitDiffContainer from '@/views/CommitDiffContainer.vue';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/commits',
      name: 'commits',
      component: CommitDiffContainer
    },
    {
      path: '/about',
      name: 'about',
      component: AboutApp
    },
    {
      path: '/settings',
      name: 'settings',
      component: AppSettings
    },
    {
      path: '/',
      name: 'home',
      redirect: '/commits'
    },
    {
      path: '/:catchAll(.*)*',
      name: '404',
      redirect: '/'
    }
  ]
});
