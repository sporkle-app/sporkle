const fs = window.require('node:fs');
const path = window.require('node:path');

const util = window.require('node:util');
const exec = util.promisify(window.require('node:child_process').exec);

const diacriticLess = window.require('diacriticless');
const openFolderExplorer = window.require('nw-programmatic-folder-select');

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
  openFileExplorerToSelectRepo: function (reposFolder) {
    return new Promise((resolve) => {
      const options = {
        title: 'Select your repo folder',
        directory: (reposFolder || undefined)
      };
      openFolderExplorer(window, options, resolve);
    });
  },
  removeRepoFromApp: async function (removeRepoFromListAndSave, repoPath, reposList, $router) {
    await removeRepoFromListAndSave(repoPath);

    const atLeastOneRepoExists = reposList.some((repo) => {
      return fs.existsSync(repo);
    });
    const noReposExist = !atLeastOneRepoExists;

    if (noReposExist) {
      await $router.push({ name: 'scanForRepos' });
    }
  },
  /**
   * Executes a child process with the supplied command, returns a promise.
   *
   * @param  {string} command  The executable and arguments to run.
   * @return {Promis}          Resolves to a string or rejects with error.
   */
  runCommand: async function (command) {
    console.log(command);
    let error;
    let output;
    try {
      const { stdout, stderr } = await exec(command);
      output = String(stdout || '');
      error = stderr;
    } catch (err) {
      error = err;
    }
    return new Promise((resolve, reject) => {
      if (error) {
        reject(error);
      } else {
        resolve(output);
      }
    });
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
