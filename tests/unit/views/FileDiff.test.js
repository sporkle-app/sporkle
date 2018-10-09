import { shallowMount } from '@vue/test-utils';

import FileDiff from '@/views/FileDiff.vue';

describe('FileDiff.vue', () => {
  describe('Created', () => {
    test('Default snapshot', () => {
      const wrapper = shallowMount(FileDiff);

      expect(wrapper.html())
        .toMatchSnapshot();
    });
  });
});
