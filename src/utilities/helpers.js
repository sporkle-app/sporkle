const fs = nw.require('fs');
const path = nw.require('path');

const helpers = {
  setCurrentWorkingDirectory: function (dir) {
    dir = dir.trim();
    if (fs.existsSync(dir)) {
      nw.process.chdir(path.join(dir));
    }
  }
};

export default helpers;
