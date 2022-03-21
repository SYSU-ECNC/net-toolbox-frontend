<template>
  <div id="agent-management">
    <h2 id="agent-title">Agent管理</h2>
    <n-button text type="info" id="register-token">注册Token:</n-button>
    <p id="real-token">这里是一个字符串这里是一个字符串</p>
    <n-data-table id="agent-table" :columns="agentColumns" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { NButton, NDataTable } from 'naive-ui';

const createColumns = () => {
  return [
    {
      title: 'Agent name',
      key: 'name',
    },
    {
      title: '在线情况',
      key: 'is_online',
    },
    {
      title: '操作',
      key: 'action',
    },
  ];
};

const agentColumns = createColumns();

export default defineComponent({
  name: 'AgentManagement',
  components: {
    NButton,
    NDataTable,
  },
  data() {
    return {
      agentColumns,
    };
  },
});
</script>

<style>
#agent-management {
  margin-left: 80px;
  margin-right: 80px;
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr 6fr 1fr 1fr;
  justify-items: center;
  align-items: center;
}
#agent-title {
  justify-self: flex-start;
  grid-column-start: 1;
  grid-column-end: 3;
}
#register-token {
  justify-self: flex-start;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
}
#real-token {
  grid-column-start: 2;
  grid-column-end: 5;
  grid-row-start: 2;
}
#agent-table {
  grid-column-start: 1;
  grid-column-end: 6;
  grid-row-start: 3;
}
</style>
