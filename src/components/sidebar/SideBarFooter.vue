<template>
  <div class="sidebar-footer">
    <div class="icons-container">
      <RouterLink
        v-text="'🔧'"
        title="Settings"
        :to="{ name: 'settings' }"
      />
      <RouterLink
        v-text="'❔'"
        title="About"
        :to="{ name: 'about' }"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBarFooter'
};
</script>

<style>
.sidebar-footer {
  display: flex;
  align-items: center;
  justify-content: end;
  background: #000A;
  padding: 10px;
}
.icons-container > a {
  margin-left: 10px;
  text-decoration: none;
}

</style>
