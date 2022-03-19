<template text-align="center">
<div id='blank'></div>
    <n-result status="418" title="欢迎来到ECNC网络工具箱！" description="点选上方选项以开始，或者">
    <n-button>查看帮助</n-button>
    </n-result>
</template>

<script lang='ts'>
import {NButton,NResult} from 'naive-ui'
import {defineComponent} from 'vue'
export default defineComponent({
    name:'NotFound',
    components:{
        NButton,
        NResult
    }
})
</script>
<style>
#blank{
    height:150px
}

</style>