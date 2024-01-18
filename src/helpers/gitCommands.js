import helpers from '@/helpers/index.js';

const util = window.require('node:util');
const exec = util.promisify(window.require('node:child_process').exec);

export async function gitBranches (currentRepoPath) {
  helpers.setCurrentWorkingDirectory(currentRepoPath);
  const { error, stdout, stderr } = await exec('git branch');

  return new Promise((resolve, reject) => {
    if (error || stderr) {
      reject(error || stderr);
    } else {
      const branches = (stdout || '')
        .replaceAll('*', '')
        .replaceAll('\r', '')
        .split('\n')
        .map((branch) => {
          return branch.trim();
        })
        .filter(Boolean);

      resolve(branches);
    }
  });
}

export async function getStatus (currentRepoPath) {
  helpers.setCurrentWorkingDirectory(currentRepoPath);
  const { error, stdout, stderr } = await exec('git status');

  return new Promise((resolve, reject) => {
    if (error || stderr) {
      reject(error || stderr);
    } else {
      resolve(stdout);
    }
  });
}

export function getUnstagedFiles (currentRepoPath) {
  return new Promise((resolve, reject) => {
    getStatus(currentRepoPath)
      .then((status) => {
        let lines = status
          .split('\n')
          .map((line) => {
            return line.trim();
          })
          .filter((line) => {
            return (
              line &&
              !line.startsWith('On branch') &&
              !line.startsWith('(')
            );
          });
        const untrackedIndex = lines.findIndex((line) => {
          return line.startsWith('Untracked files:');
        });
        let unstagedFiles = lines
          .slice(0, untrackedIndex)
          .join('\n')
          .replaceAll('Changes not staged for commit:\n', '')
          .split('\n')
          .map((line) => {
            return {
              status: line.split(':')[0].trim(),
              file: line.split(':')[1].trim()
            };
          });

        resolve(unstagedFiles);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getAheadByCommits (currentRepoPath) {
  return new Promise((resolve, reject) => {
    getStatus(currentRepoPath)
      .then((status) => {
        // The (.*) is a group, so it's value will be in the 1 index position of the match
        const regexTest = /Your branch is ahead of .* by (.*) commit/;

        let match = status.match(regexTest) || [];
        let aheadBy = match[1] || '0';
        // I don't actually know if large commits can contain delimeters, just doing this for safety
        aheadBy = aheadBy.replaceAll(',', '');
        aheadBy = aheadBy.replaceAll('.', '');
        // Probably could use a safety check here
        resolve(parseInt(aheadBy));
      })
      .catch((error) => {
        reject(error);
      });
  });
}
