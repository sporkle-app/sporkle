<template>
  <div class="about-app">
    {{ appTitle }} is a Cross-Platform Git client made by
    <strong>
      <a
        href="#"
        title="http://TheJaredWilcurt.com"
        @click.prevent="openExternal"
        ref="testExternalLink"
      >
        The Jared Wilcurt
      </a>
    </strong>.

    <ul>
      <li><strong>{{ appTitle }}</strong> (v{{ versions.app }})</li>
      <li><strong>Git</strong> (v{{ versions.git }})</li>
      <li><strong>NW.js</strong> (v{{ versions.nw }})
        <ul>
          <li><strong>Chromium</strong> (v{{ versions.chromium }})</li>
          <li><strong>Node.js</strong> (v{{ versions.node }})</li>
        </ul>
      </li>
      <li><strong>Vue.js</strong> (v{{ versions.vue | clean }})</li>
    </ul>
  </div>
</template>

<script>
const exec = nw.require('child_process').exec;

export default {
  name: 'AppSettings',
  data: function () {
    return {
      appTitle: 'Karng Darbo',
      versions: {
        app: nw.App.manifest.version,
        chromium: nw.process.versions.chromium,
        git: '',
        node: nw.process.versions.node,
        nw: nw.process.versions.nw,
        vue: nw.App.manifest.dependencies.vue
      }
    };
  },
  methods: {
    getGitVersion: function () {
      exec('git --version', (err, data) => {
        if (err) {
          this.$store.commit('setAppError', String(err));
        }
        this.versions.git = data.replace('git version ', '').trim();
      });
    },
    openExternal: function (evt) {
      let url = evt.target.title;
      nw.Shell.openExternal(url);
    }
  },
  filters: {
    clean: function (val) {
      return val.replace('^', '').replace('~', '').trim();
    }
  },
  created: function () {
    this.getGitVersion();
  }
};
</script>
