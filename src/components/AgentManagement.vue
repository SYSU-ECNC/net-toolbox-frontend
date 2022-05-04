<template>
  <div id="agent-management">
    <h2 id="agent-title">Agent管理</h2>
    <n-button text type="info" id="register-token">注册Token:</n-button>
    <p id="real-token">这里是一个字符串这里是一个字符串</p>
    <n-button type="warning" secondary id="reset-token">重置Token</n-button>
    <n-data-table id="agent-table" :columns="agentColumns" :data='agents'/>
  </div>
</template>

<script lang="ts">
import { defineComponent,h } from 'vue';
import { NButton, NDataTable } from 'naive-ui';
import axios from 'axios';

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
    {
      title:'操作',
      key:'action',
      render(){
        return h(
          NButton,
          {onclick:()=>window.alert('wow')},
          {default:()=>"删除Agent"}
        )
        }
      }
    ]
  }

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
      agents:[]
    };
  },
  mounted(){
    axios.get('/agent.json')
    .then(res=>{
      var agent_data = res.data.list
      agent_data = JSON.parse(JSON.stringify(agent_data))
      for(let i = 0;i<agent_data.length;i++){
        if(agent_data[i].status == false){
          agent_data[i].disabled = '停用'
        }else{
          agent_data[i].disabled = '启用'
        }
        delete agent_data[i].status
        console.log(agent_data[i])
      }
      this.$data.agents = agent_data
      return this.$data.agents
    })
  },
  }
)
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
#reset-token{
  grid-column-start: 5;
  grid-row-start: 2;
}
#agent-table {
  grid-column-start: 1;
  grid-column-end: 6;
  grid-row-start: 3;
}
</style>
