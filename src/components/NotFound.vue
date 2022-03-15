<template>
  <div>
    <div id="blank"></div>
    <n-result
      status="404"
      title="404 资源不存在"
      description="生活总归带点荒谬"
    >
      <template #footer>
        <n-button onclick='window.location.href="#/ping"'
          >算了，回去继续Ping</n-button
        >
      </template>
    </n-result>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { NButton, NResult } from 'naive-ui';

export default defineComponent({
  name: 'NotFound',
  components: {
    NResult,
    NButton,
  },
});
</script>

<style>
#blank {
  height: 150px;
}
</style>
