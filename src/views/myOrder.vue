<template>
    <div class="main">
        <van-tabs v-model="active" @change="handleStatus">
            <van-tab title="已支付"></van-tab>
            <van-tab title="已收货"></van-tab>
            <van-tab title="已返款"></van-tab>
            <van-tab title="审核失败"></van-tab>
        </van-tabs>
        <div style="padding-bottom:55px;">
            <div class="course-item" v-for="item in orderList" :key="item.id">
                <div class="flex-bw order-info">
                    <div class="f14">{{ item.orderNo }}</div>
                    <div class="f12 c9">{{ item.status=="1" ? '已支付' : 
                            item.status=="2" ?  '已收货' : 
                            item.status=="2" ?  '审核成功' : '审核失败'}}</div>
                </div>
                <div class="flex-fl text-over">
                    <img :src="item.goodsThumbnailUrl" class="goods-img">
                    <div class="right-content">
                        <div class="fw f16">{{ item.goodsName }}</div>
                        <div class="f12 price" v-if="item.status != 4">确认收货--领取补贴</div>
                        <div class="c9 flex-bw">
                            <div class="f12">支付时间：{{item.orderPayTime}}</div>
                            

                            

                        </div>
                        <div class="fw f16">付款：{{item.groupPrice}}</div>
                            <div class="fw f16">返款：{{item.freePrice}}</div>
                        <div class="f12 price" v-if="item.status == 4">{{ item. reasonFailure}}</div>
                    </div>
                </div> 
                <div class="flex-bw order-info bottom-btn" v-if="item.status == 2">
                    <!-- <div class="f14 alipay-btn pay-btn" @click="handleUpload(item)">上传</div> -->
                  
                    <div class="f14 alipay-btn pay-btn" @click="handleReceive(item)">领取补贴</div>
                </div>
            </div>
            <van-empty description="暂无数据" v-if="orderList.length == 0"/>
        </div>
        <MyTabbar :active="1"/>
    </div>
</template>

<script> 
import goodsApi from '@/api/api.js'
import MyTabbar from './common/tabbar'
// import {wxLogin} from '@/components/mixins/wxLogin.js'

export default {
    // mixins: [ wxLogin ],
        name: "admin",
        components:{MyTabbar},
        data() {
            return { 
                fileList:[],
                orderList:[],
                userInfo:'',
                active: 0,
                status: 1,
                orderInfo:''
            }
        },
        created(){
            document.title = '我的订单';
        },
        mounted() { 
            this.getOrderList()
        },
        methods: {
            // 获取订单信息
            getOrderList(){
                var thiz = this;
                var userId = localStorage.getItem('userId') || ''
                if(userId == ''){
                    this.$dialog.alert({
                        title: '提示',
                        message: '未登录，现在去登录',
                        theme: 'round-button',
                    }).then(() => {
                        thiz.$router.push('alipayVerify')
                    });
                    return;
                }
                this.$toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                });
                var params = {
                    uid: userId,
                    status: this.status
                }
                goodsApi.orderList({params: params}).then(res => {
                    console.log(res,'res')
                    this.orderList = res.data;
                    console.log(this.orderList)

                    //把支付时间的时间戳转换为时间格式
                    for(let i = 0; i < this.orderList.length; i++) {
                     this.orderList[i].orderPayTime=this.parseTime(this.orderList[i].orderPayTime)
                   }
                    console.log(this.orderList)
                    this.$toast.clear();
                })
            },
        
            // 切换状态
            handleStatus(val){
                this.status = val + 1;
                this.getOrderList()
            },
            // 领取补贴
            handleReceive(item){
                this.$toast(
                    {
                        message:"正在开发，请加开发者微信返利 vx:13867637987"
                    })
                var params = {
                    id: item.id,
                }
                goodsApi.receive({params: params}).then(res => {
                    this.$toast(res.msg)
                    this.getOrderList()
                })
            },
            //13位时间戳转换为时间格式
            parseTime(timestamp){
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());

            let strDate = Y+M+D+h+m+s;
            console.log(strDate) //2020-05-08 17:44:56　
            return strDate;
        }


        }
    }
</script>

<style scoped>
.main{
    background: #f8f8f8;
} 

.pay-btn{
    background: rgb(226, 4, 4);
    width: 70px;
    text-align: center;
}
.goods-img{
    width: 100px;
    min-width: 100px;
    height: 90px;
}
.right-content{
    margin-left: 5px;
    width: calc(100% - 110px);
}


.main-title{
    height: 50px;
    line-height: 50px;
    vertical-align: middle;
    background: #f8f8f8;
    padding-left: 15px;
}
.main-title::before{
    content: '`';
    width: 6px;
    height: 20px;
    display: inline-block;
    background: #1d7cdc;
    color: #1d7cdc;
    margin-right: 5px;
    vertical-align: middle;
    z-index: 2;
    position: relative;
}
.price{
    color: rgb(226, 4, 4);
    margin-top: 15px;
}
.red1{
    color: rgb(226, 4, 4);
    font-size: 14px;
}
.flex-row1{
    display:flex;
    justify-content: space-between;
    line-height: 40px;
    padding: 0 15px;
    border-bottom: 10px solid #f0f0f0;
    background: #fff;
}
.course-item{
    border-bottom: 5px solid #f8f8f8;
    padding:10px 5px;
    background: #fff;
}
.order-info{
    border-bottom: 1px solid #ddd;
    padding: 5px;
    margin-bottom: 8px;
}

.alipay-btn{
    background: #1d7cdc;
    color: #fff;
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 30px;
}
.pay-btn{
    background: rgb(226, 4, 4);
    width: 70px;
    text-align: center;
}
.bottom-btn{
    border-top: 1px solid #ddd;
    margin-top: 8px;
    padding-top: 5px;
}
</style>
