const fs = require('fs');

const buildScript = {
  // Data accessed across multiple methods
  data: {
    manifest: ''
  },
  // Read the main package.json file
  readManifest: function () {
    this.data.manifest = fs.readFileSync('./package.json');
    this.data.manifest = String(this.data.manifest);
    this.data.manifest = JSON.parse(this.data.manifest);
  },
  clearOutScripts: function () {
    let scripts = this.data.manifest.scripts;
    if (scripts) {
      delete scripts.start;
      delete scripts.dev;
      delete scripts.serve;
      delete scripts.build;
      delete scripts.lint;
      delete scripts.fix;
      delete scripts.sass;
      delete scripts.sasslint;
      delete scripts.sassfix;
      delete scripts['test:unit'];
    }

    if (Object.keys(scripts).length === 0) {
      delete this.data.manifest.scripts;
    }
  },
  // Set the entry point to the static html file in dist folder
  setEntryPoint: function () {
    this.data.manifest.main = 'index.html';
  },
  // Remove the dependencies, everything should be included
  // in the built files from webpack.
  removeDependencies: function () {
    let deps = this.data.manifest.dependencies;

    if (deps) {
      delete deps.vue;
      delete deps.vuex;
      delete deps['vue-router'];
    }
    if (Object.keys(deps).length === 0) {
      delete this.data.manifest.dependencies;
    }
    if (this.data.manifest.devDependencies) {
      delete this.data.manifest.devDependencies;
    }
  },
  // Since we are not running a local webserver, we do not
  // need to allow localhost access to node.
  restrictNodeRemote: function () {
    let nodeMain = this.data.manifest['node-main'];
    let nodeRemote = this.data.manifest['node-remote'];
    if (!nodeMain && nodeRemote) {
      delete this.data.manifest['node-remote'];
    }
  },
  // Developer tools are not needed in production
  removeVueDevtools: function () {
    let vueDevTools = './node_modules/nw-vue-devtools/extension';
    let loadExtension = '--load-extension=\'' + vueDevTools + '\'';
    let args = this.data.manifest['chromium-args'];

    if (args) {
      // Remove just the Vue Dev Tools loader
      args = args.replace(loadExtension, '');
      // If they are loading another extension, just remove the Vue Devtools
      args = args.replace(vueDevTools, '');
      this.data.manifest['chromium-args'] = args;
      if (args.length === 0) {
        delete this.data.manifest['chromium-args'];
      }
    }
  },
  // For example, your window.icon may point to the public folder
  // in development, but won't in production.
  removePublicPrefix: function () {
    let manifest = this.data.manifest;
    manifest = JSON.stringify(manifest);
    manifest = manifest.split('public/').join('');
    manifest = JSON.parse(manifest);
    this.data.manifest = manifest;
  },
  // Save the file to the dist folder
  writeManifest: function () {
    let manifest = JSON.stringify(this.data.manifest, null, 2);
    fs.writeFileSync('./dist/package.json', manifest);
  },
  build: function () {
    this.readManifest();

    this.clearOutScripts();
    this.removeDependencies();
    this.setEntryPoint();
    this.restrictNodeRemote();
    this.removeVueDevtools();
    this.removePublicPrefix();

    this.writeManifest();
  }
};

buildScript.build();
