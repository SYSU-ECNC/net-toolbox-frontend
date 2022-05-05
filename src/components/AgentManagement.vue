<template>
  <div id="agent-management">
    <h2 id="agent-title">Agent管理</h2>
    <n-button text type="info" id="register-token">注册Token:</n-button>
    <p id="real-token">{{ token }}</p>
    <n-button type="warning" secondary id="reset-token" @click="refreshToken()"
      >重置Token</n-button
    >
    <n-data-table id="agent-table" :columns="agentColumns" :data="agents" />
    <h2 id="delete-agent">删除Agent</h2>
    <n-input
      id="delete-input"
      v-model:value="toDelete"
      type="text"
      placeholder="在这里输入你要删除的agent name"
    />
    <n-button type="error" id="delete-button" @click="deleteToken()"
      >删除Agent</n-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import axios from 'axios';
import { NButton, NInput, NDataTable } from 'naive-ui';

const createColumns = () => {
  return [
    {
      title: 'Agent name',
      key: 'name',
    },
    {
      title: '在线情况',
      key: 'disabled',
    },
  ];
};

export default defineComponent({
  name: 'AgentManagement',
  components: {
    NButton,
    NDataTable,
    NInput
  },
  data() {
    return {
      agents: [],
      agentColumns: createColumns(),
      token: '',
      toDelete: '',
      agent_list:[] as any //听我说谢谢你ts，不标类型会默认为never
    };
  },
  methods: {
    getToken() {
      axios
        .get('/token.json')
        .then((res) => {
          this.$data.token = res.data.token;
          return this.$data.token;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    refreshToken() {
      axios
        .get('/new_token.json')
        .then((res) => {
          this.$data.token = res.data.token;
          return this.$data.token;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteToken() {
      if (this.agent_list.includes(this.$data.toDelete)==true){
        let confirmFlag = window.confirm('确定要删除该Agent吗？')
        if (confirmFlag == true){
          let param = '{name:'+this.$data.toDelete+'}'
          axios.delete('agent.json',{data:param})
        }else{
          console.log('取消了删除操作')
        }
      }else{
        window.alert('未找到该Agent，请检查您输入的Agent name')
      }
    },
  },
  mounted() {
    this.getToken();
    axios.get('/agent.json').then((res) => {
      let agent_data = res.data.list;
      let agent_list = []
      agent_data = JSON.parse(JSON.stringify(agent_data));
      for (let i = 0; i < agent_data.length; i++) {
        if (agent_data[i].status == false) {
          agent_data[i].disabled = '停用';
        } else {
          agent_data[i].disabled = '启用';
        }
        delete agent_data[i].status;
        //获得一个agent list，方便删除agent时先查询所要删除的agent是否在列表中
        console.log(agent_data[i].name)
        agent_list.push(agent_data[i].name)
      }
      this.$data.agents = agent_data;
      this.$data.agent_list = agent_list
    })
    .catch(err=>console.log(err))
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
#reset-token {
  grid-column-start: 5;
  grid-row-start: 2;
}
#agent-table {
  grid-column-start: 1;
  grid-column-end: 6;
  grid-row-start: 3;
}
#delete-agent{
  grid-row-start: 4;
  grid-column-start: 1;
  justify-self: start;
}
#delete-input{
  grid-row-start:5;
  grid-column-start:1;
  grid-column-end:5
}
#delete-button{
  grid-column-start:5 ;
  grid-row-start:5
}
</style>
