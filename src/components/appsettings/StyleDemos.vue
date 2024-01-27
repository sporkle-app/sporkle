<template>
  <div>
    <h3>Style Preview</h3>
    <OneFile :file="file" />
    <BaseAlert
      class="demo-alert"
      :alert="successAlert"
    />
    <BaseAlert
      class="demo-alert"
      :alert="errorAlert"
    />
  </div>
</template>

<script>
import BaseAlert from '@/components/alerts/BaseAlert.vue';
import OneFile from '@/components/filediff/OneFile.vue';

export default {
  name: 'StyleDemos',
  components: {
    BaseAlert,
    OneFile
  },
  constants: {
    successAlert: {
      id: 'dummy_success',
      status: 'success',
      message: 'Example success alert.'
    },
    errorAlert: {
      id: 'dummy_error',
      status: 'error',
      message: 'Example error alert.'
    },
    file: {
      newPath: 'Example diff',
      hunks: [
        {
          changes: [
            {
              isNormal: true,
              lineNumber: 1,
              content: 'This line is unchanged.'
            },
            {
              isDelete: true,
              oldLineNumber: 2,
              content: 'This is the old line.'
            },
            {
              isInsert: true,
              newLineNumber: 2,
              content: 'This is the new line.'
            },
            {
              isNormal: true,
              lineNumber: 3,
              content: 'This line is unchanged.'
            }
          ]
        }
      ]
    }
  }
};
</script>

<style scoped>
.demo-alert {
  margin: 10px 0px;
}
</style>
