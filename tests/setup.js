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
  require: function (moduleName) {
    if (moduleName === 'child_process') {
      return {
        exec: function (command, callback) {
          if (command === 'git --version') {
            callback(null, 'git version 0.0.0.windows.0 ');
          }
        }
      };
    }
    return require(moduleName);
  },
  Shell: {
    openExternal: jest.fn()
  }
};
