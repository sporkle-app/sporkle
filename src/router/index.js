import { createRouter, createWebHashHistory } from 'vue-router';

import { appLoadingStore } from '@/stores/appLoading.js';

import AboutApp from '@/views/AboutApp.vue';
import AppSettings from '@/views/AppSettings.vue';
import CloneRepo from '@/views/CloneRepo.vue';
import CommitDiffContainer from '@/views/CommitDiffContainer.vue';
import CreateNewRepo from '@/views/CreateNewRepo.vue';

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
      path: '/create-repo',
      name: 'createRepo',
      component: CreateNewRepo
    },
    {
      path: '/clone-repo',
      name: 'cloneRepo',
      component: CloneRepo
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

router.afterEach(() => {
  appLoadingStore().setRoutingLoading(false);
});
