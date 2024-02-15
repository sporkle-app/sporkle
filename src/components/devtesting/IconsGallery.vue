<template>
  <section class="icons-gallery">
    <h3>Installed icons</h3>
    <div class="icon-controls">
      <BaseSelect
        v-model="flip"
        label="Flip"
        :options="flipTypes"
      />

      <BaseSelect
        v-model="animation"
        label="Animation"
        :options="animationTypes"
      />
      <BaseSelect
        v-model="speed"
        label="Speed"
        :options="speeds"
      />
      <BaseCheckbox v-model="hover">
        <strong>Animation on hover</strong>
      </BaseCheckbox>

      <RangeSlider
        v-model="scale"
        min="1"
        max="60"
      >
        <strong>Scale: {{ scale / 10 }}</strong>
      </RangeSlider>
    </div>
    <div class="icons-container">
      <div
        v-for="iconName in allIconNames"
        :key="iconName"
      >
        <BaseIcon
          :name="iconName"
          :animation="animation || undefined"
          :flip="flip || undefined"
          :hover="hover"
          :scale="scale / 10"
          :speed="speed || undefined"
        />
        <p>{{ iconName }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import BaseCheckbox from '@/components/BaseCheckbox.vue';
import BaseIcon, { allIconNames } from '@/components/BaseIcon.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import RangeSlider from '@/components/RangeSlider.vue';

export default {
  name: 'IconsGallery',
  components: {
    BaseCheckbox,
    BaseIcon,
    BaseSelect,
    RangeSlider
  },
  constants: {
    allIconNames,
    animationTypes: [
      undefined,
      'flash',
      'float',
      'ring',
      'pulse',
      'spin',
      'spin-pulse',
      'wrench'
    ],
    flipTypes: [
      undefined,
      'vertical',
      'horizontal',
      'both'
    ],
    speeds: [
      undefined,
      'slow',
      'fast'
    ]
  },
  data: function () {
    return {
      animation: undefined,
      flip: undefined,
      hover: true,
      scale: 10,
      speed: undefined
    };
  }
};
</script>

<style scoped>
.icon-controls {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.icons-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.icons-container div {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
</style>

<style>
.icons-gallery .range-slider-value {
  display: none;
}
</style>
