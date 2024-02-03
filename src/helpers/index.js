const fs = window.require('fs');
const path = window.require('path');

const diacriticLess = window.require('diacriticless');

const helpers = {
  // sort array of strings ignoring case
  lowerCaseSort: function (a, b) {
    return a.localeCompare(b, undefined, { sensitivity: 'base' });
  },
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
  /**
   * Takes a string and makes it safe for url, git, and fs.
   *
   * @example
   * fileSystemSafeString('[Add FavoritePokémon! 2}');
   * // 'add-favoritePokemon-2'
   *
   * @param  {string} string  Any user input text
   * @return {string}         URL/File system/Git safe string
   */
  fileSystemSafeString: function (string) {
    string = string || '';
    // 'Pokémon' => 'Pokemon'
    string = diacriticLess(string);
    // convert all non-alphanumeric to hyphens
    string = string.replace(/[^a-zA-Z0-9]+/g, '-');
    // remove consecutive hyphens
    string = string.replace(/-+/g, '-');
    if (string.endsWith('-')) {
      // '-abc-' => '-abc'
      string = string.slice(0, -1);
    }
    if (string.startsWith('-')) {
      // '-abc' => 'abc'
      string = string.slice(1, string.length);
    }
    if (!string) {
      return '';
    }
    // 'My-CoolBranch' => 'my-coolBranch'
    string = string
      .split('-')
      .map((str) => {
        return str[0].toLowerCase() + str.slice(1, string.length);
      })
      .join('-');

    return string;
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
