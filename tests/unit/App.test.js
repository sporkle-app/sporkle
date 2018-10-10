import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';

import App from '@/App.vue';

describe('App.vue', () => {
  let store;
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);

    store = new Store({
      state: {
        appError: ''
      },
      getters: {},
      mutations: {},
      actions: {}
    });
  });

  describe('Created', () => {
    test('Default snapshot', () => {
      const wrapper = shallowMount(App, {
        store,
        localVue
      });

      expect(wrapper.html())
        .toMatchSnapshot();
    });
  });
});
