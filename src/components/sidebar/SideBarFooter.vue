<template>
  <div class="sidebar-footer">
    <div class="icons-container">
      <RouterLink
        class="sidebar-footer-link"
        :to="{ name: 'settings' }"
        @focusin="settingsHover = true"
        @focusout="settingsHover = false"
        @mouseover="settingsHover = true"
        @mouseout="settingsHover = false"
      >
        <BaseIcon
          name="RiSettings5Fill"
          :animation="settingsHover ? 'spin' : undefined"
          scale="1.2"
          speed="slow"
        />
        Settings
      </RouterLink>
      <RouterLink
        class="sidebar-footer-link"
        :to="{ name: 'about' }"
        @focusin="infoHover = true"
        @focusout="infoHover = false"
        @mouseover="infoHover = true"
        @mouseout="infoHover = false"
      >
        <BaseIcon
          name="RiInformationLine"
          :animation="infoHover ? 'wrench': undefined"
          scale="1.2"
        />
        About
      </RouterLink>
    </div>
  </div>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue';

export default {
  name: 'SideBarFooter',
  components: {
    BaseIcon
  },
  data: function () {
    return {
      infoHover: false,
      settingsHover: false
    };
  }
};
</script>

<style>
.sidebar-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--black66);
  padding: 10px;
}
.sidebar-footer-link {
  margin-left: 10px;
  text-decoration: none;
}
</style>
