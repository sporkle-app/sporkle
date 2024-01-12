<template>
  <div class="sidebar-footer">
    <div class="icons-container">
      <RouterLink
        :to="{ name: 'settings' }"
        @mouseover="settingsHover = true"
        @mouseout="settingsHover = false"
      >
        <VIcon
          :animation="settingsHover ? 'spin' : undefined"
          name="ri-settings-5-fill"
          scale="1.2"
          speed="slow"
        />
        Settings
      </RouterLink>
      <RouterLink
        :to="{ name: 'about' }"
        @mouseover="infoHover = true"
        @mouseout="infoHover = false"
      >
        <VIcon
          :animation="infoHover ? 'wrench': undefined"
          name="ri-information-line"
          scale="1.2"
        />
        About
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBarFooter',
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
  background: #000A;
  padding: 10px;
}
.icons-container > a {
  margin-left: 10px;
  text-decoration: none;
}

</style>
