import _upperFirst from 'lodash-es/upperFirst.js';
import { defineStore } from 'pinia';

const LOADING_TYPES = [
  'branches',
  'commits',
  'fileDiffs',
  'gitStatus',
  'gitRemotes',
  'repos',
  'routing',
  'settings'
];
const LOADING_STATES = {};
const LOADING_ACTIONS = {};

LOADING_TYPES.forEach((type) => {
  let Type = _upperFirst(type);
  LOADING_STATES[type + 'Loading'] = false;
  LOADING_ACTIONS['set' + Type + 'Loading'] = function (bool) {
    this[type + 'Loading'] = bool;
  };
});

export const appLoadingStore = defineStore('appLoading', {
  state: function () {
    return LOADING_STATES;
  },
  actions: LOADING_ACTIONS,
  getters: {
    appLoading: function (state) {
      return LOADING_TYPES.some((type) => {
        return state[type + 'Loading'];
      });
    }
  }
});
