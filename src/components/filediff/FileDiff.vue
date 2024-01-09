<template>
  <div class="filediff">
    <OneFile
      v-for="(file, fileIndex) in files"
      :file="file"
      :key="'file' + fileIndex"
    />
  </div>
</template>

<script>
import OneFile from '@/components/filediff/OneFile.vue';

export default {
  name: 'FileDiff',
  components: {
    OneFile
  },
  data: function () {
    return {
      files: [
        { path: 'C:\\Folder' },
        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
        { path: 'C:\\Folder' },
        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
        { path: 'C:\\Folder' },
        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
        { path: 'C:\\Folder' },
        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
        { path: 'C:\\Folder' },
        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
        { path: 'C:\\Folder' },
        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
        { path: 'C:\\Folder' },
        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
        { path: 'C:\\Folder' },
        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
        { path: 'C:\\Folder' },
        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
        { path: 'C:\\Folder' },
        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
        { path: 'C:\\Folder' },
        { path: 'C:\\Users\\Bob\\GitHub\\Reponame\\asdf\\qwer\\dfg\\rttryuqrewvca\\qwer\\asdfqwerfzxv\\qwer\\asvasvr\\ascaweawe\\cwacawsdca\\acwecawecasd\\qweqc\\sdfvs' }
      ]
    };
  }
};
</script>
