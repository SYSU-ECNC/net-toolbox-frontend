<template text-align="center">
  <n-result
    id="welcome"
    status="418"
    title="欢迎来到ECNC网络工具箱！"
    description="点选上方选项以开始，或者"
  >
    <n-button>查看帮助</n-button>
  </n-result>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { NButton, NResult } from 'naive-ui';

export default defineComponent({
  name: 'NotFound',
  components: {
    NButton,
    NResult,
  },
});
</script>
<style>
#welcome {
  margin-top: 150px;
}
</style>
