import { OhVueIcon, addIcons } from 'oh-vue-icons';
import {
  RiArrowDownSFill,
  RiCheckboxBlankLine,
  RiCheckboxCircleLine,
  RiCheckboxFill,
  RiCloseLine,
  RiInformationLine,
  RiLayoutColumnFill,
  RiLayoutColumnLine,
  RiLoader5Fill,
  RiSettings5Fill
} from 'oh-vue-icons/icons/index.js';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import constantsPlugin from 'vue-options-api-constants-plugin';

import { router } from '@/router/index.js';

import applyPrototypes from '@/helpers/applyPrototypes.js';

import App from '@/App.vue';

import '@/assets/main.css';

addIcons(
  RiArrowDownSFill,
  RiCheckboxBlankLine,
  RiCheckboxCircleLine,
  RiCheckboxFill,
  RiCloseLine,
  RiInformationLine,
  RiLayoutColumnFill,
  RiLayoutColumnLine,
  RiLoader5Fill,
  RiSettings5Fill
);

const app = createApp(App);
applyPrototypes(app.config.globalProperties);
app.use(createPinia());
app.use(router);
app.use(constantsPlugin);
app.component('VIcon', OhVueIcon);
app.mount('#app');
