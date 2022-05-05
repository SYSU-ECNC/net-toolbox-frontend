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

    <h2 id="ping-search">查询测试</h2>
    <n-input
      id="ping-id"
      v-model:value="toSearch"
      type="text"
      placeholder="请输入要查询的测试ID（可在下方的管理测试表格中获取）"
    />
    <n-button type="info" @click="goSearch" id="go-search">开始查询</n-button>
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

import axios from 'axios';
import { NButton, NDataTable, NInput, NSelect } from 'naive-ui';

export default defineComponent({
  name: 'PingForm',
  components: {
    NSelect,
    NButton,
    NInput,
    NDataTable,
  },
  methods: {
    //用来post ping指令
    goPing() {
      if (isNaN(parseInt(this.packNumber)) == false) {
        var namestr = this.chosenValue.toString();
        var name = namestr.split(',');
        var command =
          'ping' +
          ' ' +
          this.toPing +
          ' ' +
          '-n' +
          ' ' +
          parseInt(this.packNumber);
        let postdata = { name: name, command: command };
        console.log(postdata);
        //这里要改成url，现在只有本地json所以运行会报错
        axios
          .post('/user/ping', postdata)
          .then((res) => {
            console.log(res);
            let status = res.data.status;
            if (status == true) {
              window.alert('任务提交成功！');
            } else {
              window.alert('任务提交失败，请检查所填写的内容，稍后再试');
            }
          })
          .catch((err) => {
            console.log('有内鬼！' + err);
          });
      } else {
        window.alert('发包次数必须为整数，请重新输入');
      }
    },
    //用来获取ping结果
    goSearch() {
      if (isNaN(parseInt(this.toSearch)) == false) {
        //这里要改成url
        axios
          .get('/tasks/:' + parseInt(this.toSearch) + '.json')
          .then((res) => {
            let results = JSON.parse(JSON.stringify(res.data.results));
            let result_list = [];
            for (let i = 0; i < results.length; i++) {
              let result = results[i].agent_name + ': ' + results[i].result;
              result_list.push(result);
            }
            window.alert(result_list);
          });
      } else {
        window.alert('ID应为整数，请重新输入');
      }
    },
  },
  data() {
    return {
      chosenValue: '',
      toPing: '',
      toSearch: '',
      tableColumns,
      opt: [],
      tableData: [],
      packNumber: '',
    };
  },
  mounted() {
    axios
      //这里需要改成url
      .get('/task_list.json')
      .then((res) => {
        var tableData = res.data.task_list;
        this.tableData = tableData;
      })
      .catch((error) => console.log(error));
    //这里要改成url
    axios.get('/agent.json').then((res) => {
      var agent_data = res.data.list;
      agent_data = JSON.parse(
        JSON.stringify(agent_data).replace(/name/g, 'label'),
      );
      for (let i = 0; i < agent_data.length; i++) {
        agent_data[i].value = agent_data[i].label;
        if (agent_data[i].status == false) {
          agent_data[i].disabled = true;
        }
        delete agent_data[i].status;
        console.log(agent_data[i]);
      }
      this.$data.opt = agent_data;
      return this.$data.opt;
    });
  },
});

const createColumns = () => {
  return [
    {
      title: 'ID',
      key: 'task_id',
    },
    {
      title: '时间',
      key: 'at',
    },
    {
      title: '指令',
      key: 'command',
    },
  ];
};
const tableColumns = createColumns();
</script>
<style>
#ping-form {
  margin-left: 80px;
  margin-right: 80px;
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr 6fr 1fr 1fr;
  grid-template-rows: 50px 1fr 1fr 1fr 50px 1fr 50px 300px;
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
#ping-search {
  grid-row-start: 5;
  grid-column-start: 1;
  justify-self: start;
}
#ping-id {
  grid-row-start: 6;
  grid-column-start: 1;
  grid-column-end: 4;
}
#go-search {
  grid-row-start: 6;
  grid-column-start: 4;
  grid-column-end: 5;
}
#ping-management {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 7;
  justify-self: start;
}
#ping-table {
  grid-row-start: 8;
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
