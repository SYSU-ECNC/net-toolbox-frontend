<template>
  <div id="ping-form">
    <h2 id="ping-header">发起测试</h2>
    <n-button text type="info" id="select-agent">选择Agent</n-button>
    <n-select
      id="selector"
      v-model:value="chosenValue"
      multiple
      filterable
      placeholder="搜索Agent..."
      :options="opt"
      clearable
    />
    <n-button text type="info" id="input-url">目标参数</n-button>
    <n-input
      id="to-ping"
      v-model:value="toPing"
      type="text"
      placeholder="在这里输入你要Ping的地址"
    />
    <n-button type="info" @click="goPing" id="go-ping">Go!</n-button>

    <h2 id="ping-management">管理测试</h2>
    <n-data-table id="ping-table" :columns="columns" :data="data"></n-data-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { NButton, NDataTable, NInput, NSelect } from 'naive-ui';

const createColumns = () => {
  return [
    {
      title: '时间',
      key: 'time',
    },
    {
      title: 'agent',
      key: 'agent',
    },
    {
      title: '状态',
      key: 'status',
    },
    {
      title: '操作',
      key: 'commands',
    },
  ];
};

export default defineComponent({
  name: 'PingForm',
  components: {
    NSelect,
    NButton,
    NInput,
    NDataTable,
  },
  methods: {
    goPing() {
      //这里用来提交指令到Master
    },
  },
  data() {
    return {
      chosenValue: '',
      toPing: '',
    };
  },
  setup() {
    return {
      opt: [
        {
          label: 'M5',
          value: 'M5',
        },
        {
          label: 'M8',
          value: 'M8',
          disabled: true,
        },
      ],
      data: ref([]),
      columns: createColumns(),
    };
  },
});
</script>
<style>
#ping-form {
  margin-left: 80px;
  margin-right: 80px;
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr 2fr 8fr;
  grid-template-rows: 50px 1fr 1fr 1fr 50px 300px;
  row-gap: 20px;
  justify-items: center;
  align-items: center;
}

#ping-header {
  grid-column-start: 1;
  grid-column-end: 2;
  justify-self: start;
}
#select-agent {
  grid-column-start: 1;
  grid-row-start: 2;
  justify-self: start;
}
#input-url {
  grid-column-start: 1;
  grid-row-start: 3;
  justify-self: start;
}

#selector {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 2;
}
#to-ping {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 3;
}
#go-ping {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 4;
}
#ping-management {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 5;
  justify-self: start;
}
#ping-table {
  grid-row-start: 6;
  grid-column-start: 1;
  grid-column-end: 4;
  align-self: flex-start;
}
</style>
