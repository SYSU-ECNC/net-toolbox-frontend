<template>
  <div id="pingform">
    <h2 id="pingheader">发起测试</h2>
    <n-button text type="info" id="selectagent">选择Agent</n-button>
    <n-select
      id="selector"
      v-model:value="chosenvalue"
      multiple
      filterable
      placeholder="搜索Agent..."
      :options="opt"
      clearable
    />
    <n-button text type="info" id="inputurl">目标参数</n-button>
    <n-input
      id="to-ping"
      v-model:value="to_ping"
      type="text"
      placeholder="在这里输入你要Ping的地址"
    />
    <n-button type="info" @click="GoPing" id="go-ping">Go!</n-button>

    <h2 id="pingmanagement">管理测试</h2>
    <n-data-table id="pingtable" :columns="columns" :data="data"></n-data-table>
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
      chosenvalue: '',
      to_ping: '',
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
#pingform {
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

#pingheader {
  grid-column-start: 1;
  grid-column-end: 2;
  justify-self: start;
}
#selectagent {
  grid-column-start: 1;
  grid-row-start: 2;
  justify-self: start;
}
#inputurl {
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
#pingmanagement {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 5;
  justify-self: start;
}
#pingtable {
  grid-row-start: 6;
  grid-column-start: 1;
  grid-column-end: 4;
  align-self: flex-start;
}
</style>
