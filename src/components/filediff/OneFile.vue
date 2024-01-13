<template>
  <div class="one-file">
    <div
      class="file-header truncate"
      :class="{ expanded: !isCollapsed }"
      role="button"
      tabindex="0"
      @click="isCollapsed = !isCollapsed"
      @keyup.enter="isCollapsed = !isCollapsed"
    >
      <span v-if="isCollapsed">▶️</span>
      <span v-else>🔻</span>
      {{ file.path }}
    </div>
    <transition name="collapse">
      <div v-if="!isCollapsed" class="file-diff-container">
        <pre
          v-for="(row, rowIndex) in diffRows"
          :class="rowClass(row)"
          :key="'row' + rowIndex"
        >{{ row }}</pre>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'OneFile',
  props: {
    file: {
      type: Object,
      required: true,
      validator: function (val) {
        let validity = true;
        if (!val || !val.path || typeof(val.path) !== 'string') {
          validity = false;
        }
        return validity;
      }
    }
  },
  data: function () {
    return {
      isCollapsed: true,
      rawDiff: `diff --git a/src/views/FileDiff.vue b/src/views/FileDiff.vue
index 2f9a826..213c167 100644
--- a/src/views/FileDiff.vue
+++ b/src/views/FileDiff.vue
@@ -19,12 +19,28 @@ export default {
   data: function () {
     return {
       files: [
-        {
-          path: 'C:\\Folder'
-        },
-        {
-          path: 'C:\\Users\\Bob\\GitHub\\Reponame'
-        }
+        { path: 'C:\\Folder' },
+        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
+        { path: 'C:\\Folder' },
+        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
+        { path: 'C:\\Folder' },
+        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
+        { path: 'C:\\Folder' },
+        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
+        { path: 'C:\\Folder' },
+        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
+        { path: 'C:\\Folder' },
+        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
+        { path: 'C:\\Folder' },
+        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
+        { path: 'C:\\Folder' },
+        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
+        { path: 'C:\\Folder' },
+        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
+        { path: 'C:\\Folder' },
+        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
+        { path: 'C:\\Folder' },
+        { path: 'C:\\Users\\Bob\\GitHub\\Reponame\\asdf\\qwer\\dfg\\rttryuqrewv
ca\\qwer\\asdfqwerfzxv\\qwer\\asvasvr\\ascaweawe\\cwacawsdca\\acwecawecasd\\qweq
c\\sdfvs' }
       ]
     };
   }`
    };
  },
  methods: {
    rowClass: function (row) {
      let color = '';

      if (row.startsWith('+')) {
        color = 'green-diff';
      } else if (row.startsWith('-')) {
        color = 'red-diff';
      }

      let classes = [
        'row-diff',
        color
      ].join(' ').trim();

      return classes.trim();
    }
  },
  computed: {
    diffRows: function () {
      return this.rawDiff.split('\n');
    }
  }
};
</script>

<style scoped>
.file-header {
  width: 100%;
}
.file-header.expanded {
  white-space: unset;
  word-break: break-all;
}
</style>
