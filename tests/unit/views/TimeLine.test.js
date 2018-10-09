import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';

import mutations from '@/store/mutations.js';
import TimeLine from '@/views/TimeLine.vue';

describe('TimeLine.vue', () => {
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
      mutations,
      actions: {}
    });
  });

  describe('Created', () => {
    test('Default snapshot', () => {
      const wrapper = shallowMount(TimeLine, {
        store,
        localVue
      });

      expect(wrapper.html())
        .toMatchSnapshot();
    });
  });

  describe('Sidebar', () => {
    test('Hide sidebar', () => {
      const wrapper = shallowMount(TimeLine, {
        store,
        localVue
      });

      wrapper.find({ ref: 'testToggleSidebar' }).trigger('click');

      expect(wrapper.html())
        .toMatchSnapshot();
    });
  });
});
