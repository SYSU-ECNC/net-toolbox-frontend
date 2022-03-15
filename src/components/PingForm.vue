<template>
  <h1>Ping查询</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PingForm',
  methods: {
    agentselect() {
      return {
        form: {
          code: '',
          name: '',
        },
        value: '',
        options: [],
      };
    },
    ping() {},
  },
});
</script>
