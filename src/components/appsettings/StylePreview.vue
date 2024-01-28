<template>
  <div>
    <h3>Style Preview</h3>
    <OneFile :file="file" />
    <BaseAlert
      v-for="alert in alerts"
      :alert="alert"
      class="demo-alert"
      :key="alert.id"
    />
  </div>
</template>

<script>
import BaseAlert from '@/components/alerts/BaseAlert.vue';
import OneFile from '@/components/filediff/OneFile.vue';

export default {
  name: 'StylePreview',
  components: {
    BaseAlert,
    OneFile
  },
  constants: {
    alerts: [
      {
        id: 'dummy_success',
        status: 'success',
        message: 'Example success alert.'
      },
      {
        id: 'dummy_error',
        status: 'error',
        message: 'Example error alert.'
      }
    ],
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
