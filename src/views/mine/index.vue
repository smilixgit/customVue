<template>
    <div class="main">
        <div class="mybg flex-fl" style="padding:0 20px">
            <img src="../../assets/header.jpeg" class="headerImg">
            <div class="c0">
                <div>我的ID：{{ userInfo['id'] }}</div>
                <div class="f12" style="margin-top:5px;">手机号：{{ userInfo['phone'] }}</div>
            </div>
            <div style="margin-left: 1%;">
                <el-button type="primary" plain round @click="loginOut()">退出登录</el-button>
            </div>   
        </div>
        
        <div> 
            <van-cell-group>
                <van-cell icon="orders-o" title="我的订单" url="myOrder" isLink/>
                <van-cell icon="gold-coin-o" title="我的余额" :value="userInfo['balance']"  isLink/>
                <div class="line"></div>
                <div class="fw f14" style="margin:10px;">支付宝提现</div>
                <van-form @submit="onSubmit">
                    <van-field
                        v-model="number"
                        name="number"
                        type="number"
                        label="提现金额"
                        placeholder="输入提现金额"
                        :rules="[{ required: true, message: '输入提现金额' }]"
                    />
                    <div style="margin: 16px;">
                        <van-button round block type="info" native-type="submit">提交</van-button>
                    </div>
                </van-form>

                <div class="line"></div> 
                <!-- <van-cell icon="exchange" title="退出" @click="loginOut" isLink/> -->
            </van-cell-group>
        </div>
        <MyTabbar :active="2"/>

    </div>
</template>

<script> 
import goodsApi from '@/api/api.js'
import MyTabbar from '../common/tabbar'
import { Dialog } from 'vant';
// import {wxLogin} from '@/components/mixins/wxLogin.js'

export default {
    // mixins: [ wxLogin ],
        name: "admin",
        components:{MyTabbar},
        data() {
            return {  
                show: false,
                userInfo:'',
                password:'',
                nPassword:'',
                userId:'',
                number:''
            }
        },
        created(){
            document.title = '我的账户';
            var userId = localStorage.getItem('userId') || ''
            if(userId == ''){
                this.$dialog.alert({
                    title: '提示',
                    message: '未登录，现在去登录',
                    theme: 'round-button',
                }).then(() => {
                    this.$router.push('alipayVerify')
                });
                return;
            }else{
                this.userId = userId;
            }
        }, 
        mounted() {
            this.getUserInfo()
        },
        methods: {
            // 获取用户信息
            getUserInfo(){
                goodsApi.getUserInfo({uid: this.userId}).then(res => {

                    console.log(res,'res')
                    this.userInfo = res.data;
                })
            }, 
            // 提现
            onSubmit(){
                this.$toast(
                    {
                        message:"正在开发，请加开发者微信返利 vx:13867637987"
                    })
                var params = {
                    number: this.number,
                    id: this.userInfo.id,
                    type:1
                }
                goodsApi.douwithdraw({params: params}).then(res => {
                    this.$toast(res.msg)
                })
            }, 
            loginOut()
            {                       
                 localStorage.setItem('userId',"");
                 localStorage.setItem('accessToken',"null");
                //  this.$toast("退出登录。。正在跳转");
                 this.$router.push('alipayVerify');


            }
        }
    }
</script>

<style scoped>
.main{
    background: #f8f8f8;
} 
.mybg{
    height: 150px;
    background: #1989fa;
}
.main-title::before{
    content: '`';
    width: 6px;
    height: 20px;
    display: inline-block;
    background: #d88100;
    color: #d88100;
    margin-right: 5px;
    vertical-align: middle;
}
.price{
    color: rgb(226, 4, 4);
    margin-top: 15px;
}
.flex-row{
    display:flex;
    justify-content: space-between;
    line-height: 40px;
    padding: 0 15px;
    border-bottom: 10px solid #f0f0f0;
    background: #fff;
}
.line{
    height: 10px;
    background: #f8f8f8
}
.course-item{
    border-bottom: 5px solid #f8f8f8;
    padding:10px 5px;
    background: #fff;
}
.headerImg{
    width: 60px;
    height: 60px;
    border-radius: 60px;
    margin-right: 10px;
}
</style>
