<template>
  <div class="filediff">
    <one-file
      v-for="(file, fileIndex) in files"
      :key="'file' + fileIndex"
      :file="file"
    />
  </div>
</template>

<script>
import OneFile from '@/components/filediff/OneFile.vue';

export default {
  name: 'FileDiff',
  components: {
    'one-file': OneFile
  },
  data: function () {
    return {
      files: [
        {
          path: 'C:\\Folder'
        },
        {
          path: 'C:\\Users\\Bob\\GitHub\\Reponame'
        }
      ]
    };
  }
};
</script>
