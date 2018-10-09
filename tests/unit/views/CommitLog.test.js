import { shallowMount } from '@vue/test-utils';

import CommitLog from '@/views/CommitLog.vue';

describe('CommitLog.vue', () => {
  describe('Created', () => {
    test('Default snapshot', () => {
      const wrapper = shallowMount(CommitLog);

      expect(wrapper.html())
        .toMatchSnapshot();
    });
  });
});
