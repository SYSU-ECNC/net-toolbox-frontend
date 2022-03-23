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
    <n-button text type="info" id="input-url">Ping目标</n-button>
    <n-input
      id="to-ping"
      v-model:value="toPing"
      type="text"
      placeholder="在这里输入你要Ping的地址，例：www.bilibili.com"
    />
    <n-button text type="info" id="input-number">发包数量</n-button>
    <n-input
      id="pack-number"
      v-model:value="packNumber"
      type="text"
      placeholder="输入数字"
    />
    <n-button type="info" @click="goPing" id="go-ping">Go!</n-button>

    <h2 id="ping-management">管理测试</h2>
    <n-data-table
      id="ping-table"
      :columns="tableColumns"
      :data="tableData"
      :max-height="250"
      :row-key="(tableData: any) => {
        return `${tableData.time}`;
      }"
    ></n-data-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { NButton, NDataTable, NInput, NSelect } from 'naive-ui';

const createColumns = () => {
  return [
    {
      type: 'expand',
      expandable: (rowData: any) => rowData.isDone === '已完成',
      renderExpand: (tableData: any) => {
        return `${tableData.details}`;
      },
    },
    {
      title: '时间',
      key: 'time',
    },
    {
      title: 'agents',
      key: 'agents',
    },
    {
      title: '状态',
      key: 'isDone',
    },
  ];
};

const tableColumns = createColumns();

//下面的opt和tableData都是仅供演示，之后改成从接口获取数据。tableData有这么多行是为了测试滚动条……
var opt = [
  {
    label: 'M5',
    value: 'M5',
  },
  {
    label: 'M8',
    value: 'M8',
    disabled: true,
  },
];

var tableData = [
  {
    time: '2022.2.2 12:22',
    agents: 'M5',
    isDone: 'true',
    details:
      '--- weibo.com ping statistics ---6 packets transmitted, 6 packets received, 0.0% packet loss round-trip min/avg/max/stddev = 45.767/66.305/139.275/32.939 ms',
  },
  {
    time: '2022.2.3 23:33',
    agents: 'M8',
    isDone: 'false',
    details:
      '--- bilibili.com ping statistics --- 4 packets transmitted, 4 packets received, 0.0% packet loss round-trip min/avg/max/stddev = 10.690/33.271/82.831/28.853 ms',
  },
  {
    time: '2022.2.3 23:34',
    agents: 'M8',
    isDone: 'true',
    details:
      '--- bilibili.com ping statistics --- 4 packets transmitted, 4 packets received, 0.0% packet loss round-trip min/avg/max/stddev = 10.690/33.271/82.831/28.853 ms',
  },
  {
    time: '2022.2.3 23:35',
    agents: 'M8',
    isDone: 'false',
    details:
      '--- bilibili.com ping statistics --- 4 packets transmitted, 4 packets received, 0.0% packet loss round-trip min/avg/max/stddev = 10.690/33.271/82.831/28.853 ms',
  },
  {
    time: '2022.2.3 23:36',
    agents: 'M8',
    isDone: 'false',
    details:
      '--- bilibili.com ping statistics --- 4 packets transmitted, 4 packets received, 0.0% packet loss round-trip min/avg/max/stddev = 10.690/33.271/82.831/28.853 ms',
  },
  {
    time: '2022.2.3 23:37',
    agents: 'M8',
    isDone: 'false',
    details:
      '--- bilibili.com ping statistics --- 4 packets transmitted, 4 packets received, 0.0% packet loss round-trip min/avg/max/stddev = 10.690/33.271/82.831/28.853 ms',
  },
];

function tableDataProcess() {
  //之后从后端获取JSON，在这里加一句JSON.parse……话说在JSON里写'true'的话，转换过来应该也还是字符串吧？
  for (var i = 0; i < tableData.length; i++) {
    if (tableData[i].isDone == 'true') {
      tableData[i].isDone = '已完成';
    } else {
      tableData[i].isDone = '进行中';
    }
  }
}

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
      tableColumns,
      opt,
      tableData,
      packNumber: '',
    };
  },
  setup() {
    tableDataProcess();
    return tableData;
  },
});
</script>
<style>
#ping-form {
  margin-left: 80px;
  margin-right: 80px;
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr 6fr 1fr 1fr;
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
  grid-column-end: 6;
  grid-row-start: 2;
}
#to-ping {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 3;
}
#go-ping {
  grid-column-start: 1;
  grid-column-end: 6;
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
  grid-column-end: 6;
  align-self: flex-start;
}
#input-number {
  grid-row-start: 3;
  grid-column-start: 4;
  grid-column-end: 5;
}
#pack-number {
  grid-row-start: 3;
  grid-column-start: 5;
  grid-column-end: 6;
}
</style>
