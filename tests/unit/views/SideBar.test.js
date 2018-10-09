import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';

import SideBar from '@/views/SideBar.vue';

describe('SideBar.vue', () => {
  let store;
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);

    store = new Store({
      state: {
        sidebarCollapsed: false
      },
      getters: {},
      mutations: {},
      actions: {}
    });
  });

  describe('Created', () => {
    test('Default snapshot', () => {
      const wrapper = shallowMount(SideBar, {
        store,
        localVue
      });

      expect(wrapper.html())
        .toMatchSnapshot();
    });
  });
});
