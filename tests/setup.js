global.nw = {
  App: {
    manifest: {
      dependencies: {
        vue: '~0.0.0'
      },
      version: '0.0.0'
    },
    startPath: 'C:\\folder'
  },
  process: {
    versions: {
      chromium: '0.0.0',
      node: '0.0.0',
      nw: '0.0.0'
    }
  },
  require: function (str) {
    if (str === 'child_process') {
      return {
        exec: function (command, callback) {
          if (command === 'git --version') {
            callback(null, 'git version 2.12.2.windows.2 ');
          }
        }
      };
    }
    return require(str);
  },
  Shell: {
    openExternal: function (url) {
      jest.fn(url);
    }
  }
};
