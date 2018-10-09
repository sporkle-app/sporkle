import { shallowMount } from '@vue/test-utils';

import App from '@/App.vue';

describe('App.vue', () => {
  test('Default snapshot', () => {
    const msg = 'new message';
    const wrapper = shallowMount(App);

    expect(wrapper.html())
      .toMatchSnapshot();
  });
});
