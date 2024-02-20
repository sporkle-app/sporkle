<template>
  <ViewWrapper title="About">
    <div class="about-app">
      <p><em>{{ APP_NAME }}</em> (<strong>v{{ versions.app }}</strong>) is a Cross-Platform Git client.</p>

      <h3>Created by:</h3>

      <p>
        <a
          v-text="'The Jared Wilcurt'"
          href="#"
          title="https://TheJaredWilcurt.com"
          @click.prevent="openExternal"
        ></a>
      </p>

      <h3>With help from:</h3>
      <ul>
        <li
          v-for="(author, authorIndex) in authors"
          :key="'author' + authorIndex"
        >
          <a
            v-text="author.name"
            href="#"
            :title="author.url"
            @click.prevent="openExternal"
          ></a>
        </li>
      </ul>

      <h3>Built with:</h3>
      <ul>
        <li><strong>Git</strong> (v{{ versions.git }})</li>
        <li><strong>NW.js</strong> (v{{ versions.nw }})
          <ul>
            <li><strong>Chromium</strong> (v{{ versions.chromium }})</li>
            <li><strong>Node.js</strong> (v{{ versions.node }})</li>
          </ul>
        </li>
        <li><strong>Vue.js</strong> (v{{ clean(versions.vue) }})</li>
        <li><strong>Pinia</strong> (v{{ clean(versions.pinia) }})</li>
        <li><strong>Remix Icons</strong></li>
      </ul>
    </div>
  </ViewWrapper>
</template>

<script>
import { mapActions } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';

import { APP_NAME } from '@/helpers/constants.js';

import ViewWrapper from '@/views/ViewWrapper.vue';

const exec = window.nw.require('child_process').exec;
const manifest = window.nw.App.manifest;
const versions = window.nw.process.versions;

export default {
  name: 'AppSettings',
  components: {
    ViewWrapper
  },
  constants: {
    APP_NAME
  },
  data: function () {
    return {
      authors: [
        {
          name: 'Drew Radcliff',
          url: 'https://www.drewradcliff.com'
        },
        {
          name: 'J. Lewis',
          url: 'https://github.com/lewxdev'
        }
      ],
      versions: {
        app: manifest.version,
        chromium: versions.chromium,
        git: '',
        node: versions.node,
        nw: versions.nw,
        pinia: manifest.devDependencies.pinia,
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
          this.addErrorAlert('Failed to retrieve Git version.', error);
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
      'addErrorAlert'
    ])
  },
  created: function () {
    this.getGitVersion();
  }
};
</script>

<style scoped>
</style>
