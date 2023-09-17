<template>
   <van-tabbar v-model="active" @change="onChange">
        <van-tabbar-item icon="wap-home-o" url="index">首页</van-tabbar-item>
        <van-tabbar-item icon="label-o" url="myOrder">我的订单</van-tabbar-item>
        <van-tabbar-item icon="manager-o" url="mine">我的账户</van-tabbar-item>
    </van-tabbar> 
</template>

<script> 
 
// import {wxLogin} from '@/components/mixins/wxLogin.js'

export default {
    props:{
        active:{
            type: Number,
            default: 0
        }
    }, 
    data() {
        return { 
         
        }
    },
    mounted() {
        
    },
    methods: {
        onChange(){

        }
    }
}
</script>

<style scoped> 
</style>
