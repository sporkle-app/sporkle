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

  describe('External link', () => {
    test('Click link', () => {
      const wrapper = shallowMount(AboutApp);

      wrapper.find({ ref: 'testExternalLink' }).trigger('click');

      expect(nw.Shell.openExternal)
        .toHaveBeenCalledWith('http://TheJaredWilcurt.com');
    });
  });
});
