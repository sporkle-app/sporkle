import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';

import AppSettings from '@/views/AppSettings.vue';
import helpers from '../testHelpers.js';

describe('AppSettings.vue', () => {
  let store;
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    global.nw = helpers.nw;

    store = new Store({
      state: {
        themes: []
      },
      getters: {},
      mutations: {},
      actions: {},
      modules: {
        appSettings: {
          namespaced: true,
          state: {
            customScrollbars: true,
            theme: ''
          }
        }
      }
    });
  });

  describe('Created', () => {
    test('Default snapshot', () => {
      const wrapper = shallowMount(AppSettings, {
        store,
        localVue
      });

      expect(wrapper.html())
        .toMatchSnapshot();
    });
  });
});
