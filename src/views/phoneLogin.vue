<template>
    <div class="login-main">
        <div class="login-box">
            <div class="login-title">支付宝账号信息</div>
            <van-field
                v-model="form.realname"
                label="真实姓名"
                placeholder="输入真实姓名"
            />
            <van-field style="margin-top:20px;"
                v-model="form.mobile"
                label="手机号"
                placeholder="输入手机号"
            />
            <van-field style="margin-top:20px;"
                v-model="form.alipay"
                label="支付宝账号"
                placeholder="输入支付宝账号"
            />
            <van-button type="info" class="login-btn" @click="login">确认绑定</van-button>
            <div class="c9 f14" style="margin-top:14px">
                <div>温馨提示：</div>
                <div>1、支付宝信息填写错了</div>
                <div>请发起一笔提现，系统校验“支付宝信息填写错误”，会自动增加1次绑定次数</div>
                <div>2、我要换绑支付宝</div>
                <div>暂不支持常用支付宝更换哦，如有问题请联系客服</div>
            </div>
        </div>
    </div>
</template>

<script> 
import goodsApi from '@/api/api.js'
    export default {
        name: "admin",
        data() {
            return {
                form:{
                    realname: '',
                    mobile:'',
                    alipay:''
                },
                list:{}
            }
        },
        created(){
            document.title = '绑定支付宝';
        },
        mounted() {
        }, 
        methods: {
           login(){ 
                if(this.form.realname == ''){
                    this.$toast('请输入真实姓名')
                    return;
                }
                if(this.form.mobile == ''){
                    this.$toast('请输入手机号')
                    return;
                }
                if(this.form.alipay == ''){
                    this.$toast('请输入支付宝账号')
                    return;
                }
                goodsApi.checkname({params: this.form}).then(res => {
                    console.log(res)
                    this.$toast(res.msg)
                    // if(res.code == 200){
                    //     this.$router.push('index')
                    //     sessionStorage.setItem("userInfo",JSON.stringify(res.data))
                    // }else{
                    //     this.$toast('账号或密码错误')
                    // }
                })
           }
        }
    }
</script>

<style scoped>
.login-main{
    background-size: cover; 
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    background: #f8f8f8;
}
.logo{
    width: 100%;
}
.login-box{
    background: #fff;
    position: absolute;
    width: calc(100% - 70px);
    margin: 15px;
    top: 150px;
    /* background-color: rgb(227 225 225 / 46%); */
    border-radius: 5px;
    padding: 20px;
}
 
.login-title{
    font-size: 18px;
    text-align: center;
    color: #333;
    font-weight: 600;
    border-bottom: 2px solid #0d88fc;
    padding-bottom: 10px;  
    width: 180px;
    margin: 0 auto; 
    margin-bottom: 15px;
}
.login-btn{
    width: 100%;
    margin-top: 15px;
}
</style>
