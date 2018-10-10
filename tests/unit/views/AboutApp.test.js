import { shallowMount } from '@vue/test-utils';

import AboutApp from '@/views/AboutApp.vue';

describe('AboutApp.vue', () => {
  describe('Created', () => {
    test('Default snapshot', () => {
      const wrapper = shallowMount(AboutApp);

      expect(wrapper.html())
        .toMatchSnapshot();
    });
  });
});
