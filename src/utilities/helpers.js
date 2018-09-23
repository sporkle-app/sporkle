const path = nw.require('path');

const helpers = {
  setCurrentWorkingDirectory: function (dir) {
    nw.process.chdir(path.join(dir));
  }
};

export default helpers;
