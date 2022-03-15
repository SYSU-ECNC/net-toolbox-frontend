<script lang="ts">
//暂时胡编乱造了一番，希望人没事
import {defineComponent} from 'vue'
export default defineComponent({
    name:'getUserName',
    data(){
        return{
            isLogin:false,
            userName: 'null'
        }
    },
    mounted(){
        this.getLogin()
        this.reDirect()
    },
    methods:{
        getLogin(){
            //获取登录态boolean？
        },
        reDirect(){
            //if isLogin == false...else...
        },
        getUserName(){
            //获取用户名
        }
    }    
})
</script>>