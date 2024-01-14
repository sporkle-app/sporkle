const fs = window.require('fs');
const path = window.require('path');

const helpers = {
  setCurrentWorkingDirectory: function (directory) {
    directory = (directory || '').trim();

    if (fs.existsSync(directory)) {
      window.process.chdir(path.join(directory));
    }
  },
  validateRepoPath: function (repoPath) {
    let gitDirectory = path.join(repoPath, '.git');
    if (
      fs.existsSync(repoPath) &&
      fs.lstatSync(repoPath).isDirectory() &&
      fs.existsSync(gitDirectory) &&
      fs.lstatSync(gitDirectory).isDirectory()
    ) {
      return true;
    }
    return false;
  }
};

export default helpers;
