<template>
  <h1 size="30">{{ time }}好，{{ username }}。</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'HelloUser',
  data() {
    return {
      time: '',
      username: '',
    };
  },
  methods: {
    timeSelect() {
      var myDate = new Date();
      var nowHour = myDate.getHours();
      if (nowHour < 4 || nowHour > 18) {
        this.time = '晚上';
      } else if (nowHour < 9) {
        this.time = '早上';
      } else if (nowHour < 12) {
        this.time = '上午';
      } else if (nowHour < 14) {
        this.time = '中午';
      } else {
        this.time = '下午';
      }
    },
    getUserName(){
      axios.get('/userInfo.json')
      .then(res=>{
        console.log(res.data)
        if (res.data.loginUrl == ''){
          this.username = res.data.name;
        }else{
          window.location.href=res.data.loginUrl;
        }
      })
      .catch(error=>{
        console.log('有内鬼，停止交易')
      })
    },
  },
  mounted() {
    this.timeSelect();
    this.getUserName();
  },
});
</script>

<style>
template {
  font-family: v-sans, v-mono, other-fallbacks;
}
</style>
