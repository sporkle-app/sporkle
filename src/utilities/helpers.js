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
  },
  validateRepoPath: function (repoPath) {
    let gitDir = path.join(repoPath, '.git');
    if (
      fs.existsSync(repoPath) &&
      fs.lstatSync(repoPath).isDirectory() &&
      fs.existsSync(gitDir) &&
      fs.lstatSync(gitDir).isDirectory()
    ) {
      return true;
    }
    return false;
  }
};

export default helpers;
