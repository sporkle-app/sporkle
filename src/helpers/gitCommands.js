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
