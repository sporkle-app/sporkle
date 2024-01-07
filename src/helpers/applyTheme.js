/* eslint-disable import/no-unused-modules */

const isDesktop = !!window.nw;

const hardCodedThemesList = Object.freeze([
  'cerulean',
  'cosmo',
  'cyborg',
  'darkly',
  'flatly',
  'journal',
  'litera',
  'lumen',
  'lux',
  'materia',
  'minty',
  'morph',
  'pulse',
  'quartz',
  'sandstone',
  'simplex',
  'sketchy',
  'slate',
  'solar',
  'spacelab',
  'superhero',
  'united',
  'vapor',
  'yeti',
  'zephyr'
]);
const bootswatchPath = function () {
  if (isDesktop) {
    const path = window.require('path');
    return path.join('.', 'node_modules', 'bootswatch', 'dist');
  }
  return;
};
export const dynamicallyLoadThemesList = function () {
  if (isDesktop) {
    const fs = window.require('fs');
    let list;
    try {
      list = fs.readdirSync(bootswatchPath());
    } catch (err) {
      console.log(err);
    }
    return list || hardCodedThemesList;
  }
  return hardCodedThemesList;
};

const cssData = {};
let initialized = false;
const initialize = function () {
  if (initialized) {
    return;
  }
  const swatches = dynamicallyLoadThemesList();
  if (isDesktop) {
    const fs = window.require('fs');
    const path = window.require('path');
    swatches.forEach((swatchName) => {
      const file = path.join(bootswatchPath(), swatchName, 'bootstrap.min.css');
      cssData[swatchName] = String(fs.readFileSync(file));
    });
  }
  initialized = true;
};

export const updateCss = function (selectedTheme) {
  selectedTheme = selectedTheme || 'darkly';
  initialize();
  if (isDesktop) {
    const styleEl = window.document.getElementById('desktop-styles');
    styleEl.innerHTML = cssData[selectedTheme];
  } else {
    const linkEl = window.document.getElementById('web-styles');
    linkEl.setAttribute('href', 'https://unpkg.com/bootswatch/dist/' + selectedTheme + '/bootstrap.min.css');
  }
};
