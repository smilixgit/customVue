<template>
    <div class="login-main">
        <div class="login-box">
            <van-tabs v-mode="active">
                <van-tab title="验证码登录">
                    <van-cell-group>
                        <van-field style="margin-top:20px;"
                            v-model="formData.mobile"
                            label="手机号"
                            placeholder="输入手机号"
                        />
                     
                        <van-field style="margin-top:20px;"
                            v-model="formData.Vercode"
                            center
                            clearable
                            label="短信验证码"
                            placeholder="请输入短信验证码"
                            >
                            <template #button>
                                <van-button size="small" type="primary" @click="sendSms" :disabled="isDisabled">{{sendText}}</van-button>
                            </template>
                        </van-field>
                    </van-cell-group>
                    <van-button type="info" class="login-btn" @click="login">登录</van-button>
                    <div class="c9 f14" style="margin-top:14px">
                        <div>温馨提示：登录成功之后，7天之内免登录~</div>
                        
                    </div>
                </van-tab>
                <van-tab title="支付宝验证">
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
                    <van-button type="info" class="login-btn" @click="handleAlipay">确认绑定</van-button>
                    <div class="c9 f14" style="margin-top:14px">
                        <div>温馨提示：</div>
                        <div>1、支付宝信息填写错了</div>
                        <div>请发起一笔提现，系统校验“支付宝信息填写错误”，会自动增加1次绑定次数</div>
                        <div>2、我要换绑支付宝</div>
                        <div>暂不支持常用支付宝更换哦，如有问题请联系客服</div>
                    </div>
                </van-tab>
              
            </van-tabs>
           
        </div>
    </div>
</template>

<script> 
import goodsApi from '@/api/api.js'
    export default {
        name: "admin",
        data() {
            return {
                active: 0,
                form:{
                    realname: '',
                    mobile:'',
                    alipay:''
                },
                formData:{
                    mobile: '',
                    Vercode:''
                },
                list:{},
                sendText: '发送验证码',
                isDisabled: false
            }
        },
        created(){
            document.title = '绑定支付宝';
        },
        mounted() {
        }, 
        methods: {
            // 绑定支付宝
            handleAlipay(){ 
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
                    if(res.code == 1){
                        this.$router.push('index')
                        localStorage.setItem('userId',res.msg)
                    }else{
                        this.$toast(res.msg)
                    }
                })
           },
           // 发送验证码
           sendSms(){
                var reg=/^1[3456789]\d{9}$/;
	            if(!reg.test(this.formData.mobile)){
                  this.$toast('请输入有效的手机号码')
                  return;
	            }
                let cc=this;
                this.isDisabled = true;
                var second = 60;

       

                goodsApi.sendPhoneSms(cc.formData).then(res => {
                    this.$toast('已发送')
                    console.log(res)
                })
                  // 倒计时
                  var timer = setInterval(function() {
					if (second == 0) {
						//清除定时器和复原按钮
						clearInterval(timer);
						cc.isDisabled  = false;
                        cc.sendText= '发送验证码';
						second = 60; //这个60是重新开始
					} else {
						cc.sendText = second+'秒后重新发送';
						second--;
					}
				}, 1000);

            },
            // 登录
            login(){
                if(this.formData.mobile == ''){
                    this.$toast('请输入手机号')
                    return;
                }
                if(this.formData.Vercode == ''){
                    this.$toast('请输入验证码')
                    return;
                }
                var reg=/^1[3456789]\d{9}$/;
	            if(!reg.test(this.formData.mobile)){
                  this.$toast('请输入有效的手机号码')
                  return;
	            }  
                 
                
              
                goodsApi.checklogin(this.formData).then(res => {
                    console.log(res)
                    if(res.code == 0){
                        
                        localStorage.setItem('userId',res.data['id'])
                        localStorage.setItem('accessToken',res.token)
                        this.$toast.success('登录成功')
                        this.$router.push('index')
                    }else{
                        this.$toast(res.msg)
                    }
                    // if(res.code == 200){
                    //     this.$router.push('index')
                    //     sessionStorage.setItem("userInfo",JSON.stringify(res.data))
                    // }else{
                    //     this.$toast('账号或密码错误')
                    // }
                })
           },
           countDown(second){
            var timer;
            this.sendText=second+'秒后重发';
    second--;
    if(second == 0){
         second = 60
         clearTimeout(timer)
         return
     }
     timer = setTimeout('countDown()', 1000);
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
