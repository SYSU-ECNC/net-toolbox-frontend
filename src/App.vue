<template>
  <div>
    <header>
      <HelloUser id="hellouser" />
      <n-button
        id="ping"
        strong
        secondary
        type="info"
        onclick='window.location.href="#/ping"'
        >Ping一下</n-button
      >
      <n-button
        id="agent"
        strong
        secondary
        type="info"
        onclick="window.location.href='#/agent'"
        >Agent管理</n-button
      >
      <!--下面这个按钮应该要回到授权页面，但目前它只用来测试404页面-->
      <n-button
        id="logout"
        strong
        secondary
        type="error"
        onclick="window.location.href='#/idk'"
        >退出登录</n-button
      >
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import {NButton} from 'naive-ui'
import '../node_modules/vfonts/Inter.css'
import HelloUser from './components/HelloUser.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    HelloUser,
    NButton,
  },
});
</script>

<style>
#app {
  font-family: v-sans, v-mono, other-fallbacks;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  text-align: center;
  font-weight: 400;
}
header {
  width: 90%;
  margin-left: 80px;
  display: grid;
  grid-template-columns: 70% 10% 10% 10%;
  grid-template-rows: 30px;
}
#hellouser {
  justify-self: left;
  align-self: center;
}
#agent {
  justify-self: center;
  align-self: center;
}
#ping {
  justify-self: center;
  align-self: center;
}
#logout {
  justify-self: center;
  align-self: center;
}
router-view{
  padding-top: 10px;
}
</style>
