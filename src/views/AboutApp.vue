<template>
  <div class="about-app">
    <CloseView />

    <h2>About</h2>

    <p>{{ APP_NAME }} is a Cross-Platform Git client.</p>

    <h3>Authors:</h3>
    <ul>
      <li>
        <a
          v-for="(author, authorIndex) in authors"
          v-text="author.name"
          href="#"
          :title="author.url"
          @click.prevent="openExternal"
          :key="'author' + authorIndex"
        ></a>
      </li>
    </ul>

    <h3>Versions:</h3>
    <ul>
      <li><strong>{{ APP_NAME }}</strong> (v{{ versions.app }})</li>
      <li><strong>Git</strong> (v{{ versions.git }})</li>
      <li><strong>NW.js</strong> (v{{ versions.nw }})
        <ul>
          <li><strong>Chromium</strong> (v{{ versions.chromium }})</li>
          <li><strong>Node.js</strong> (v{{ versions.node }})</li>
        </ul>
      </li>
      <li><strong>Vue.js</strong> (v{{ clean(versions.vue) }})</li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';

import { APP_NAME } from '@/helpers/constants.js';

import CloseView from '@/components/CloseView.vue';

const exec = window.nw.require('child_process').exec;
const manifest = window.nw.App.manifest;
const versions = window.nw.process.versions;

export default {
  name: 'AppSettings',
  components: {
    CloseView
  },
  constants: {
    APP_NAME
  },
  data: function () {
    return {
      authors: [
        {
          name: 'The Jared Wilcurt',
          url: 'https://TheJaredWilcurt.com'
        }
      ],
      versions: {
        app: manifest.version,
        chromium: versions.chromium,
        git: '',
        node: versions.node,
        nw: versions.nw,
        vue: manifest.devDependencies.vue
      }
    };
  },
  methods: {
    clean: function (value) {
      value = value || '';
      value = value.replace('^', '');
      value = value.replace('~', '');
      value = value.trim();
      return value;
    },
    getGitVersion: function () {
      exec('git --version', (error, gitVersion) => {
        if (error) {
          this.setAppError(String(error));
        }
        if (gitVersion) {
          gitVersion = gitVersion.replace('git version', '');
          gitVersion = gitVersion.trim();
          this.versions.git = gitVersion;
        }
      });
    },
    openExternal: function (evt) {
      let url = evt.target.title;
      window.nw.Shell.openExternal(url);
    },
    ...mapActions(alertsStore, [
      'setAppError'
    ])
  },
  created: function () {
    this.getGitVersion();
  }
};
</script>

<style scoped>
.about-app {
  padding: 20px;
}
</style>
