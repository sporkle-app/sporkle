<template>
  <div class="one-file">
    <div class="file-header" @click="isCollapsed = !isCollapsed">
      <span v-if="isCollapsed">&gt;</span>
      <span v-else>v</span>
      {{ file.path }}
    </div>
    <div v-if="!isCollapsed" class="file-diff-container">
      <pre
        v-for="(row, rowIndex) in diffRows"
        :key="'row' + rowIndex"
        :class="rowClass(row)"
      >{{ row }}</pre>
    </div>
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
   }`,
      asdf: []
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
