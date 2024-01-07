<template>
  <nav :class="navClasses">
    <div class="container-fluid">
      <CustomLink
        to="/"
        class="navbar-brand"
      >
        <img
          src="@/assets/logo.png"
          class="d-inline-block align-text-top"
          alt="logo"
          style="height: 1.43em"
        />
      </CustomLink>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-0">
          <li
            v-for="(link, linkIndex) in links"
            class="nav-item"
            :key="'link' + linkIndex"
          >
            <CustomLink :to="link.path">
              {{ link.label }}
            </CustomLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'pinia';

import { settingsStore } from '@/stores/appSettings.js';

import CustomLink from '@/components/CustomLink.vue';

export default {
  name: 'TopNav',
  components: {
    CustomLink
  },
  methods: {
    showingAtLeastOneSetting: function () {
      const values = [];
      for (const setting in this.appConfig?.settings) {
        values.push(this.appConfig?.settings[setting]);
      }
      return !!values.filter(Boolean).length;
    }
  },
  computed: {
    links: function () {
      const home = {
        label: this.appConfig.appName,
        path: '/'
      };
      const about = {
        label: 'About',
        path: '/about'
      };
      let settings = {
        label: 'Settings',
        path: '/settings'
      };
      if (!this.showingAtLeastOneSetting()) {
        settings = null;
      }

      return [
        home,
        settings,
        about
      ].filter(Boolean);
    },
    navClasses: function () {
      const classes = [
        'navbar',
        'navbar-expand-sm',
        'navbar-' + this.navBarMode,
        'bg-' + this.navBarBackground
      ];
      return classes.join(' ');
    },
    ...mapState(settingsStore, [
      'navBarBackground',
      'navBarMode'
    ])
  }
};
</script>
