const fs = nw.require('fs');
const path = nw.require('path');

const helpers = {
  setCurrentWorkingDirectory: function (dir) {
    dir = dir.trim();
    if (fs.existsSync(dir)) {
      nw.process.chdir(path.join(dir));
    }
  },
  setHtmlTagClasses: function (theme, useCustomScrollbars) {
    let customScrollbars = '';
    if (useCustomScrollbars) {
      customScrollbars = 'custom-scrollbars';
    }

    let classes = [
      theme,
      customScrollbars
    ].join(' ').trim();

    document.documentElement.className = classes;
  }
};

export default helpers;
