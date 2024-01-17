const fs = window.require('fs');
const path = window.require('path');

const helpers = {
  /**
   * Creates a unique ID based on time stamp and Math.random.
   *
   * @return {string} A unique ID
   */
  generateUniqueId: function () {
    const time = (new Date()).getTime();
    const random = Math.round(Math.random() * 100000);

    // '1625086108959_36124'
    const id = time + '_' + random;
    return id;
  },
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
