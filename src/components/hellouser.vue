<template>
    <h1 size=30>{{time}}好，{{username}}。</h1>
</template>

<script lang="ts">
import {NGradientText} from 'naive-ui'
import {defineComponent} from 'vue'
export default defineComponent({
        name:'HelloUser',
        components:{
            NGradientText
        },
        data(){
            return{
                time:' ',
                username:' '
            }
        },
        methods:{
            timeSelect(){
                var myDate = new Date;
                var nowHour = myDate.getHours()
                if (nowHour < 4||nowHour > 18){
                    this.time = '晚上'
                }else if (nowHour < 9){
                    this.time = '早上'
                }else if (nowHour < 12){
                    this.time = '上午'
                }else if (nowHour < 14){
                    this.time = '中午'
                }else{
                    this.time = '下午'
                }
            },
            getUserName(){
                this.username = 'Admin'
                //不知道写啥，应该是从fetchusername组件获得username，总之先占个位置在这里
            },
        },
        mounted(){
                this.timeSelect()
                this.getUserName()
            }
    })
</script>>

<style>
template{
    font-family: v-sans, v-mono, other-fallbacks;
}

</style>