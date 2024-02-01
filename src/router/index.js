import { createRouter, createWebHashHistory } from 'vue-router';

import { appLoadingStore } from '@/stores/appLoading.js';
import { reposStore } from '@/stores/repos.js';

import AboutApp from '@/views/AboutApp.vue';
import AppSettings from '@/views/AppSettings.vue';
import CloneRepo from '@/views/CloneRepo.vue';
import CommitDiffContainer from '@/views/CommitDiffContainer.vue';
import CreateNewRepo from '@/views/CreateNewRepo.vue';
import DevTestingPage from '@/views/DevTestingPage.vue';
import ScanForRepos from '@/views/ScanForRepos.vue';

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
      path: '/dev-testing-page',
      name: 'devTestingPage',
      component: DevTestingPage
    },
    {
      path: '/scan-for-repos',
      name: 'scanForRepos',
      component: ScanForRepos
    },

    // Redirects
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

router.beforeEach(async (to) => {
  const {
    initialLoadComplete
  } = appLoadingStore();
  const {
    currentRepo,
    setCurrentRepo,
    sortedRepoPaths
  } = reposStore();
  const currentRepoIsInSidebar = sortedRepoPaths.includes(currentRepo);

  if (
    (
      !currentRepo ||
      !currentRepoIsInSidebar
    ) &&
    sortedRepoPaths[0]
  ) {
    setCurrentRepo(sortedRepoPaths[0]);
  }
  if (
    initialLoadComplete &&
    ['commits'].includes(to.name) &&
    (
      !currentRepo ||
      !sortedRepoPaths.length ||
      !currentRepoIsInSidebar
    )
  ) {
    return { name: 'scanForRepos' };
  }
});

router.afterEach(() => {
  appLoadingStore().setRoutingLoading(false);
});
