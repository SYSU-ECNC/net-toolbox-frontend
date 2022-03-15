<template>
  <div>
    <header>
      <HelloUser id='hellouser'/>
      <n-button id='ping' strong secondary type='info' onclick='window.location.href="#/ping"'>Ping一下</n-button>
      <n-button id='agent' strong secondary type='info' onclick="window.location.href='#/agent'">Agent管理</n-button>
      <!--下面这个按钮应该要回到授权页面，但目前它只用来测试404页面-->
      <n-button id='logout' strong secondary type='error' onclick="window.location.href='#/idk'">退出登录</n-button>
    </header>
    <main>
      <div id='blank'></div>
      <component :is='currentView' />
    </main>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloUser from './components/hellouser.vue'
import PingForm from './components/pingform.vue'
import AgentManagement from './components/agentmamagement.vue'
import MyHome from './App.vue'
import NotFound from './components/notfound.vue'
import {NButton} from 'naive-ui'
import '../node_modules/vfonts/OpenSans.css'

const routes = {
  '/':MyHome,
  '/ping':PingForm,
  '/agent':AgentManagement,
}

@Options({
  components: {
    MyHome,
    AgentManagement,
    NotFound,
    HelloUser,
    PingForm,
    NButton
  },
})
export default class App extends Vue {
  data(){
    return{
      currentPath:window.location.hash
    }
  },
  mounted(){
    window.addEventListener('hashchange',()=>{
      this.currentPath = window.location.hash
    })
  },
  get currentView(){
    return routes[this.currentPath.slice(1) || '/'] || NotFound
  }
  }
}
</script>

<style>

#app {
  font-family: v-sans, v-mono, other-fallbacks;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
header{
  width:90%;
  margin-left: 80px;
  display: grid;
  grid-template-columns: 70% 10% 10% 10%;
  grid-template-rows:30px
}
#hellouser{
  justify-self:left;
  align-self: center;
}
#agent{
  justify-self:center;
  align-self: center;
  
}
#ping{
  justify-self: center;
  align-self: center;
}
#logout{
  justify-self: center;
  align-self: center;
}
#blank{
  height:20px
}
</style>
