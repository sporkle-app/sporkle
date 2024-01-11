<template>
  <div class="repos-list-controls">
    <button disabled>New folder</button>
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
  name: 'ReposListControls'
};
</script>

<style>
.repos-list-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000A;
  padding: 10px;
}
.icons-container > a {
  margin-left: 10px;
  text-decoration: none;
}

</style>
